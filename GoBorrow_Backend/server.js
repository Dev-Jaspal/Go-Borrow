const express = require('express');
const dotenv = require('dotenv'); 
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
var _und = require('underscore');
const connectDB = require('./server/database/connection')
const app = express();

dotenv.config({path:'config.env'});
const PORT = process.env.PORT||3000;

//log requests
app.use(morgan('tiny'));

//mongodb connection
connectDB(); 

//parse request to body-parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//cors for cross origin request
app.use(cors({origin:true}));

//load routers
app.use('/api', require('./server/routes/router'));

app.listen(PORT, () =>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
