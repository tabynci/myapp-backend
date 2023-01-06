const db =require('./db');
const ComparesAnotherCity=require('../Model/CompareAnotherCityModel');

async function getAnotherComparecity(){
    const result =await db.query(`select id, country_name, city_name from compareanothercity;`)
    var cityObject=[];
    result.forEach(element=>{
        const cityObj =new ComparesAnotherCity.CompareAnotherCityModel(element)
        cityObject.push(cityObj)
    });

    return cityObject;
}

module.exports={
    getAnotherComparecity
}