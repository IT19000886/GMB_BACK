'user strict';
var sql = require("mssql");
const dbCon = require('../common/db.js');
var data = {};

data.AddAddCharges = async function(tempClientID,addchargetype,priceperone,quantity,price){
    return new Promise((resolve,reject)=>{
        sql.connect(dbCon)
            .then(pool =>{
                return pool.request()
                    .input('TempClientID', sql.Int, tempClientID)
                    .input('AddChargeType', sql.VarChar(100), addchargetype)
                    .input('PricePerOne', sql.Float,priceperone)
                    .input('Quantity', sql.Int,quantity)
                    .input('Price', sql.Float,price)
                    .query('EXEC GMB.usp_AddAddCharges @TempClientID, @AddChargeType, @PricePerOne,@Quantity,@Price');
            })
            .then(result =>{
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

data.UpdateAddChargesByAddChargeID = async function (addchargeid,addchargetype,priceperone,quantity,price )
{
    return new Promise((resolve, reject)=>{
        sql.connect(dbCon)
        .then(pool =>{
            return pool.addListener.request()
            .input('AddChargeID', sql.Int, addchargeid)
            .input('AddChargeType', sql.VarChar(100), addchargetype)
            .input('PricePerOne', sql.Float,priceperone)
            .input('Quantity', sql.Int,quantity)
            .input('Price', sql.Float,price)
            .query('EXEC GMB.usp_UpdateAddChargesByAddChargeID @AddChargeID, @AddChargeType ,@PricePerOne ,@Quantity ,@Price ');
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

data.GetAllAddChargersByTempClientID = async function(tempClientID){
    return new Promise((resolve, reject)=>{
        sql.connect(dbCon)
        .then(pool => {
            return pool.request()
            .input('TempClientID', sql.Int,tempClientID)
            .query('EXEC GMB.usp_GetAllAddChargersByTempClientID @TempClientID')
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

data.GetAddChargesByAddChargeID = async function(addchargeid){
    return new Promise((resolve,reject)=>{
        sql.connect(dbCon)
        .then(pool => {
            return pool.request()
            .input('AddChargeID', sql.Int, addchargeid)
            .query('EXEC GMB.usp_GetAddChargesByAddChargeID @AddChargeID')
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
data.DeleteAddChargesByAddChargeID = async function (addchargeid) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('AddChargeID', sql.Int, addchargeid)
                    .query('EXEC GMB.usp_DeleteAddChargesByAddChargeID @AddChargeID');
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


data.GetAllChargesByTempClientID = async function(tempClientID){
    return new Promise((resolve, reject)=>{
        sql.connect(dbCon)
        .then(pool => {
            return pool.request()
            .input('TempClientID', sql.Int,tempClientID)
            .query('EXEC GMB.usp_GetAllChargesByTempClientID @TempClientID')
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
