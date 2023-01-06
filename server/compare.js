// const express = require('express');
// const cors = require("cors");
// const path = require('path');
// const app = express();
// const session = require('express-session');
// const mysql=require('mysql2/promise');
// const exp = require('constants');
// const db =require('./db');
// app.use(cors())


// async function db(sql){ 
//   const myconnection= await mysql.createConnection({
//     user:"root",
//     host:"localhost",
//     password:"qwerty",
//     database:"loginsystem",
// });

// const [result,]= await myconnection.execute(sql); //

// myconnection.end(function(err) {
//   if(err) {
//       console.log(err.message);
//   }
// });
// return  result;
// }


// async function getuserCompare(id){
//     const result = await db.query(`select id, userId, cityId1, cityId2 from compare;`)
//     console.log("getalluser");
//     return {result};
//   }


//   async function create(data){
//     console.log(data)
//     const result= await db.query(`insert into compare (userId, cityId1, cityId2 ) values (\"${data.userId}\",\"${data.cityId1}\",\"${data.cityId2}\");`)
//     let message = 'Error in creating';
  
//     if (result.affectedRows) {
//       message = 'Create user compare successfully';
//     }
  
//     return {message};
//   }

//   async function UpdateCompare(id, data){
  
//     const result= await db(`update compare SET cityId1=\"${data.cityId1}\",cityId2=\"${data.cityId2}\" WHERE userId=\"${id}\"`);
//     let message = 'Error in Update compare';
  
//     if (result.affectedRows) {
//       message = ' updated  compare successfully';
//     }
  
//     return {message};
//   }
  

//   module.exports={
//     getuserCompare,
//     create,
//     UpdateCompare
// }