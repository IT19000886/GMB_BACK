const express = require('express');
const requireAuth = require("../common/tokenValidator");
const tempClient = require('../model/tempClientModel.js');
const router = express.Router();

router.post('/tempClient', async (req, res) => {
    try {
        const clientName = req.body.clientName;
        const address =  req.body.address;
        const suburb =  req.body.suburb;
        const postalCode = req.body.postalCode;
        const contactNum =  req.body.contactNum;
        const email = req.body.email;
        const imageURL =  req.body.imageURL;
        const date = req.body.date;
        const status = req.body.status;
        const measuredBy = req.body.measuredBy;
        const result = await tempClient.AddTempClient(clientName,address,suburb,postalCode,contactNum,email,imageURL,date,status,measuredBy)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.put('/tempClient/:tempClientID?', async (req, res) => {
    try {
        const tempClientID = req.body.tempClientID
        const clientName = req.body.clientName;
        const address =  req.body.address;
        const suburb =  req.body.suburb;
        const postalCode = req.body.postalCode;
        const contactNum =  req.body.contactNum;
        const email = req.body.email;
        const imageURL =  req.body.imageURL;
        const date = req.body.date;
        const status = req.body.status;
        const measuredBy = req.body.measuredBy;
        const result = await tempClient.UpdateTempClientByTempClientID(tempClientID,clientName,address,suburb,postalCode,contactNum,email,imageURL,date,status,measuredBy)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.get('/tempClient', async (req, res) => {
    try {
        const result = await tempClient.GetTempClients();
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.get('/tempClient/:tempClientID', async (req, res) => {
    try {
        const tempClientID = req.params.tempClientID
        const result = await tempClient.GetTempClientByTempClientID(tempClientID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.delete('/tempClient/:tempClientID', async (req, res) => {
    try {
        const tempClientID = req.params.tempClientID
        const result = await tempClient.DeleteTempClientByTempClientID(tempClientID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

module.exports = router;