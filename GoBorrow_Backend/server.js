const express = require('express');
const dotenv = require('dotenv'); 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
var _und = require('underscore');
const connectDB = require('./server/database/connection')
const app = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT||8080;

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB(); 

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//cors for cross origin request
app.use(cors());

//load routers
app.use('/api', require('./server/routes/router'));

// const uri = "mongodb+srv://admin:admin@goborrowwebapp.lp3njhe.mongodb.net/?retryWrites=true&w=majority";

// connect = async () =>{
//     try{
//         await mongoose.connect(uri);
//         console.log("Connected to MongoDB")
//     }
//     catch(error)
//     {
//         console.error(error)
//     }
// }

// connect();

// var jsondata= require('./movie.json');
// var jsonUser = require('./user.json');
// var jsonProducts = require('./allProducts.json');




// var router = express.Router();



// router.get('/products', (req,res) =>{
//     res.json(jsonProducts);
// })

// router.post('/getuser', (req,res) =>{
//     if(req.body)
//     {
//         console.log(req.body.email);
//         _und.each(jsonUser, (elem, index) =>{
//             if(req.body.email === elem.email)
//             {
//                 res.json(elem);
//             }
//         })
      
//     }
//     else
//     {
//         console.log("Invalid request")
//     }
// })

// router.post('/postdata', (req,res)=>{
//     if(req.body.Id && req.body.Title)
//     {
//         jsondata.push(req.body);
//         res.json(jsondata);
//     }
//     else
//     {
//         console.log("Please enter valid value.")
//     }
// })

// router.put('/updatedata/:id', (req,res)=>{
//     if(req.params.id)
//     {
//         _und.each(jsondata, (elem, index) =>{
//             if(req.params.id === elem.Id)
//             {
//                 elem.Title = "Hello Brother";
//                 elem.Director = "xyz";
//             }
//         })
//         res.json(jsondata);
//     }
//     else
//     {
//         console.log("Invalid request")
//     }
// })

// router.delete('/deletedata/:id', (req,res)=>{
//     getIndextoDelete = -1;
//     if(req.params.id)
//     {
//         _und.each(jsondata, (elem, index) =>{
//             if(req.params.id === elem.Id)
//             {
//                 getIndextoDelete = index;
//             }
//         })
//         if(getIndextoDelete > -1)
//         {
//             jsondata.splice(getIndextoDelete, 1)
//         }
//         res.json(jsondata)
//     }
//     else
//     {
//         console.log("Invalid request")
//     }
// })



app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
