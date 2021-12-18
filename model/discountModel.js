'user strict';
var sql = require("mssql");
const dbCon = require('../common/db.js');
var data = {};

data.AddDiscount = async function(tempClientID,discount){
    return new Promise((resolve,reject) =>{
        sql.connect(dbCon)
        .then(pool =>{
            return pool.request()
            .input('TempClientID',sql.Int,tempClientID)
            .input('DiscountPercentage', sql.Float,discount)
            .query('EXEC GMB.usp_AddDiscounts @TempClientID, @DiscountPercentage');
        
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

data.GetDiscountsByTempClientID = async function(tempClientID){
    return new Promise((resolve,reject)=>{
        sql.connect(dbCon)
        .then(pool =>{
            return pool.request()
            .input('TempClientID', sql.Int,tempClientID)
            .query('EXEC GMB.usp_GetDiscountsByTempClientID @TempClientID')
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