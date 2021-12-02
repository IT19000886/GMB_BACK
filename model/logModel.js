'user strict';
var sql = require("mssql");
const dbCon = require('../common/db.js');
const config = require('../common/config.js');

var data = {};

data.logInfo = async function (level, source, content, username) {
    return new Promise((resolve, reject) => {
        if ((config.infoLogStatus == true && level == "info") || (config.errorLogStatus == true && level == "error") || (config.debugLogStatus == true && level == "debug")) {
            sql.connect(dbCon)
                .then(pool => {
                    return pool.request()
                        .input('Level', sql.VarChar(200), level)
                        .input('Source', sql.VarChar(200), source)
                        .input('Content', sql.VarChar(sql.MAX), content)
                        .input('Username', sql.VarChar(200), username)
                        .query('EXEC Person.usp_SaveLogInfo @Level,@Source,@Content,@Username');
                })
                .then(result => {
                    if (result.recordsets.length = 1) {
                        resolve("OK");
                    }
                    else {
                        reject("Error Occured");
                    }
                })
                .catch(err => {
                    console.log(err);
                })
            sql.on('error', err => {
                console.log(err);
            })
        }
    });
};

module.exports = data;