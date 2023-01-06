const db =require('./db');
const compareCityModel =require('../Model/CompareModel')

// used to get all cityid1, city2 and usedId
async function getalluserCompare(){
    const results = await db.query(`select id, userId, cityId1, cityId2 from compare;`)
    console.log("getallcities");
    var cityObject =[];
    results.forEach(element => {
        const cityObj =new compareCityModel.Compare(element)
        cityObject.push(cityObj)
    });
    return cityObject;
  }

async function getuserCompare(userId){
    const results = await db.query(`select hostcity, foreigncity from compare where userId = \"${userId}\";`)
    console.log(results);
    var cityObject =[];
    results.forEach(element => {
        const cityObj =new compareCityModel.Compare(element)
        cityObject.push(cityObj)
    });
    return cityObject;
  }

// used to create cityId1, cityId2 and userId
  async function createCity(data, userId){
    // console.log(data,userId)   
     var statement = '';
     let message = 'Error in creating';
     await db.query(`select hostcity, foreigncity from compare where userId = \"${userId}\";`).then((value)=>{
      if(value.length === 0)
        statement = `insert into compare (userId, hostcity, foreigncity) values (\"${userId}\",\"${data.hostcity}\",\"${data.foreigncity}\");`
      else
        statement = `update compare set hostcity = \"${data.hostcity}\", foreigncity = \"${data.foreigncity}\" where userId = \"${userId}\";` 
    })
    const result= await db.query(statement)
    
    if (result.affectedRows) {
      message = 'Saved user compare successfully';
    }
  
    return {message};
  }

 
  module.exports={
    getalluserCompare,
    getuserCompare,
    createCity
  }