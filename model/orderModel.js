'user strict';
var sql = require("mssql");
const dbCon = require('../common/db.js');
var data = {};

data.AddOrders = async function (tempClientID, location, locationCode, SOM, coveringType1, coveringType2, coveringType3,
    measurment, width, drop, quantity, openingWay, controll, contollSide, fabricRange, fabricWidth, mountPoint, fabricDetails, description, specification) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('TempClientID', sql.Int, tempClientID)
                    .input('Location', sql.VarChar(150), location)
                    .input('LocationCode', sql.VarChar(150), locationCode)
                    .input('SOM', sql.VarChar(150), SOM)
                    .input('CoveringType1', sql.VarChar(150), coveringType1)
                    .input('CoveringType2', sql.VarChar(150), coveringType2)
                    .input('CoveringType3', sql.VarChar(150), coveringType3)
                    .input('Measurment', sql.VarChar(150), measurment)
                    .input('Width', sql.Float, width)
                    .input('Drop', sql.Float, drop)
                    .input('Quantity', sql.Int, quantity)
                    .input('OpeningWay', sql.VarChar(150), openingWay)
                    .input('Controll', sql.VarChar(150), controll)
                    .input('ContollSide', sql.VarChar(150), contollSide)
                    .input('FabricRange', sql.Float, fabricRange)
                    .input('FabricWidth', sql.Float, fabricWidth)
                    .input('MountPoint', sql.Float, mountPoint)
                    .input('FabricDetails', sql.VarChar(250), fabricDetails)
                    .input('Description', sql.VarChar(250), description)
                    .input('Specification', sql.VarChar(250), specification)
                    .query('EXEC GMB.usp_AddOrders @TempClientID,@Location,@LocationCode,@SOM,@CoveringType1,@CoveringType2,' +
                        '@CoveringType3,@Measurment,@Width,@Drop,@Quantity,@OpeningWay,@Controll,@ContollSide,@FabricRange,@FabricWidth,' +
                        '@MountPoint,@FabricDetails,@Description,@Specification');
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

data.UpdateOrdersByOrderID = async function (orderID, location, locationCode, SOM, coveringType1, coveringType2, coveringType3,
    measurment, width, drop, quantity, openingWay, controll, contollSide, fabricRange, fabricWidth, mountPoint, fabricDetails, description, specification) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('OrderID', sql.Int, orderID)
                    .input('Location', sql.VarChar(150), location)
                    .input('LocationCode', sql.VarChar(150), locationCode)
                    .input('SOM', sql.VarChar(150), SOM)
                    .input('CoveringType1', sql.VarChar(150), coveringType1)
                    .input('CoveringType2', sql.VarChar(150), coveringType2)
                    .input('CoveringType3', sql.VarChar(150), coveringType3)
                    .input('Measurment', sql.VarChar(150), measurment)
                    .input('Width', sql.Float, width)
                    .input('Drop', sql.Float, drop)
                    .input('Quantity', sql.Int, quantity)
                    .input('OpeningWay', sql.VarChar(150), openingWay)
                    .input('Controll', sql.VarChar(150), controll)
                    .input('ContollSide', sql.VarChar(150), contollSide)
                    .input('FabricRange', sql.Float, fabricRange)
                    .input('FabricWidth', sql.Float, fabricWidth)
                    .input('MountPoint', sql.Float, mountPoint)
                    .input('FabricDetails', sql.VarChar(250), fabricDetails)
                    .input('Description', sql.VarChar(250), description)
                    .input('Specification', sql.VarChar(250), specification)
                    .query('EXEC GMB.usp_UpdateOrdersByOrderID @OrderID,@Location,@LocationCode,@SOM,@CoveringType1,@CoveringType2,' +
                        '@CoveringType3,@Measurment,@Width,@Drop,@Quantity,@OpeningWay,@Controll,@ContollSide,@FabricRange,@FabricWidth,' +
                        '@MountPoint,@FabricDetails,@Description,@Specification');
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

data.GetAllOrdersByTempClientID = async function (tempClientID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('TempClientID', sql.Int, tempClientID)
                    .query('EXEC GMB.usp_GetAllOrdersByTempClientID @TempClientID');
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

data.GetOrdersByOrderID = async function (orderID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('OrderID', sql.Int, orderID)
                    .query('EXEC GMB.usp_GetOrdersByOrderID @OrderID');
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
data.GetOrders = async function(){
    return new Promise((resolve, reject)=>{
        sql.connect(dbCon)
        .then(pool =>{
            return pool.request()
            .query('EXEC GMB.usp_GetOrders');
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
data.DeleteOrdersByOrderID = async function (orderID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('OrderID', sql.Int, orderID)
                    .query('EXEC GMB.usp_DeleteOrdersByOrderID @OrderID');
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
