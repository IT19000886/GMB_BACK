const express = require('express');
const requireAuth = require("../common/tokenValidator");
const charges = require('../model/chargesModel.js');
const router = express.Router();

router.post('/charges', async (req,res) =>{
    try{
        const orderID = req.body.orderID;
        const addchargetype = req.body.addchargetype;
        const priceperone = req.body.priceperone;
        const quantity = req.body.quantity;
        const price = req.body.price;
        const result = await charges.AddAddCharges(orderID,addchargetype,priceperone,quantity,price)
        res.json(result);
    }catch(err){
        res.status(403).json("Error Occured");
        console.log(err);
    }
});

router.get('/charges/:orderID', async(req,res)=>{
    try{
    const orderID = req.params.orderID
    const result = await charges.GetAllAddChargersByOrderID(orderID)
    res.json(result);
} catch (err) {
    res.status(403).json("Error occurred");
    console.log(err);
}
});

module.exports = router;