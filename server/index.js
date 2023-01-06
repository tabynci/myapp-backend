require('dotenv/config');
const https = require("https");
const fs = require("fs");



const express=require('express');
const cors =require('cors');
const {verify} = require('jsonwebtoken');
const {hash,compare}= require('bcryptjs');
const app=express();
const compareData=require('./routes/Compare');
const UserRouter =require('./routes/User');
const compareDataCities=require('./routes/CompareCities');
const compareAnotherCityData=require('./routes/CompareAnotherCity');


const corsOptions ={
    origin:'https://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));


app.use(express.json());   //to support JSON-encoded bodies
app.use(express.urlencoded({extended:true})); //support url-encoded bodies

https
  .createServer(
    { key: fs.readFileSync("privatekey.pem"),
    cert: fs.readFileSync("server.crt"),
},app)
  .listen(3005, ()=>{
    console.log('server is runing at port 3005')
  });


// app.listen(process.env.PORT,()=>
// console.log(`server listenting on port ${process.env.PORT || 3005 }`));

app.use("/Users",UserRouter);
app.use("/contacts", UserRouter)
app.use("Users/register", UserRouter);
app.use("Users/user", UserRouter);
app.use("Users/allcontact", UserRouter);
app.use("/Users/allcontact/id", UserRouter)
app.use("/Users/id",UserRouter);
app.use("/Compare",compareData);
app.use("/Compare/CompareSave", compareData);
app.use("/CompareCities",compareDataCities)
app.use("/CompareAnotherCity",compareAnotherCityData)
