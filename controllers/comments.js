const {Comments,Users,Posts, Notifications}=require('../db/models');
const comments = require('../routes/posts/comments');
const { sendNotificationToClient } = require('../socketHandler');
/*
const q={
    title:"",
    body:""
}
*/

async function createNewComments(body,userId,postId)
{
    //comments created
    // const comment=await Comments.create({
    //     title,
    //     body,
    //     UserId:userId,
    //     postId
    // })

    return await Comments.create({
        body,
        UserId:userId,
        postId
    }).then(async (comment)=>{
        console.log("in then :", comment);
        const postRes=await Posts.findOne({where: {id:postId}})
         console.log("POSTS DATA  GOT:", postRes?.dataValues?.UserId);

        const notifStatus=await Notifications.create({
            user_id: postRes?.dataValues?.UserId ,
            type: 'comment',
            item_id: comment?.dataValues?.id,  // reduce the overhead of calling detials
            userWhoCreated: userId
        }).then(async (notRes)=>{
            const userr = await Users.findOne({ where: { id: userId } });
            console.log("USER$$$$", userr);
            notRes.dataValues.userWhoSent=userr?.dataValues?.firstName ;
            console.log("Notification respo:", notRes);
            sendNotificationToClient(notRes)
        })
        .catch(err=>{
            console.log("ERR:",err);
    
        })
        console.log("$$$$RETURNING comment too");
        return comment;
    })
    .catch(err=>{
        throw err;
    })



    // return comment;
}



async function showAllComments(postId){
    const comments=await Comments.findAll({
        //if one to one or one to many relationship exist then only we can do something like this
        include: [Users],

        where:{
            postId:postId
        }
     });
       return comments;
}



// async function tryd(){
//     console.log(await createNewComments("Title one","one comment",3,1));
//     console.log("$$$$$$$");
//     console.log(await createNewComments("Title two","two comment",1,2));
//     console.log("$$$$$$$");
//       const comments=await showAllComments(1);
//     for(let p of comments){
//         console.log(`${p.title} \n author:${p.user.username}\n${p.body}\n======\n`);
//     }
    
   
// }
// tryd()
module.exports={
    createNewComments,showAllComments
}




