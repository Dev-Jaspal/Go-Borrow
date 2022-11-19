var Products = require('../model/productmodel');
var Users = require('../model/usermodel');

//Create and save new product
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
         res
          .status(400)
          .send({message: "Content can not be empty"});
    }

    //new product
    const product = new Products({
        userId:req.body.userId,
        email:req.body.email,
        productName:req.body.productName,
        productPrice:req.body.productPrice,
        productCategory:req.body.productCategory,
        productCondition:req.body.productCondition,
        productBoughtYear:req.body.productBoughtYear,
        productDescription: req.body.productDescription,  
        productlocation:req.body.productlocation,
        productImage:req.body.productImage,
        borrowedBy:req.body.borrowedBy
    })

    //save product in the database
    product
    .save(product)
    .then(data=>{
        res.send({success:true,message:`Product has been created.`,code:200})
    })
    .catch(err => {
        res.status(500).send({
            message:err.message || "some error occurred while creating a create operation."
        });
    });
}


// Retrieve and return all products/ retrieve and return single product
exports.find = (req,res) =>{
    if(req.query.id)
    {
        const id = req.query.id;
        Products.findById(id)
            .then(response=>{
                if(!response){
                    res.status(404).send({message:`Not found product with id ${id}`})
                }
                else
                {
                    Users.findById(response.userId)
                    .then(data=>{
                        if(!data){
                            res.status(404).send({message:`Not found user with id ${id}`})
                        }
                        else
                        {
                            var prodDetail = {
                                ownerName: data.name,
                                ownerEmail: data.email,
                                ...response._doc
                            }
                            res.send(prodDetail)
                        }
                    })
                    .catch(err=>{
                        res.status(500).send({
                            message:err.message || `some error occurred while retrieving the user inforation with id ${id}`
                        });
                    })
                }
            })
            .catch(err=>{
                res.status(500).send({
                    message:err.message || `some error occurred while retrieving the product inforation with id ${id}`
                });
            })
    }
    else
    {
        Products.find()
        .then(prod => {
            res.send(prod)
        })
        .catch(err => {
            res.status(500).send({
                message:err.message || "some error occurred while retrieving the product inforation."
            });
        })
    }
}

// Retrieve and return all products by user id
exports.findProdsByUserId = (req,res) =>{
    const id = req.params.id;
    Products.find({ $or : [{userId: id}, { borrowedBy: id}] })
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({
                message:err.message || "some error occurred while retrieving the user inforation."
            });
    })
}

//Update the  product by id
exports.update = (req,res) =>{
    //validate request
    if(!req.body){
            res
            .status(400)
            .send({message: "Data to update can not be empty"});
    }

    const id = req.params.id;
    console.log(id)
    console.log(req.body)
    Products.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data)
            {
                res.status(404).send({message:`Cannot update the product with ${id}. Maybe user not found.`});
            }
            else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Error update product information."
            });
        })
}

//Delete a product by id
exports.delete = (req,res) =>{
    const id = req.params.id;

    Products.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot delete with the id ${id}. Maybe id is wrong.`})
            }
            else{
                res.send({message:"Product is deleted successfully!"})
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Error deleting product information."
            });
        });
}
