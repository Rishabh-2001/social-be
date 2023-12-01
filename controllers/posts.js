const {Posts,Users,Likes, Comments}=require('../db/models')

async function createNewPost(userId,body,image)
{
    const post=await Posts.create({
        
        body,
        UserId:userId,
        image:image
    })

    return post;
}

// query:{
//     username:"",
//     title:""
// }
async function showAllPosts(query){
  const id=query.userId;
  // const t=query.title;
  const b=query.body;
//   console.log("query title:",t);
if(id){
    const posts=await Posts.findAll({
        //if one to one or one to many relationship exist then only we can do something like this 
        include:[{model:Users}, {model:Likes}, {model:Comments,order:[['createdAt','DESC']],include:[{model:Users,  attributes: ['id', 'firstName'],}]}],
        order: [['createdAt', 'DESC']],
        // include:[Likes],
        where:{
            UserId:id
        }
     });
       return posts;
}
if(b){
    const posts=await Posts.findAll({
        //if one to one or one to many relationship exist then only we can do something like this 
        include: [Users, Likes],
        // include: [Likes],
        where:{
            body:b
        }
     });
   
       return posts;
}
const posts=await Posts.findAll({
    include:[{model:Users}, {model:Likes}, {model:Comments,order:[['createdAt','DESC']],include:[{model:Users,  attributes: ['id', 'firstName'],}]}],
    order: [['createdAt', 'DESC']]
    // include:[Likes]
})
return posts;
}

async function showPostsByPostID(id){
  const posts=await Posts.findAll({
    include:[Users, Likes],
    // include:[Likes],
    where:{
        id:id
    }
  });

  return posts;
}

 async function deleteCommentOfPost(id)
 {
    console.log("Coming to delete the comment of post", id);

    // Posts.beforeDestroy(async (id)=>{
    //     await Comment.destroy({
    //         where: {
    //           postId: id
    //         }
    //       });
    // })





    return await Comments.destroy({
        where: {
           postId:id,
        }
      })
      .then(pos=>{
        console.log("delete comments success at db",pos);
        // if the post is dleeeted then delete all its entries from table like likes, userid, 
        return pos;
      })
      .catch(err=>{
        console.log("error whole deleting ",err);
        throw err; 
      })

 }
async function deletePost(id){
    console.log("deleting post of id ",id,"at db");
    deleteCommentOfPost(id)
      .then(res=>{
             console.log("Comments of post delete sucess", id);
     })
     .catch(err=>{
        console.log("error happens while deleting comments",err);
     })

  
   

     return await Posts.destroy({
        where: {
           id:id,
        },
        cascade: true
      })
      .then(pos=>{
        console.log("delete success at db",pos);
        // if the post is dleeeted then delete all its entries from table like likes, userid, 
        return pos;
      })
      .catch(err=>{
        console.log("error whole deleting ",err);
        throw err; 
      })

}

async function updatePost(body,id)
{
    console.log("dat arecieved in DB:", id, body);
     await Posts.update(
        {
         body:body
        },
        {
            where: {id:id}
        }
     )
     .then(DBres=>{
        console.log("SUCCESS DB OPERATION ", DBres[0]);
        return DBres;
     })
     .catch(err=>{
        console.log("Error IN DB:",err);
        throw err;
     })





   


}


module.exports={
    showAllPosts,
    createNewPost,
    showPostsByPostID,
    deletePost,
    updatePost
    
}

async function tryCatch(){
    console.log(await createNewPost(1,"one","rishabh"));
    console.log("$$$$$$$");
    console.log(await createNewPost(1,"one","rishabh"));
    console.log("$$$$$$$");
    console.log(await createNewPost(1,"two","rishabh"));
    console.log("$$$$$$$");
    console.log(await createNewPost(2,'helloWorld','hemant'));
    console.log("$$$$$$$");
    // const q={
    //     userId:3,
    //     title:"helloWorld"
    // }
    // const posts=await showAllPosts(q);
    // for(let p of posts){
    //     console.log(`${p.title} \n author:${p.user.username}\n${p.body}\n======\n`);
    // }

}
// tryCatch()

