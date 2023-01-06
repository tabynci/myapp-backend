
const db =require('./db');
const Compares=require('../Model/CompareCityModel');

// used to get all city and counrty name 
async function getuserCompareCities(){
    const results = await db.query(`select id, country_name, city_name from comparecities;`)
    console.log("getuserCompareCities");
    var cityObject =[];
    results.forEach(element => {
        const cityObj =new Compares.CompareCityModel(element)
        cityObject.push(cityObj)
    });
    return cityObject;
  }

  module.exports={
    getuserCompareCities
  }