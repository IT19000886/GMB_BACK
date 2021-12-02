require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
// const swaggerUi = require('swagger-ui-express');
// const swaggerDocument = require('./swagger.json');
const ports = require('./common/config.js');
var sql = require('./common/db.js');

const app = express();
const port = process.env.PORT || ports.port;

// const EventEmitter = require('events');
// const emitter = new EventEmitter()
// emitter.setMaxListeners(100)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "Origin,Content-Type,Accept, Authorization, X-Requested-With");
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'DELETE, HEAD, GET, OPTIONS, POST, PUT,PATCH');
    return res.status(200).json({});
  }
  next();
});

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//cotroller
const authController = require('./controller/authController.js');
const settingController = require('./controller/settingController.js');
const tempClientController = require('./controller/tempClientController.js');
const orderController = require('./controller/orderController.js');
const discountController = require('./controller/discountController.js')
const chargesController = require('./controller/chargesController.js')
// handle auth routes
app.use('/api/auth', authController);
app.use('/api/setting', settingController);
app.use('/api/client', tempClientController);
app.use('/api/order', orderController);
app.use('/api/discount',discountController);
app.use('/api/charges',chargesController);

app.listen(port, () => {
  console.log('API server started on: ' + port);
});


