const express =require('express');
const router =express.Router();
const CompareAnotherCity=require('../services/CompareAnotherCities');
const CompareAnothercities = require('../Model/CompareAnotherCityModel');

router.get("/", async(req, res)=>{
    res.json(await CompareAnotherCity.getAnotherComparecity());
})
module.exports=router;