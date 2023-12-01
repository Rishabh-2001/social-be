const {Users} =require('../db/models')
const bcrypt = require("bcryptjs");

async function addUser(userData){
    console.log("USER DARA ADDUSER",userData);
  
  return new Promise( (resolve, reject) => {
    Users.findAll({
      where: {
        email: userData.email
      }
    }).then(async (res)=>{
      console.log("RES VALUE in reigster:", res);

      if(res.length>0&& res[0].dataValues.isVerified)
      {
        // add ocondition to route if verified else already exist
        reject("user already exist")
      }
      else if(res.length>0 && !res[0].dataValues.isVerified)
      {
          reject("Verify Your Accoount");
      }
      else{
        const newus=await addUserFn({ firstName: userData.firstName,lastName:userData.lastName,password:userData.hash,email:userData.email })
        resolve(newus);
      }
    })
    .catch(err=>{
      console.log(err);
      reject(err.message)
    })
  })  
  
  }
  async function verifyUser(userData)
  {
    console.log("DB:",userData);
    return new Promise((resolve, reject) => {
        Users.findAll({
          where:{
            email:userData.email
          }
        })
        .then(async (res)=>{
          if(res.length>0)
          {
            //REQUIRED OINDITION 
  
            console.log("user already exist");
            resolve(res[0].dataValues);
            
          }
          else{
            reject("This user email doesn't exist");
          }
  
        })
        .catch(err=>{
          console.log("ERROR in database:",err.message);
          reject(err.message)
        })
    })
  }
  async function addUserFn(data)
  {
   
    const {firstName,lastName,password,email}=data;
    return  await Users.create({ firstName: firstName,lastName:lastName,password:password,email:email });
  }
  
  module.exports= {Users,addUser,verifyUser};