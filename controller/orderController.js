const express = require('express');
const requireAuth = require("../common/tokenValidator");
const order = require('../model/orderModel.js');
const router = express.Router();

router.post('/order', async (req, res) => {
    try {
        const tempClientID = req.body.tempClientID;
        const location =  req.body.location;
        const locationCode = req.body.locationCode;
        const SOM =  req.body.SOM;
        const coveringType1 = req.body.coveringType1;
        const coveringType2 =  req.body.coveringType2;
        const coveringType3 = req.body.coveringType3;
        const measurment =  req.body.measurment;
        const width = req.body.width;
        const drop =  req.body.drop;
        const quantity = req.body.quantity;
        const openingWay =  req.body.openingWay;
        const controll = req.body.controll;
        const contollSide =  req.body.contollSide;
        const fabricRange = req.body.fabricRange;
        const fabricWidth =  req.body.fabricWidth;
        const mountPoint =  req.body.mountPoint;
        const fabricDetails = req.body.fabricDetails;
        const description =  req.body.description;
        const specification = req.body.specification;
        const result = await order.AddOrders(tempClientID, location, locationCode, SOM, coveringType1, coveringType2, coveringType3,
            measurment, width, drop, quantity, openingWay, controll, contollSide, fabricRange, fabricWidth, mountPoint, fabricDetails, description, specification)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.put('/order/:orderID?', async (req, res) => {
    try {
        const orderID = req.body.orderID
        const location =  req.body.location;
        const locationCode = req.body.locationCode;
        const SOM =  req.body.SOM;
        const coveringType1 = req.body.coveringType1;
        const coveringType2 =  req.body.coveringType2;
        const coveringType3 = req.body.coveringType3;
        const measurment =  req.body.measurment;
        const width = req.body.width;
        const drop =  req.body.drop;
        const quantity = req.body.quantity;
        const openingWay =  req.body.openingWay;
        const controll = req.body.controll;
        const contollSide =  req.body.contollSide;
        const fabricRange = req.body.fabricRange;
        const fabricWidth =  req.body.fabricWidth;
        const mountPoint =  req.body.mountPoint;
        const fabricDetails = req.body.fabricDetails;
        const description =  req.body.description;
        const specification = req.body.specification;
        const result = await order.UpdateOrdersByOrderID(orderID, location, locationCode, SOM, coveringType1, coveringType2, coveringType3,
            measurment, width, drop, quantity, openingWay, controll, contollSide, fabricRange, fabricWidth, mountPoint, fabricDetails, description, specification)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.get('/order/:tempClientID', async (req, res) => {
    try {
        const tempClientID = req.params.tempClientID
        const result = await order.GetAllOrdersByTempClientID(tempClientID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.get('/orderByID/:orderID', async (req, res) => {
    try {
        const orderID = req.params.orderID
        const result = await order.GetOrdersByOrderID(orderID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.delete('/order/:orderID', async (req, res) => {
    try {
        const orderID = req.params.orderID
        const result = await order.DeleteOrdersByOrderID(orderID)
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});
router.get('/order',async(req,res)=>{
    try{
        const result = await order.GetOrders();
        res.json(result);
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

router.get('/cal/:tempClientID', async (req, res) => {
    try {
        const tempClientID = req.params.tempClientID
        const result = await order.GetAllOrdersByTempClientID(tempClientID)

        var total=0;

        console.log('');

        // var grouped = {};
        // result.forEach(function (a) {
        //     grouped[a.CoveringType1] = grouped[a.CoveringType1] || [];
        //     grouped[a.CoveringType1].push({ Measurment: a.Measurment, Drop: a.Drop });
          
        // });
          
          var data = [];
          result.reduce(function(res, value) {
            let CoveringType = value.CoveringType1;
            let CoveringType2 = value.CoveringType2;
            let Measurment = value.Measurment;
            let Drop = value.Drop;
            let Width =  value.Width;
            let FabricRange = value.FabricRange;
            let Quantity = value.Quantity;
            let FabricWidth = value.FabricWidth;

            if (!res[CoveringType]) {
              res[CoveringType] = { CoveringType: CoveringType,Quantity: 0,TotalMaterial: 0,MaterialPrice: 0,AditionalCharges: 0,LabourCost: 0,AvgTotal: 0, Total: 0 };
              data.push(res[CoveringType])
            }
            if(CoveringType=='SRB'||CoveringType=='BRB'||CoveringType=='TRB'){
                if(Measurment=='Actual'){
                    var fabricRequirement = (Drop+300)/1000;
                }
                else if (Measurment=='InToOut'){
                    var fabricRequirement = (Drop+500)/1000;
                }

                var aditional=100;
                var labourCost=90*Quantity;

                var fabricPrice = fabricRequirement*(FabricRange+FabricRange*0.25)
                var totalCost=(fabricPrice+aditional)+labourCost

                res[CoveringType].Total += totalCost;
                res[CoveringType].Quantity += Quantity;
                res[CoveringType].AvgTotal = Math.round(res[CoveringType].Total/res[CoveringType].Quantity);
                res[CoveringType].MaterialPrice += fabricPrice;
                res[CoveringType].TotalMaterial  += fabricRequirement;
                res[CoveringType].AditionalCharges  += aditional;
                res[CoveringType].LabourCost  += labourCost
            }
            else if(CoveringType=='Curtain'){
                if(Measurment=='Actual'){
                    var fabricRequirement = (Width+200);
                }
                else if (Measurment=='InToOut'){
                    var fabricRequirement = (Width+400);
                }

                var totalCuts=(fabricRequirement*2.8)/FabricWidth;
                var totalFabric=(totalCuts*3)/1000;
                var fabricPrice = Math.round(totalFabric*(FabricRange+FabricRange*0.25));
                
                var aditional=100;
                var labourCost=((totalCuts+1)*90);
                
                var totalCost=(fabricPrice+aditional+labourCost);

                res[CoveringType].Total += Math.round(totalCost);
                res[CoveringType].Quantity += Quantity;
                res[CoveringType].AvgTotal = Math.round(res[CoveringType].Total/res[CoveringType].Quantity);
                res[CoveringType].MaterialPrice += fabricPrice;
                res[CoveringType].TotalMaterial  += fabricRequirement;
                res[CoveringType].AditionalCharges  += aditional;
                res[CoveringType].LabourCost  = Math.round(labourCost);
            }

            else if(CoveringType=='Sheer-Curtain'){
                if(Measurment=='Actual'){
                    var fabricRequirement = ((Width+200)*2.7)/1000;
                }
                else if (Measurment=='InToOut'){
                    var fabricRequirement = ((Width+500)*2.7)/1000;
                }

                var fabricPrice = fabricRequirement*(FabricRange+FabricRange*0.25)
                
                var aditional=100;
                var labourCost=(fabricPrice*45);
                
                var totalCost=(fabricPrice+aditional+labourCost);

                res[CoveringType].Total += Math.round(totalCost);
                res[CoveringType].Quantity += Quantity;
                res[CoveringType].AvgTotal = Math.round(res[CoveringType].Total/res[CoveringType].Quantity);
                res[CoveringType].MaterialPrice += Math.round(fabricPrice);
                res[CoveringType].TotalMaterial  += Math.round(fabricRequirement);
                res[CoveringType].AditionalCharges  += Math.round(aditional);
                res[CoveringType].LabourCost  = Math.round(labourCost);
            }
            else if(CoveringType=='Plantation Shutter'){
                if(Measurment=='Actual'){
                    var fabricRequirement = ((Width*Drop)/1000000);
                }
                else if (Measurment=='InToOut'){
                    var fabricRequirement = (((Width+200)*(Drop+200))/1000000);
                }

                var aditional=100;
                var labourCost=(Quantity*30);

                if(CoveringType2=="POWDER COAT TIMBER" ||CoveringType2=="STAIN ON TIMBER" ||CoveringType2=="PVC WITH ALUMINIUM INSERT"){
                    var fabricPrice = fabricRequirement+(285*fabricRequirement*0.1);
                }
                else if(CoveringType2=="Aluminium"){
                    var fabricPrice = fabricRequirement+(300*fabricRequirement*0.1);
                }
            
                var totalCost=fabricPrice+labourCost;

                res[CoveringType].Total += Math.round(totalCost);
                res[CoveringType].Quantity += Quantity;
                res[CoveringType].AvgTotal = Math.round(res[CoveringType].Total/res[CoveringType].Quantity);
                res[CoveringType].MaterialPrice += Math.round(fabricPrice);
                res[CoveringType].TotalMaterial  += Math.round(fabricRequirement);
                res[CoveringType].AditionalCharges  += Math.round(aditional);
                res[CoveringType].LabourCost  = Math.round(labourCost);
            }
            return res;
          }, {});
          
        //   console.log(data)
        res.json(data);
       
    } catch (err) {
        res.status(403).json("Error occurred");
        console.log(err);
    }
});

module.exports = router;