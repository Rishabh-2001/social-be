const e = require('express');
const { where } = require('sequelize');
const {Likes,Posts,Users, Notifications}=require('../db/models')
const {showAllPosts,showPostsByPostID} =require('./posts');
const { sendNotificationToClient } = require('../socketHandler');

async function gettingNewLike(userId,postId,ifDislike){


    const ifalready = await loadLikes(postId,userId); //getting post info ...contains num likes
    console.log("GGGGGGG:::",ifalready.length,typeof(ifalready));
    console.log("IFALREADY:",ifalready );



    if(ifalready.length>0)
    {
        console.log("already liked and val is", ifalready);
        let cnt;
            console.log("I want to diskike this post");
            const postToInrement=await loadLikesFromPost(postId);
            cnt=postToInrement[0].dataValues.numLikes;
            console.log("COunt of likes on this post i s:",cnt);

            if(cnt==0)
            {
                cnt=0;
                res.status(200).send({ message: 0 });
            }
            else{
                cnt--;
                console.log("Updating count value to ",cnt);

                const upd=await Posts.update(
                    {numLikes:cnt},
                   {where: {id:postId}}
                 )
                const delLike= await Likes.destroy({
                    where: {
                       UserId:userId,
                       postId:postId
                    }
                  });
                  console.log("UPD:", upd);

                return cnt;
            }
    }
    else{
        console.log("CRAEATING FIRST LIKE");
          const like= await Likes.create({
            UserId:userId,
            postId,
       } )

       const postToInrement=await loadLikesFromPost(postId);
       console.log("POST to increment:",postToInrement[0]?.UserId);
       const notifStatus=await Notifications.create({
        user_id: postToInrement[0]?.UserId ,
        type: 'like',
        item_id: postToInrement[0]?.id,  // reduce the overhead of calling detials
        userWhoCreated: userId,
    }).then(async (notRes)=>{
        const userr = await Users.findOne({ where: { id: userId } });
        notRes.dataValues.userWhoSent=userr?.firstName;
        console.log("Notification respo:", notRes);
        sendNotificationToClient(notRes)
    })
    .catch(err=>{
        console.log("ERR:",err);

    })
       

    //    const incrementRes=await  postToInrement.increment('numLikes',{by:1});
      let cnt=postToInrement[0].dataValues.numLikes+1;

    const upd=await Posts.update(
        {numLikes:cnt},
       {where: {id:postId}}
     )
        return cnt;
    }
    }
   
 



async function loadLikes(postId,userId){

    // ## ERROR HANDLING NOT PRESENT 
    // const likes=await Likes.findAll({
    //     //if one to one or one to many relationship exist then only we can do something like this 
    //     include: [Users],
    //     include:[Posts],
    //     where:{
    //         postId:postId,
    //         userId:userId
    //     }
    //  });

   return  await Likes.findAll({
        //if one to one or one to many relationship exist then only we can do something like this 
        include: [Users],
        include:[Posts],
        where:{
            postId:postId,
            userId:userId
        }
     }).then(result=>{
        console.log("res found is ",result, typeof(result));
        
        return result;
     })
     .catch(err=>{
        console.log("error found is ",err);
     })


     //PROMISE WAY
    // return new Promise(async (resolve, reject) => {
    //          await Likes.findAll({
    //     //if one to one or one to many relationship exist then only we can do something like this 
    //     include: [Users],
    //     include:[Posts],
    //     where:{
    //         postId:postId,
    //         userId:userId
    //     }
    //  }).then(result=>{
    //     console.log("res found is ",result, typeof(result));
    //    resolve(result)
    //  })
    //  .catch(err=>{
    //     console.log("error found is ",err);
    //     reject(err);

    //  })
    // })


// console.log("Like received is :",likes);
    
//        return likes;


}
async function loadLikesFromPost(postId){

    const post=await showPostsByPostID(postId);
    return post;

    
}

// // gettingNewLike(1,3)


async function tryw()
{
        console.log("FFF:::",await gettingNewLike(3,1,true));
    console.log("$$$$$$$");
    // console.log(await gettingNewLike(1,2,false));
    // console.log("$$$$$$$");
    // console.log(await gettingNewLike(2,4,false));
    // console.log("$$$$$$$");
//       const comments=await showAllComments(13);
//     for(let p of comments){
//         console.log(`${p.title} \n author:${p.user.username}\n${p.body}\n======\n`);
//     }

}
// tryw()


module.exports={
    gettingNewLike,loadLikes
}