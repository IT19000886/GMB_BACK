'user strict';
var sql = require("mssql");
const dbCon = require('../common/db.js');
var data = {};

// data.checkRBAC = function (username, controllerName, methodName, res) {
//     return new Promise((resolve, reject) => {
//         var params = [username, controllerName, methodName];
//         var sp_query = "SET @Username = ?,@ControllerName = ?,@MethodName = ?; CALL usp_ValidateRBAC (@Username,@ControllerName,@MethodName);";
//         sql.query(sp_query, params, (err, resPermission) => {
//             var status = resPermission[1][0].Permission;
//             if (status == "NotAuthorized")
//                 reject("Authorization Denied");
//             else resolve("OK");

//         });
//     });
// }

data.updateSessionToken = function (email) {
    return new Promise((resolve, reject) => {
        var conn = new sql.ConnectionPool(dbCon);
        conn.connect().then(function (connection) {
            var request = new sql.Request(connection);
            request.input('Email', sql.VarChar(200), email);
            request.execute('Person.usp_UpdateLastLoggedInTime').then(function (response, recordsets, returnValue, affected) {
                if (response.recordsets.length = 1) {
                    resolve("OK");
                }
                else {
                    reject("Error Occured");
                }
            }).catch(function (err) {
                console.log(err);
            });
        });
    });
};

// data.isValidSession = async function (username, token) {
//     return new Promise((resolve, reject) => {
//         var params = [username, token];
//         var sp_query = "SET @Username = ?,@Token = ?; CALL usp_ValidateSessionToken (@Username,@Token);";
//         sql.query(sp_query, params, (err, res) => {
//             resolve(res[1][0].Status);
//         });
//     });
// };

module.exports = data;