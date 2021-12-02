'user strict';
const express = require('express');
const jwt = require('jsonwebtoken');
const person = require('../model/personModel');
const config = require('../common/config.js');
const login = require('../model/loginModel');
const log = require('../model/logModel');
const enums = require('../common/enum');
var generator = require('generate-password');
const bcryptjs = require('bcryptjs');
const sessionManager = require('../common/sessionManager');
var sql = require('../common/db.js');

const router = express.Router();
const tokenList = {};

router.post('/login', async (req, res) => {
    console.log(process.env.DB_HOST);
    const { email, password } = req.body;
    const userModel = {
        email,
        password
    };

    try {
        const result = await login.getUser(userModel);
        const personId = result.personId;
        var userModelForPayload = {
            email,
            personId
        };
        if (!isNaN(personId)) {
            const token = jwt.sign(userModelForPayload, config.secret, { expiresIn: config.tokenLife }, '', '');
            const refreshToken = jwt.sign(userModelForPayload, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife });
            const response = {
                "token": token,
                "refreshToken": refreshToken,
                "tokenLifeInSeconds": config.tokenLife
            };
            tokenList[refreshToken] = response;
            await sessionManager.updateSessionToken(userModel.email, token);
            log.logInfo(enums.logLevel.Info, "Login Attempt ", null, userModel.email);
            res.status(200).json(response);
        }
        else {
            await log.logInfo(enums.logLevel.Info, "Login Attempt", "Invalid token", userModel.email);
            res.status(401).json("Invalid Credintials");
        }
    } catch (e) {
        const response = { "message": e }
        await log.logInfo(enums.logLevel.Error, "Login Attempt", response.message, userModel.email);
        res.status(401).json(response);
    }
});

router.post('/refresh', (req, result) => {
    const postData = req.body;
    // if refresh token exists
    if (postData.refreshToken) {
        const userModel = {
            username: postData.username
        };
        const token = jwt.sign(userModel, config.secret, { expiresIn: config.tokenLife });
        const refreshToken = jwt.sign(userModel, config.refreshTokenSecret, { expiresIn: config.refreshTokenLife });
        const response = {
            "token": token,
            "refreshToken": refreshToken,
            "tokenLifeInSeconds": config.tokenLife
        };
        // update the token in the list
        //tokenList[postData.refreshToken].token = token;

        var params = [userModel.username, null];
        var sp_query = "SET @Username = ?, @PartyRoleID = ?; CALL usp_ValidateUsername( @Username, @PartyRoleID);";
        sql.query(sp_query, params, (err, res) => {
            if (err) {
                res.status(404).json(err);
            }
            else {
                if (res[1][0].PRID != null) {
                    const decodedResult = jwt.verify(postData.refreshToken, config.refreshTokenSecret);
                    if (userModel.username == decodedResult.username) {
                        log.logInfo(enums.logLevel.Info, "Refresh Token Generation", null, userModel.username);
                        sessionManager.updateSessionToken(userModel.username, response.token);
                        result.status(200).json(response);
                    } else {
                        log.logInfo(enums.logLevel.Error, "Refresh Token Generation", "Username Mismatch", userModel.username);
                        result.status(403).json('Invalid request');
                    }
                }
            }
        });
    } else {
        log.logInfo(enums.logLevel.Error, "Refresh Token Generation", "Refresh Token Generation Failed", userModel.username);
        result.status(403).json('Invalid request');
    }
});

router.post('/fogotpassword', async (req, res) => {
    const { username } = req.body;
    const requestModel = {
        username
    };
    try {
        var password = generator.generate({
            length: 10,
            symbols: false,
            numbers: true
        });
        const encPassword = bcryptjs.hashSync(password, 10);
        const result = await person.saveTempPassword(encPassword, requestModel.username, config.resetPasswordValidityInMinutes);
        const response = {
            result: result
        };
        if (result == "OK") {
            const resetPasswordValidityInHours = parseInt(config.resetPasswordValidityInMinutes);
            await email(requestModel.username, 'Temporary Password for ' + requestModel.username, '<h4><u>Temporary Password</u></h4><p>Username: ' + '<b>' + requestModel.username + '</b><br>Temporary password: ' + '<b>' + password + '</b></p><br>Your temporary password will expire in <b>' + (resetPasswordValidityInHours / 60) + ' hour(s).</b><br><p>' + config.emailFooter + '</p>');
            res.status(200).json(response);
        } else {
            res.status(403).json(response);
        }
    } catch (err) {
        log.logInfo(enums.logLevel.Error, "Change Password", null, requestModel.username);
        res.status(403).json("Error occurred");
    }
});

router.post('/httptoken', async (req, res) => {
    const { ip } = req.body;
    try {
        var sessionId = await hostManager.hostOpenSession("System", ip);
        res.status(200).json(sessionId);
    } catch (err) {
        res.status(403).json("Error occurred");
    }
});

module.exports = router;