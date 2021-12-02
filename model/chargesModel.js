'user strict';
var sql = require("mssql");
const dbCon = require('../common/db.js');
var data = {};

data.AddAddCharges = async function(orderID,addchargetype,priceperone,quantity,price){
    return new Promise((resolve,reject)=>{
        sql.connect(dbCon)
            .then(pool =>{
                return pool.request()
                    .input('OrderID', sql.Int, orderID)
                    .input('AddChargeType', sql.VarChar(100), addchargetype)
                    .input('PricePerOne', sql.Float,priceperone)
                    .input('Quantity', sql.Int,quantity)
                    .input('Price', sql.Float,price)
                    .query('EXEC GMB.usp_AddAddCharges @OrderID, @AddChargeType, @PricePerOne,@Quantity,@Price');
            })
            .then(result =>{
                resolve(result.recordset[0])
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

data.GetAllAddChargersByOrderID = async function(orderID){
    return new Promise((resolve, reject)=>{
        sql.connect(dbCon)
        .then(pool => {
            return pool.request()
            .input('OrderID', sql.Int,orderID)
            .query('EXEC GMB.usp_GetAllAddChargersByOrderID @OrderID')
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
module.exports = data;
