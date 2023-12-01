// const { Socket } = require('socket.io');
const {Users} =require('../db/models')

async function addUserToSocket(userId, scoketId){
    console.log("SOCKET AND USER:", userId, scoketId); 
    // create the socket id into the isuer db table
    // await Users.update(
    //     {
    //      socketId:socketId
    //     },
    //     {
    //         where: {id:userId}
    //     }
    //  )
    //  .then(DBres=>{
    //     console.log("SUCCESS DB OPERATION SAVING USER SOCKET ", DBres);
    //     return DBres;
    //  })
    //  .catch(err=>{
    //     console.log("Error IN DB:",err);
    //     throw err;
    //  })

     try {
        const user = await Users.findByPk(userId);
        if (user) {
          user.socketId = scoketId;
          await user.save();
          console.log("SUer daved with ", scoketId);
         }
      } catch (error) {
        console.error('Error updating socketId:', error);
      }
    // };




}

async function removeUserToSocket(socketId)
{
    console.log("REMOVING ????", socketId);
    await Users.update(
        {socketId:null},
       {where: {socketId:socketId}}
     )
     .then(res=>{
        console.log("Users socket id is released form db", res);
     })
     .catch(err=>{
        console.log("Err while removing the socket id from db", err);
     })
}



module.exports={
    addUserToSocket,
    removeUserToSocket
}



