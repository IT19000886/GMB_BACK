const express = require('express');
const requireAuth = require("../common/tokenValidator");
const charges = require('../model/chargesModel.js');
const router = express.Router();

router.post('/charges', async (req,res) =>{
    try{

        const tempClientID = req.body.tempClientID;
        const addchargetype = req.body.addchargetype;
        const priceperone = req.body.priceperone;
        const quantity = req.body.quantity;
        const price = priceperone * quantity;
        const result = await charges.AddAddCharges(tempClientID,addchargetype,priceperone,quantity,price)
        res.json(result);
    }catch(err){
        res.status(403).json("Error Occured");
        console.log(err);
    }
});

router.get('/charges/:tempClientID', async(req,res)=>{
    try{
    const tempClientID = req.params.tempClientID
    const result = await charges.GetAllAddChargersByTempClientID(tempClientID)
    res.json(result);
} catch (err) {
    res.status(403).json("Error occurred");
    console.log(err);
}
});

router.get('/tcharges/:tempClientID',async(req,res)=>{
    try{
        const tempClientID = req.params.tempClientID
        const result = await charges.GetAllChargesByTempClientID(tempClientID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
    });

module.exports = router;