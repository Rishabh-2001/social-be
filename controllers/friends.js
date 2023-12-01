const {Users,Friends, Notifications,db} =require('../db/models')
const {sendNotificationToClient} = require('../socketHandler');
const { getUserSocketID } = require('./users');

const { Op, Sequelize,QueryTypes } = require('sequelize'); // Import Sequelize's operators


async function getFriendList(id){
    console.log("Fetching friend list of", id);

    try {
        // const friendList= await Friends.findAll({
        //     where:
            
        //     {user_id: id, status:"ACCEPTED"},
        //     order: [['createdAt', 'DESC']]
        // })
        // console.log('Friend list is :', friendList);
        // const updatedFriendList=await getUpdatedFriendData(friendList);
        // return updatedFriendList;
        const friendsList = await Friends.findAll({
            where: {
              [Op.or]: [
                { user_id: id, status:"ACCEPTED" },
                { friendId: id, status:"ACCEPTED" },
              ],
            },
          });
          
          console.log("Matching Friends:", friendsList);
           const updatedFriendList=await getUpdatedFriendData(friendsList, id);
        return updatedFriendList;

          


    } catch (error) {
         console.log("Error :", error);
         throw error;
    }


  

}
async function removeFriend(){
}
async function addFriend(userId,friendId){
   console.log("USer ",userId ,"adding frined to ", friendId);
   const isAlreadySent=await checkIfSentAlready(userId,friendId)
   console.log("IS ALREADY RES:===",isAlreadySent);
   if(isAlreadySent.length>0)
   {
      return "Request Already Sent";
   }
   else{
        return await Friends.create({
            user_id:userId,
            friendId:friendId,
            status: "PENDING"
        }).then(async (resp)=>{
            console.log("Success friend req sent ",resp);
            const user = await Users.findOne({ where: { id: userId } });
            if (user) {
              // Add the user's first name to the response
              resp.dataValues.userFirstName = user.firstName;
            }

            console.log("#######RESPPPP:::::#####",resp?.dataValues);
            const {id,user_id,friendId}=resp?.dataValues;
            const notifStatus=await Notifications.create({
                user_id: friendId ,
                type: 'friend_request',
                item_id: id,
                userWhoCreated: userId

            }).then(notRes=>{
                notRes.dataValues.userWhoSent=user.firstName;
                console.log("Notification respo:", notRes);
                sendNotificationToClient(notRes)
                
            })
            .catch(err=>{
                console.log("ERR:",err);

            })


            return resp;
        })
        .catch(err=>{
            console.log("Err while sending req", err);
            throw err;
        })
   }
  
}
async function checkIfSentAlready(userId,friendId)
{
    return await Friends.findAll({
        where:{
             user_id:userId,
             friendId:friendId,
        }
    }).then(ress=>{
        console.log("IF ALREADY RES",ress);
        return ress;
    })
    .catch(err=>{
        console.log("IF ALREADY ERR:",err);
        throw err;
    })
}
async function getUpdatedFriendList(friendList)
{
     const updatedList= await Promise.all(friendList?.map(async (friend)=>{
        const userWhoSent=await getUserSocketID(friend?.dataValues?.user_id);
        return {
            friendReqData: friend?.dataValues,
            userWhoSentData: userWhoSent?.dataValues
        }
     }))
     return updatedList;
}
async function getUpdatedFriendData(friendList, selfId)
{
     const updatedList= await Promise.all(friendList?.map(async (friend)=>{
       if(selfId!=friend?.dataValues?.friendId){
        const userWhoSent=await getUserSocketID(friend?.dataValues?.friendId);
        return {
            friendData: friend?.dataValues,
            friendUser: userWhoSent?.dataValues
        }
    }
    else{
        const userWhoSent=await getUserSocketID(friend?.dataValues?.user_id);
        return {
            friendData: friend?.dataValues,
            friendUser: userWhoSent?.dataValues
        }
    }
     }))
     return updatedList;
}
async function getFriendRequestList(userId)
{
    //checking the rows where userId is friendId as he received the req so he want to know who sent
    try {
        const friendList= await Friends.findAll({
            where:{friendId: userId, status:"PENDING"},
            order: [['createdAt', 'DESC']]
        })
        console.log('Friend list is :', friendList);
        const updatedFriendList=await getUpdatedFriendList(friendList);
        return updatedFriendList;
    } catch (error) {
         console.log("Error :", error);
    }


}

async function changeFriendStatus(userID, friendId, result)
{
    //either user wants to accept or decline the friends with friendId
    await Friends.update(
        {status: result},
        {
            where: {
              [Op.and]: [
                {
                  [Op.or]: [
                    { user_id: userID, friendId: friendId },
                    { user_id: friendId, friendId: userID }
                  ]
                },
                { status: 'pending' } // To make sure only pending rows are updated
              ]
            }})
        .then(resp=>{
            console.log("SUCCESS", resp);
            return resp;
        })
        .catch(err=>{
            console.log("ERR  received:", err);
            throw err;
        })


}

// async function getFriends(userId)
// {
//     const friendsRes=await Friends.findAll(
//         {where:{user_id: userId, status: 'ACCEPTED'}},
//         order: {}
//     )
// }


// async function changeFriendStatus(){
// }

module.exports={
    addFriend,getFriendList, getFriendRequestList, changeFriendStatus
}
// aaaaaaa1a1a1a1a1a1a1a1a1a1aa11a11aa1a1a1a1a1a1a1a1a1a1111111111111111aaaaaaaaaa11111111111a1a1a1a1aaaa1aaaa111111111aaa1a1aa11aa1assss1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111s1sss                                                                                                                                                  