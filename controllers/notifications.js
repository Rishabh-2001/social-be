const {Notifications}=require('../db/models');
const { getUserSocketID } = require('./users');

async function getUpdatedRes(res) {
    const updatedAAA = await Promise.all(res?.map(async (r) => {
        const userWhoCreatedDetails = await getUserSocketID(r?.userWhoCreated);
        // console.log("%%%", userWhoCreatedDetails?.dataValues);
        return {
            notificationData: r?.dataValues,
            userWhoCreatedDet: userWhoCreatedDetails?.dataValues,
        };
    }));
    
    // console.log("RETURNING ::::",updatedAAA );
    return updatedAAA;
}

async function getAllNotifications(userId) {
    try {
        // console.log("Getting the notification of ", userId);
        const notifications = await Notifications.findAll({
            where: { user_id: userId },
            order: [['createdAt', 'DESC']]
        });

 
        const updatedNotificationRes = await getUpdatedRes(notifications);

        // console.log("UPDATED RES NOTF::>>>", updatedNotificationRes);

        return updatedNotificationRes;
    } catch (error) {
        console.log("Error occurred: ", error);
        throw error;
    }
}
async function updateNotificationReadStatus(userId)
{
     try {
         const notificationsStatus=await Notifications.update(
            {is_read: true},
            {where :{ user_id: userId}}
         )
         return notificationsStatus;
     } catch (error) {
        
     }
}


module.exports={
    getAllNotifications,
    updateNotificationReadStatus
}