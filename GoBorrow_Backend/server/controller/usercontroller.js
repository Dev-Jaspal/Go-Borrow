var Users = require('../model/usermodel');
var Products = require('../model/productmodel');

//Create and save new user
exports.create = (req,res)=>{
    //validate request
    if(!req.body){
         res
          .status(400)
          .send({message: "Content can not be empty"});
    }

    if(req.body)
    {
        const {email} = req.body;
        Users.findOne({email:email}).then(user=>{
            if(user){
                    res.send({success:false,message:`User already exist.`,code:200})
            }
        })
    }

    //new user
    const user = new Users({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        role:req.body.role
    })

    //save user in the database
    user
    .save(user)
    .then(data=>{
        res.send({success:true,message:`User has been created.`,code:200})
    })
    .catch(err => {
        res.status(500).send({
            message:err.message || "some error occurred while creating a create operation."
        });
    });
}

// Retrieve and return all users/ retrieve and return single user
exports.find = (req,res) =>{

    if(req.query.id)
    {
        const id = req.query.id;
        Users.findById(id)
            .then(data=>{
                if(!data){
                    res.status(404).send({message:`Not found user with id ${id}`})
                }
                else
                {
                    res.send(data)
                }
            })
            .catch(err=>{
                res.status(500).send({
                    message:err.message || `some error occurred while retrieving the user inforation with id ${id}`
                });
            })
    }
    else
    {
        Users.find()
        .then(user => {
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({
                message:err.message || "some error occurred while retrieving the user inforation."
            });
        })
    }
}

exports.login = (req,res) =>{

    if(req.body)
    {
        const {email, password} = req.body;
        console.log(email,)
        Users.findOne({email:email, password:password})
            .then(data => {
                if(!data){
                    res.status(404).send({success:false, message: `User not exist.`, code:404})
                }
                else
                {
                    res.send({_id:data._id, name:data.name, email:data.email, role:data.role})
                }
            })
            .catch(err => {
                res.status(500).send({
                    message:err.message || "some error occurred while retrieving the user inforation."
            });
        })
    }
    else
    {
        res
         .status(400)
         .send({message: "Data to login can not be empty"});
    }
}

//Update the  user by id
exports.update = (req,res) =>{
    //validate request
    if(!req.body){
            res
            .status(400)
            .send({message: "Data to update can not be empty"});
    }

    var id = req.params.id;
    Users.findByIdAndUpdate(id, req.body, {returnOriginal: false})
        .then(data=>{
            if(!data)
            {
                res.status(404).send({message:`Cannot update the user with ${id}. Maybe user not found.`});
            }
            else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Error update user information."
            });
        })
}

//Update the  user by id
exports.forgetPassword = (req,res) =>{
    //validate request
    if(!req.body){
            res
            .status(400)
            .send({message: "Data to update can not be empty"});
    }

    var id = req.params.id;
    Users.updateOne({email:id}, req.body, {returnOriginal: false})
        .then(data=>{
            if(!data)
            {
                res.status(404).send({message:`Cannot update the user with ${id}. Maybe user not found.`});
            }
            else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Error update user information."
            });
        })
}


//Delete a user by user email
exports.delete = (req,res) =>{
    const id = req.params.id;

    Users.findByIdAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot delete with the id ${id}. Maybe id is wrong.`})
            }
            else{
                Products.deleteMany({userId: id})
                .then(prod =>{
                    if(!prod){
                        res.status(404).send({message:`Cannot delete products with the user id ${id}. Maybe id is wrong.`})
                    }
                    else{
                        res.send({message:"User and related products is deleted successfully!"})
                    }
                })
                
            }
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "Error deleting user information."
            });
        });
}