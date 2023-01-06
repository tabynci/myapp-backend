const mysql =require('mysql2/promise');
const config = require('../config');


async function query(sql,params) {
    console.log(config.db)

    const myconnection =await mysql.createConnection(config.db);
    const [result, ] =await myconnection.execute(sql, params);

    myconnection.end(function(err) {
        if(err) {
            console.log(err.message);
        }
      });

    return result;

}


module.exports ={
    query
}