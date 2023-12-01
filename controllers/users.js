const {Users}=require('../db/models');
const {getRandomUsername}=require('../utils/username')

// console.log("Users:",Users);

// async function createAnonUser(){
//   const user=await Users.create({
//     username: getRandomUsername(),
//   })

//   return user;
// }

async function getUserById(id){
  return await Users.findOne({ where: { id: id } })
}

async function getUserByUsername(username){
  return await Users.findOne({ where: { username: username } })
}
async function getUserSocketID(userID)
{
  return await Users.findOne({ where: { id: userID }, attributes:['id', 'firstName', 'lastName', 'userName','socketId'] });
}





// async function tryer()
// {
//   console.log(await getUserById(29));
// }

// tryer()

module.exports={getUserById,getRandomUsername,getUserByUsername, getUserSocketID}


async function tryFun()
{
    console.log(await createAnonUser());
    console.log("$$$$$$$$$$$$$");
    console.log(await createAnonUser());
    console.log("$$$$$$$$$$$$$");
    console.log(await createAnonUser());
    console.log("$$$$$$$$$$$$$");
    console.log(await createAnonUser());
    console.log("$$$$$$$$$$$$$");
    console.log(await createAnonUser());
    console.log("$$$$$$$$$$$$$");

}
// tryFun();