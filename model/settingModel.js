'user strict';
var sql = require("mssql");
const dbCon = require('../common/db.js');
var data = {};

data.InsertCoveringType = async function (coveringType,code) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('CoveringType', sql.VarChar(150), coveringType)
                    .input('Code', sql.VarChar(50), code)
                    .query('EXEC GMB.usp_InsertCoveringType @CoveringType,@Code');
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

data.UpdateCoveringTypeByCoveringTypeID = async function (coveringTypeID,coveringType,code) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('CoveringTypeID', sql.Int, coveringTypeID)
                    .input('CoveringType', sql.VarChar(150), coveringType)
                    .input('Code', sql.VarChar(50), code)
                    .query('EXEC GMB.usp_UpdateCoveringTypeByCoveringTypeID @CoveringTypeID,@CoveringType,@Code');
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



data.GetCoveringType = async function () {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .query('EXEC GMB.usp_GetCoveringType');
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

data.GetCoveringTypeByCoveringTypeID = async function (coveringTypeID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('CoveringTypeID', sql.Int, coveringTypeID)
                    .query('EXEC GMB.usp_GetCoveringTypeByCoveringTypeID @CoveringTypeID');
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

data.DeleteCoveringTypeByCoveringTypeID = async function (coveringTypeID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('CoveringTypeID', sql.Int, coveringTypeID)
                    .query('EXEC GMB.usp_DeleteCoveringTypeByCoveringTypeID @CoveringTypeID');
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

data.InsertLocation = async function (location) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('Location', sql.VarChar(150), location)
                    .query('EXEC GMB.usp_InsertLocation @Location');
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

data.GetLocation = async function () {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .query('EXEC GMB.usp_GetLocation');
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

data.GetLocationCode = async function () {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .query('EXEC GMB.usp_GetLocationCode');
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

data.DeleteLocationByLocationID = async function (locationID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('LocationID', sql.Int, locationID)
                    .query('EXEC GMB.usp_DeleteLocationByLocationID @LocationID');
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

data.InsertStatus = async function (status) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('Status', sql.VarChar(150), status)
                    .query('EXEC GMB.usp_InsertStatus @Status');
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

data.GetStatus = async function () {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .query('EXEC GMB.usp_GetStatus');
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

data.DeleteStatusByStatusID = async function (statusID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('StatusID', sql.Int, statusID)
                    .query('EXEC GMB.usp_DeleteStatusByStatusID @StatusID');
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

data.InsertMeasuredBy = async function (type) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('Type', sql.VarChar(150), type)
                    .query('EXEC GMB.usp_InsertMeasuredBy @Type');
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

data.GetMeasuredBy = async function () {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .query('EXEC GMB.usp_GetMeasuredBy');
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

data.DeleteMeasuredByMeasuredByID = async function (measuredByID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('MeasuredByID', sql.Int, measuredByID)
                    .query('EXEC GMB.usp_DeleteMeasuredByMeasuredByID @MeasuredByID');
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

data.InsertPafricRange = async function (range, midvalue) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('Range', sql.VarChar(150), range)
                    .input('MidValue', sql.Int, midvalue)
                    .query('EXEC GMB.usp_InsertPafricRange @Range,@MidValue');
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

data.GetPafricRange = async function () {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .query('EXEC GMB.usp_GetPafricRange');
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

data.DeletePafricRangeByPafricRangeID = async function (pafricRangeID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('PafricRangeID', sql.Int, pafricRangeID)
                    .query('EXEC GMB.usp_DeletePafricRangeByPafricRangeID @PafricRangeID');
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

data.InsertCoveringSubType1 = async function (coveringTypeID,coveringSubType1) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('CoveringTypeID', sql.Int, coveringTypeID)
                    .input('CoveringSubType1', sql.VarChar(50), coveringSubType1)
                    .query('EXEC GMB.usp_InsertCoveringSubType1 @CoveringTypeID,@CoveringSubType1');
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

data.GetCoveringSubType1ByCoveringTypeID = async function (coveringTypeID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('CoveringTypeID', sql.Int, coveringTypeID)
                    .query('EXEC GMB.usp_GetCoveringSubType1ByCoveringTypeID @CoveringTypeID');
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

data.DeleteCoveringSubType1ByCoveringSubType1ID = async function (coveringSubType1ID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('CoveringSubType1ID', sql.Int, coveringSubType1ID)
                    .query('EXEC GMB.usp_DeleteCoveringSubType1ByCoveringSubType1ID @CoveringSubType1ID');
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

data.InsertCoveringSubType2 = async function (coveringTypeID,coveringSubType2) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('CoveringTypeID', sql.Int, coveringTypeID)
                    .input('CoveringSubType2', sql.VarChar(50), coveringSubType2)
                    .query('EXEC GMB.usp_InsertCoveringSubType2 @CoveringTypeID,@CoveringSubType2');
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

data.GetCoveringSubType2ByCoveringTypeID = async function (coveringTypeID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('CoveringTypeID', sql.Int, coveringTypeID)
                    .query('EXEC GMB.usp_GetCoveringSubType2ByCoveringTypeID @CoveringTypeID');
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

data.DeleteCoveringSubType2ByCoveringSubType2ID = async function (coveringSubType2ID) {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                return pool.request()
                    .input('CoveringSubType2ID', sql.Int, coveringSubType2ID)
                    .query('EXEC GMB.usp_DeleteCoveringSubType2ByCoveringSubType2ID @CoveringSubType2ID');
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

data.GetAllAdditionalCharges = async function () {
    return new Promise((resolve, reject) => {
        sql.connect(dbCon)
            .then(pool => {
                
                return pool.request()
                    .query('EXEC GMB.usp_GetAllAdditionalCharges');
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
