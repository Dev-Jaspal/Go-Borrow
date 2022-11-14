const mongoose = require('mongoose');

var schema = new mongoose.Schema({
      userId:{
        type:String,
      },
      email:{
        type:String,
        unique:false
      },
      productName:{
        type:String,
        required:true
      },
      productPrice:{
        type:String
      },
      productCategory:{
        type:String
      },
      productCondition:{
        type:String
      },
      productBoughtYear:{
        type:String
      },
      productDescription: {
        type:String
      },  
      productlocation:{
        type:String
      },
      productImage:{
        type:String
      },
      borrowedBy:{
        type:String,
        unique:false
      }
})

const Products = mongoose.model('product', schema);

module.exports=Products;