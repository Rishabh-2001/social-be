const { Server } = require('socket.io');
const { addUserToSocket, removeUserToSocket } = require('./controllers/socket');
const { getUserSocketID } = require('./controllers/users');
const { updateNotificationReadStatus } = require('./controllers/notifications');
let io;
 function initializeSocket(server){
     io = new Server(server,{
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
        connectionStateRecovery: {
          // the backup duration of the sessions and the packets
          maxDisconnectionDuration: 2 * 60 * 1000,
          // whether to skip middlewares upon successful recovery
          skipMiddlewares: true,
        }}
  )

   io.on('connection',(socket)=>{
    console.log("User conncted :", socket.id);
 
    socket.on('disconnect', async (data) => {
       console.log('A user disconnected:', socket.id,"GGGGGG::?????", data);
      //  await removeUserToSocket(socket.id)
      //    .then(res=>{
      //     console.log("RESPONSE after removing the user from the databs", res);
      //    })
      //    .catch(err=>{
      //     console.log("Error received while removing the socket id ", err);
      //    })

     });
     socket.on('addSocketToDB',async(data)=>{
      const {userId}=data;
      console.log("Getting data at the adding user in socket :", userId, "associate dwith the socket id ", socket.id);
         await addUserToSocket(userId, socket.id)
         .then(resp=>{
          console.log("REsponse from the database after saving the user einto the db", resp);
          return resp;
         })
         .catch(err=>{
          console.log("Err while saving the socket id into the user db", err);
         })

       
     })
     socket.on('read-notifications', async (data)=>{
        const {userId} =data;
        await updateNotificationReadStatus(userId)
        .then(res=>{
          console.log("User response changed");
        })
        .catch(err=>{
          console.log("error while canging status ");
        })
     })
   
 })
 return io;
 }

async function sendNotificationToClient(notification) {
    console.log("NOTTTT:", notification.dataValues);
    const user_id=notification?.user_id;
    await getUserSocketID(user_id)
      .then(ress=>{
        console.log("Response received as socket id : ", ress?.dataValues?.socketId);
        const userSocketId=ress?.dataValues?.socketId;
        console.log("USER SOCKET ID DDDDDD", userSocketId);
        io.to(userSocketId).emit('notification', notification.dataValues);
      })
      .catch(err=>{
        console.error("Error received is ", err)
        console.log("Err received at data ", err);
      })


    // io.emit('notification', notification.dataValues);
  }


 module.exports = {initializeSocket, sendNotificationToClient};