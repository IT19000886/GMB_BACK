const express = require('express');
const requireAuth = require("../common/tokenValidator");
const router = express.Router();
const adddiscount = require('../model/discountModel.js');

router.post('/discount', async(req,res)=>{
    try{
        const orderID = req.body.orderID;
        const discount = req.body.discount;
        const result = await adddiscount.AddDiscount(orderID,discount)
        res.json(result);
    }catch(err){
        res.status(403).json("Error Occured");
        console.log(err);
    }
});

router.get('/discount/:orderID?',async(req,res)=>{
    try{
        const orderID = req.params.orderID
        const result = await adddiscount.GetDiscountsByOrderID(orderID)
        res.json(result);
    }catch(err){
        res.status(403).json("Error Occured");
        console.log(err);
    }
})
module.exports = router;