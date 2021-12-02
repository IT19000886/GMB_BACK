'user strict';
var sql = require("mssql");
const dbCon = require('../common/db.js');
const config = require('../common/config.js');
var password = require('../viewModel/password.js');
const bcryptjs = require('bcryptjs');
var mapper = require('automapper-js');
var data = {};

data.getUser = function (userModel) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('Email', sql.VarChar(200), userModel.email)
                    .query('Person.usp_GetPasswordByEmail @Email');
            })
            .then(result => {
                if (result.recordsets.length = 1) {
                    let loggedInUserInfoVm = mapper(password, result.recordsets[0][0]);
                    if (bcryptjs.compareSync(userModel.password, loggedInUserInfoVm.passwordHash)) {
                        resolve(loggedInUserInfoVm);
                    }
                    else {
                        resolve("Invalid Credentials");
                    }
                }
                else {
                    resolve("Invalid Credentials");
                }
            })
            .catch(err => {
                resolve(err);
            })
    });
};

data.getRefreshTokenPopupTimeoutInMinutes = async () => {
    return new Promise((resolve, reject) => {
        resolve(parseInt(config.refreshTokenPopupTimeoutInMinutes));
    });
};

module.exports = data;