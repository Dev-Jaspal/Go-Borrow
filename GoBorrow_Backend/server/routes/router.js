const express = require('express');
const route = express.Router();

const usercontroller = require('../controller/usercontroller');
const productcontroller = require('../controller/productcontroller');

//User API 
route.post('/users', usercontroller.create);
route.get('/users', usercontroller.find);
route.post('/user/login', usercontroller.login);
route.put('/users/:id', usercontroller.update);
route.put('/users/forgetpwd/:id', usercontroller.forgetPassword);
route.delete('/users/:id', usercontroller.delete);

//Product API
route.post('/products', productcontroller.create);
route.get('/products', productcontroller.find);
route.get('/products/:id', productcontroller.findProdsByUserId);
route.put('/products/:id', productcontroller.update);
route.delete('/products/:id', productcontroller.delete);

module.exports=route