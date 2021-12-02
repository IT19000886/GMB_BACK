const express = require('express');
const requireAuth = require("../common/tokenValidator");
const setting = require('../model/settingModel.js');
const router = express.Router();

// router.use(requireAuth);

router.post('/coveringType', async (req, res) => {
    try {
        const coveringType = req.body.coveringType;
        const code =  req.body.code;
        const result = await setting.InsertCoveringType(coveringType,code)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.put('/coveringType/:CoveringTypeID?', async (req, res) => {
    try {
        const coveringTypeID = req.body.coveringTypeID
        const coveringType = req.body.coveringType;
        const code =  req.body.code;
        const result = await setting.UpdateCoveringTypeByCoveringTypeID(coveringTypeID,coveringType,code)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.get('/coveringType', async (req, res) => {
    try {
        const result = await setting.GetCoveringType()
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});



router.get('/coveringType/:coveringTypeID', async (req, res) => {
    try {
        const coveringTypeID = req.params.coveringTypeID
        const result = await setting.GetCoveringTypeByCoveringTypeID(coveringTypeID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.delete('/coveringType/:coveringTypeID', async (req, res) => {
    try {
        const coveringTypeID = req.params.coveringTypeID
        const result = await setting.DeleteCoveringTypeByCoveringTypeID(coveringTypeID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.post('/location', async (req, res) => {
    try {
        const location =  req.body.location;
        const result = await setting.InsertLocation(location)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.get('/location', async (req, res) => {
    try {
        const result = await setting.GetLocation()
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.delete('/location/:locationID', async (req, res) => {
    try {
        const locationID = req.params.locationID
        const result = await setting.DeleteLocationByLocationID(locationID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.post('/status', async (req, res) => {
    try {
        const status =  req.body.status;
        const result = await setting.InsertStatus(status)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.get('/status', async (req, res) => {
    try {
        const result = await setting.GetStatus()
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.delete('/status/:statusID', async (req, res) => {
    try {
        const statusID = req.params.statusID
        const result = await setting.DeleteStatusByStatusID(statusID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.post('/measuredBy', async (req, res) => {
    try {
        const type =  req.body.type;
        const result = await setting.InsertMeasuredBy(type)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.get('/measuredBy', async (req, res) => {
    try {
        const result = await setting.GetMeasuredBy()
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.delete('/measuredBy/:measuredByID', async (req, res) => {
    try {
        const measuredByID = req.params.measuredByID
        const result = await setting.DeleteMeasuredByMeasuredByID(measuredByID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.post('/pafricRange', async (req, res) => {
    try {
        const range = req.body.range;
        const midValue =  req.body.midValue;
        const result = await setting.InsertPafricRange(range, midValue)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.get('/pafricRange', async (req, res) => {
    try {
        const result = await setting.GetPafricRange()
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.delete('/pafricRange/:pafricRangeID', async (req, res) => {
    try {
        const pafricRangeID = req.params.pafricRangeID
        const result = await setting.DeletePafricRangeByPafricRangeID(pafricRangeID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.post('/coveringSubType1', async (req, res) => {
    try {
        const coveringTypeID = req.body.coveringTypeID;
        const coveringSubType1 =  req.body.coveringSubType1;
        const result = await setting.InsertCoveringSubType1(coveringTypeID,coveringSubType1)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.get('/coveringSubType1/:coveringTypeID', async (req, res) => {
    try {
        const coveringTypeID = req.params.coveringTypeID
        const result = await setting.GetCoveringSubType1ByCoveringTypeID(coveringTypeID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.delete('/coveringSubType1/:coveringSubType1ID', async (req, res) => {
    try {
        const coveringSubType1ID = req.params.coveringSubType1ID
        const result = await setting.DeleteCoveringSubType1ByCoveringSubType1ID(coveringSubType1ID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.post('/coveringSubType2', async (req, res) => {
    try {
        const coveringTypeID = req.body.coveringTypeID;
        const coveringSubType2 =  req.body.coveringSubType2;
        const result = await setting.InsertCoveringSubType2(coveringTypeID,coveringSubType2)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.get('/coveringSubType2/:coveringTypeID', async (req, res) => {
    try {
        const coveringTypeID = req.params.coveringTypeID
        const result = await setting.GetCoveringSubType2ByCoveringTypeID(coveringTypeID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.delete('/coveringSubType2/:coveringSubType2ID', async (req, res) => {
    try {
        const coveringSubType2ID = req.params.coveringSubType2ID
        const result = await setting.DeleteCoveringSubType2ByCoveringSubType2ID(coveringSubType2ID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.get('/additionalcharges', async (req, res) => {
    try {
        const result = await setting.GetAllAdditionalCharges();
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

module.exports = router;