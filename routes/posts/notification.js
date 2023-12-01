const route=require('express').Router()
// const {gettingNewLike,loadLikes}=require('../../controllers/likes')
const {getAllNotifications}=require('../../controllers/notifications')


route.get(`/my-notification/:id`,async (req,res)=>{
    const uId=req.params;
    const {id}=uId;
    console.log("UDDD:", id);
    await getAllNotifications(id).then(resp=>{
        // console.log("RESP after getting not:", resp);
        res.status(200).send(resp);

    })
    .catch(err=>{
        console.log("ERR  after my not:", err);
        res.status(400).send({
            error:"couldnt find any Notification"
        })
    })


})

module.exports={
    notificationRoute:route
}