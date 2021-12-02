const express = require('express');
const config = require('../common/config.js');
const enums = require('../common/enums');
const requireAuth = require('../common/tokenValidator');
const sessionManager = require('../common/sessionManager');
var generator = require('generate-password');
const person = require('../model/personModel');
const log = require('../model/logModel');
const email = require('../common/email');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { json } = require('body-parser');
const router = express.Router();

router.use(requireAuth);

router.get('/LoggedInUserInfo', async (req, res) => {
    const userModel = jwt.verify(req.get("authorization"), config.secret);
    try {
        //await sessionManager.checkRBAC(userModel.username, fileName, fileName + ":GetLoggedInUserInfo", res);
        const result = await person.getLoggedInUserInfo(userModel.username);
        res.json(result);
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, "User Logged-In", error, userModel.username);
        res.status(403).json("Error occurred");
    }
});
router.post('/ApproveUser', async (req, res) => {
    const userModel = jwt.verify(req.get("authorization"), config.secret);
    try {
        //await sessionManager.checkRBAC(userModel.username, fileName, fileName + ":GetAllUsers", res);
        const roleTypeId = req.body.roleTypeId;
        const orgPartyRoleId = req.body.orgPartyRoleId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const username = req.body.username;
        const phone = req.body.phone;
        const status = req.body.status;
        var password = generator.generate({
            length: 10,
            numbers: true
        });
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const result = await person.approveUser(roleTypeId,orgPartyRoleId, firstName, lastName, username, phone, status, hashedPassword);
        await email(req.body.username, 'Welcome to SCOUT Intel!', '<p>Hello '+req.body.firstName + '!<br>You have been approved as a Company Admin and will have the ability to view many aspects of the system including Market, Physician and Building information as needed.<br><p>Username: <b>' + req.body.username + '</b><br> Password :<b>' + password + '</b></pr><br><br>' + config.emailFooter + '</p>');
        res.json(result);
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, "User Approval", error, userModel.username);
        res.status(403).json("Error occurred");
    }
});

router.put('/user/:partyRoleId?', async (req, res) => {
    const userModel = jwt.verify(req.get("authorization"), config.secret);
    try {
        //await sessionManager.checkRBAC(userModel.username, fileName, fileName + ":GetAllUsers", res);
        const orgPartyRoleId = req.body.orgPartyRoleId;
        const roleTypeId = req.body.roleTypeId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const username = req.body.username;
        const phone = req.body.phone;
        const status = req.body.status;
        const partyRoleId = req.body.partyRoleId;
        const result = await person.updatePerson(roleTypeId, orgPartyRoleId, firstName, lastName, username, phone, status, partyRoleId);
        res.json(result);
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, "User Approval", error, userModel.username);
        res.status(403).json("Error occurred");
    }
});

router.get('/:userType?', async (req, res) => {
    const userModel = jwt.verify(req.get("authorization"), config.secret);
    try {
        const userType = req.params.userType;
        const result = await person.getPersonUserList(userType);
        res.json(result);
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, "User List Retrieval", error, userModel.username);
        res.status(403).json("Error occurred");
    }
});

router.delete('/User/:userId', async (req, res) => {
    const userModel = jwt.verify(req.get("authorization"), config.secret);
    try {
        const userId = req.params.userId;
        const result = await person.deleteUser(userId);
        res.json(result);
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, "User List Retrieval", error, userModel.username);
        res.status(403).json("Error occurred");
    }
});

router.delete('/:partyRoleId', async (req, res) => {
    const userModel = jwt.verify(req.get("authorization"), config.secret);
    try {
        const partyRoleId = req.params.partyRoleId;
        const result = await person.deletePerson(partyRoleId, userModel.username);
        res.json(result);
    } catch (err) {
        const error = err.code + ' | ' + err.sqlMessage + ' | ' + err.sql;
        log.logInfo(enums.logLevel.Error, "User List Retrieval", error, userModel.username);
        res.status(403).json("Error occurred");
    }
});

module.exports = router;
