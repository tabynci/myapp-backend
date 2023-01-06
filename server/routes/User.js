const express =require('express');
const router =express.Router();
const User=require('../services/User');
const userModule =require('../Model/User');
const { hash, compareSync } = require('bcryptjs');
const e = require('express');
const jwt = require('jsonwebtoken');
const { db } = require('../config');
const { request } = require('express');
// https://www.section.io/engineering-education/how-to-build-authentication-api-with-jwt-token-in-nodejs/

router.post('/login',async (req, res)=>{
  try{
    const {username, password} =req.body;
    // find user in "database", if not exists send error
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }else{
      
      var user= new userModule.User(req.body)

      var dbUser = await User.login(user)

      // var dbuser= new userModule.User(data[0])
      // console.log(compareSync(user.password, dbuser.password))
      if(dbUser[0] && dbUser[0].password && compareSync(user.password, dbUser[0].password))
      {      
          const token = jwt.sign(
          {username:dbUser[0].username, id:dbUser[0].id, email:dbUser[0].email},
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
  
        );
     
      
        return res.status(200).json({Usertoken:token, admin:dbUser[0].admin});
      }
      else
        return res.status(401).json("Invalid user, please login again")

      // res.json(await User.login(user));
    }
   
   
  }catch(err){
    console.error(`Error while login`, err.message);
   }
})

//  used to get all users
router.get("/", async (req, res) => {
   
    res.json(await User.getalluser());
  });

// used to get all contacts
router.get("/allcontact", async (req, res) => {
   console.log(req.body);
  res.json(await User.getallcontacts());
});



//    used to view user data
  router.post("/profile", async(req, res,next)=>{
      try{
        const token = jwt.decode(req.body.token, {complete: true})    
        // console.log(token)
        res.json(await User.viewUser(token.payload.id));
      }catch(err){
          next(err);
      }
      
  });
    
// update user

router.put('/update', async function(req, res, next){
  console.log("request"+req.body)
 
  try{
    
    var user= new userModule.User(req.body.user)
  
    const token = jwt.decode(req.body.token, null)    
  console.log("token"+token)
  const hashpassword = await hash(user.password, 10);
  user.password = hashpassword 
  
    const Newtoken = jwt.sign(
      {username:user.username, id:token.id, email:user.email, password:user.password},
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
      );
      res.json(await User.Updateuser(token.id, user));
   
  }
  catch(err){
    console.error(`Error while updating user`, err.message);
    next(err);
  }
})

//deleted user
router.delete('/:id', async function(req, res, next){
  try {
    res.json(await User.deleteuser(req.params.id));
    console.log(req.params.id)
  }catch(err){
    console.error('error while deleting user', err.message);
    next(err);
  }
})

//deleted user
router.delete('/allcontact/:id', async function(req, res, next){
  try {
    res.json(await User.deletecontact(req.params.id));
    console.log(req.params.id)
  }catch(err){
    console.error('error while deleting conact', err.message);
    next(err);
  }
})



// used to register
router.post("/register",async (req, res)=>{
  try{
    console.log(user)
    var user= new userModule.User(req.body)
    if (!(user.username && user.email && user.age && user.password)) {
      res.status(400).send("All input is required");
    }
    else if((user.username && user.email && user.age && user.password) && user.CheckAge()==true){
      // hash the password
      const hashpassword = await hash(user.password, 10);
      user.password = hashpassword 

      await User.checkNewUser(user).then((value) => {
        // Check if the user exists
        if(value.length != 0){
         return res.status(409).json("User Already Exist. Please Login");
        } else {
           res.status(201).json(User.createuser(user));
        }
      })
      }
    else{
        res.json(user.CheckAge())
    }
 
    }catch(err){
    console.error(`Error while register`, err.message);
    }
 
});


router.post("/contact", async(req, res)=>{
  try{
  
    res.json(await User.contacts(req.body))
    }catch(err){
    console.error(`Error while contact`, err.message);
  }
})

module.exports= router;

  