'user strict';
var sql = require("mssql");
const dbCon = require('../common/db.js');
var data = {};

data.AddDiscount = async function(orderID,discount){
    return new Promise((resolve,reject) =>{
        sql.connect(dbCon)
        .then(pool =>{
            return pool.request()
            .input('OrderID',sql.Int,orderID)
            .input('DiscountPercentage', sql.Float,discount)
            .query('EXEC GMB.usp_AddDiscounts @OrderID,@DiscountPercentage');
        
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

data.GetDiscountsByOrderID = async function(orderID){
    return new Promise((resolve,reject)=>{
        sql.connect(dbCon)
        .then(pool =>{
            return pool.request()
            .input('OrderID', sql.Int,orderID)
            .query('EXEC GMB.usp_GetDiscountsByOrderID @OrderID')
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