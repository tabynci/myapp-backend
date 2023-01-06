const express =require('express');
const router =express.Router();
const Compare=require('../services/Compare');
const jwt = require('jsonwebtoken');

// used to get all compare details
router.get("/",async(req,res)=>{
    res.json(await Compare.getalluserCompare());
});

router.post("/compareUser",async(req,res)=>{
    const token = jwt.decode(req.body.token, null)   
    console.log(token);
    res.json(await Compare.getuserCompare(token.id));
});

// used to post the comapre data
router.post("/CompareSave", async(req, res, next)=>{
    try{
        const token = jwt.decode(req.body.token, null)   
        // console.log(token.id);
        res.json(await Compare.createCity(req.body, token.id))
    }catch(err){
        next(err);
    }
    
})

module.exports=router;