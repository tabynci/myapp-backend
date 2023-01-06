const express =require('express');
const router =express.Router();
const CompareCity=require('../services/CompareCities');
const ComparesCity=require('../Model/CompareCityModel');


router.get("/",async(req,res)=>{
    res.json(await CompareCity.getuserCompareCities());
});


module.exports=router;