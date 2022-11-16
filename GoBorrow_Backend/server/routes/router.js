const express = require('express');
const route = express.Router();

const usercontroller = require('../controller/usercontroller');
const productcontroller = require('../controller/productcontroller');

// var jsonProducts = require('../../allProducts.json');

// route.get('/products', (req,res) =>{
//     res.json(jsonProducts);
// })

//User API 
route.post('/users', usercontroller.create);
route.get('/users', usercontroller.find);
route.post('/user/login', usercontroller.login);
route.put('/users/:id', usercontroller.update);
route.delete('/users/:id', usercontroller.delete);

//Product API
route.post('/products', productcontroller.create);
route.get('/products', productcontroller.find);
route.put('/products/:id', productcontroller.update);
route.delete('/products/:id', productcontroller.delete);

module.exports=route