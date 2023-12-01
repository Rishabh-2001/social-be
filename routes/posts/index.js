const route=require('express').Router()
const path=require('path')
const {showAllPosts,createNewPost, deletePost, updatePost}=require('../../controllers/posts')





route.get('/my-posts/:id',async(req,res)=>{
  console.log("Coming to get my posts with id");
  let q={
    userId:"",
    title:""
  }
 if(req.params.id){
    q.userId=req.params.id;
 }
  

  const posts=await showAllPosts(q);
  if(posts)
  {
    console.log("POSTS",posts);
    res.status(200).send(posts);
  }
  else{
    res.status(400).send({
        error:"couldnt find any post"
    })
  }

  
})
// route.get('/my-post',(req,res)=>{
//   res.sendFile( path.join(__dirname, '/../../public/components/my-post.html'));
// })
route.get('/all',async (req,res)=>{
  console.log("Come to get data");
    let q={
        userId:"",
        title:""
      }
       
      const posts=await showAllPosts(q);
      if(posts)
      {
        res.status(200).send(posts);
      }
      else{
        res.status(400).send({
            error:"couldnt find any post"
        })
      }
})
// route.get('/write', async (req,res)=>{
   
//   res.sendFile( path.join(__dirname, '/../../public/components/write-post.html'));
// })
route.post('/write',async(req,res)=>{
  console.log("Posting data");
   const {body,userId,image}=req.body;

   if((!body)||(!userId)){
    return res.status(400).send({
        error:"need userid/post body/title"
    })
   }
   else{
      const post=await createNewPost(userId,body,image)
      res.status(201).send(post)
   }
})


route.delete('/my-posts', async(req,res)=>{
  //delte post
  const data = req.body;
  console.log("dssds",data);
  const key = Object.keys(data)[0];
  console.log("KEYYY:", key);
 
  if(!key)
  {
    return res.status(400).send({
      error:"invalid post id or bad request"
  })
  }
  else{
    await deletePost(key)
    .then(response=>{
      if(response!=0)
      {
        // this reponse gives back the post id which is deleted
        return res.status(202).send({ message: "successfuly deleted" });
      }
      else{
        return res.status(202).send({ message: "already deleted" });
      }
    })
    .catch(err=>{
      return res.status(401).send({
        error:"couldn't delete post, Retry !"
      })
    })
  }
  // db operation 
})

route.put('/my-posts', async (req,res)=>{

  const data=req.body;
  console.log("data in req is EDITINGGGGG:", data);
  const jsonString = Object.keys(data)[0];
  const jsonBody = JSON.parse(jsonString);

  const title = jsonBody.title;
const body = jsonBody.body;
const id = jsonBody.id;

console.log("Title:", title);
console.log("Body:", body);
console.log("ID:", id);

if(!id|| !title || !body)
{
  return res.status(400).send({
    error:"check the required data"
})
}
else{
  console.log("sednign data to DB , ", title, body, id);
  updatePost(title,body,id)
  .then(response=>{
  console.log("Resp recieved in server is :", response);
    return res.status(201).send({
      message: response
    })
  })
  .catch(err=>{
    console.log("error is in server end :", err);
     return res.status(401).send({
      error:"couldn't update the data"
     })
  })



}
   


})

module.exports={
    postsRoute:route 
}