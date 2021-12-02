'user strict';
var sql = require("mssql");
const dbCon = require('../common/db.js');
var data = {};

data.AddTempClient = async function (clientName,address,suburb,postalCode,contactNum,email,imageURL,date,status,measuredBy) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('ClientName', sql.VarChar(150), clientName)
                    .input('Address', sql.VarChar(150), address)
                    .input('Suburb', sql.VarChar(150), suburb)
                    .input('PostalCode', sql.VarChar(150), postalCode)
                    .input('ContactNum', sql.VarChar(150), contactNum)
                    .input('Email', sql.VarChar(150), email)
                    .input('ImageURL', sql.VarChar(150), imageURL)
                    .input('Date', sql.VarChar(150), date)
                    .input('Status', sql.VarChar(150), status)
                    .input('MeasuredBy', sql.VarChar(150), measuredBy)
                    .query('EXEC GMB.usp_AddTempClient @ClientName,@Address,@Suburb,@PostalCode,@ContactNum,@Email,@ImageURL,@Date,@Status,@MeasuredBy');
            })
            .then(result => {
                resolve(result.recordsets[0])
            })
            .catch(err => {
                console.log(err);
            })
        sql.on('error', err => {
            console.log(err);
        })
    });
};

data.UpdateTempClientByTempClientID = async function (tempClientID,clientName,address,suburb,postalCode,contactNum,email,imageURL,date,status,measuredBy) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('TempClientID', sql.Int, tempClientID)
                    .input('ClientName', sql.VarChar(150), clientName)
                    .input('Address', sql.VarChar(150), address)
                    .input('Suburb', sql.VarChar(150), suburb)
                    .input('PostalCode', sql.VarChar(150), postalCode)
                    .input('ContactNum', sql.VarChar(150), contactNum)
                    .input('Email', sql.VarChar(150), email)
                    .input('ImageURL', sql.VarChar(150), imageURL)
                    .input('Date', sql.VarChar(150), date)
                    .input('Status', sql.VarChar(150), status)
                    .input('MeasuredBy', sql.VarChar(150), measuredBy)
                    .query('EXEC GMB.usp_UpdateTempClientByTempClientID @TempClientID,@ClientName,@Address,@Suburb,@PostalCode,@ContactNum,@Email,@ImageURL,@Date,@Status,@MeasuredBy');
            })
            .then(result => {
                resolve(result.recordsets[0])
            })
            .catch(err => {
                console.log(err);
            })
        sql.on('error', err => {
            console.log(err);
        })
    });
};

data.GetTempClients = async function () {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .query('EXEC GMB.usp_GetTempClients');
            })
            .then(result => {
                resolve(result.recordsets[0])
            })
            .catch(err => {
                console.log(err);
            })
        sql.on('error', err => {
            console.log(err);
        })
    });
};

data.GetTempClientByTempClientID = async function (tempClientID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('TempClientID', sql.Int, tempClientID)
                    .query('EXEC GMB.usp_GetTempClientByTempClientID @TempClientID');
            })
            .then(result => {
                resolve(result.recordsets[0][0])
            })
            .catch(err => {
                console.log(err);
            })
        sql.on('error', err => {
            console.log(err);
        })
    });
};

data.DeleteTempClientByTempClientID = async function (tempClientID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('TempClientID', sql.Int, tempClientID)
                    .query('EXEC GMB.usp_DeleteTempClientByTempClientID @TempClientID');
            })
            .then(result => {
                resolve(result.recordsets[0])
            })
            .catch(err => {
                console.log(err);
            })
        sql.on('error', err => {
            console.log(err);
        })
    });
};

module.exports = data;
