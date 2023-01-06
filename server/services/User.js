

const db =require('./db');

const userModule =require('../Model/User');
const contactModel = require('../Model/Contact');

// used to get all users
async function getalluser(){
    const results = await db.query(`select id, username, email, age,admin from users;`)
    console.log("getalluser");
    var userObject=[];
    results.forEach(element => {
        const userOBJ = new userModule.User(element)
        userObject.push(userOBJ)
    });
   
    return userObject;
 }

// used to get all contacts
async function getallcontacts(){
  const results = await db.query(`select id, username, email, message from contact;`)
  console.log("getallcontacts");
  var conatctObject=[];
  results.forEach(element => {
      const conatctOBJ = new contactModel.Contact(element)
      conatctObject.push(conatctOBJ)
  });
 
  return conatctObject;
}


 

//  used to create user
 async function createuser(data){
  console.log(data)
    const result= await db.query(`insert into users (username, email, age, password) values (\"${data.username}\",\"${data.email}\",\"${data.age}\",\"${data.password}\");`)
    console.log(result)
    let message = 'Error in creating user';
  
    if (result.affectedRows) {
      message = 'user created successfully';
    }
   return {message};
  }
  
  // used to store contact details

  async function contacts(data){
    console.log(data)
    const result=  await db.query(`insert into contact (username, email,message) values (\"${data.username}\",\"${data.email}\",\"${data.message}\");`)
    console.log(result)
    let message = 'Error in contact user';
  
    if (result.affectedRows) {
      message = 'contact saved successfully';
    }
   return {message};
  }

 // used to view user iformation
 async function viewUser(id){

     const result= await db.query(`select username, email, age from users where id=\"${id}\";`)
     console.log(result);
      return {result};
  }

//   used to update user data
  async function Updateuser(id, user){
    // console.log(user)
    const result= await db.query(`update users SET username=\"${user.username}\",email=\"${user.email}\",age=\"${user.age}\",password=\"${user.password}\" WHERE id=\"${id}\";`);
    let message = 'Error in Update user';
  
    if (result.affectedRows) {
      message = 'user update successfully';
    }
    return {message};
  }
  
//  used to  delete user
  async function deleteuser(id){
    const result= await db.query(`DELETE FROM users WHERE id=${id}`);
    let message ='Error in deleting users';
    if(result.affectedRows){
    message='user deleted successfully';
    }
    return {message};
}

//
async function deletecontact(id){

  const result= await db.query(`DELETE FROM contact WHERE id=${id}`);
  
  let message ='Error in deleting contacts';
  if(result.affectedRows){
  message='contact deleted successfully';
  }
  return {message};
}


// Used to login 

async function login(data){
  const result=await db.query(`select id, username, password, email, age, admin from users where username=\"${data.username}\";`);
  let message ='Error in login';
  console.log(result);
  return result;
}

// used to check existing user
async function checkNewUser(data){
  const result=await db.query(`select id, username, email, age, admin from users where email=\"${data.email}\";`);
  let message ='Error in login';
  console.log(result.affectedRows);
  return result;
}

  module.exports={
    getalluser,
    getallcontacts,
    createuser,
    contacts,
    viewUser,
    Updateuser,
    deleteuser,
    deletecontact,
    login,
    checkNewUser
 }