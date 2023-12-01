 const route=require('express').Router()
const {getUserById,getRandomUsername,createAnonUser, getUserByUsername}=require('../../controllers/users')

route.get('/:id',async (req,res)=>{
    let user;
    if(isNaN(parseInt(req.params.id)))
    {
        //means its a username
        user=await getUserByUsername(req.params.id)
    }
    else{
        //number is id
        // console.log("id is :",req.params.id);
        user=await getUserById(req.params.id)
    }
    if(user)
    {
        res.status(200).send(user)
    }
    else{
        res.status(404).send({
            error:"No users found"
        })
    }

})

route.post('/',async(req,res)=>{
    const user=await createAnonUser()
    if(user)
    {
        console.log("user created");
        res.status(201).send(user);
    }
    else{
        res.status.send({
            error:"couldnt create the user"
        })
    }


})
route.post('/getUserid',async (req,res)=>{
  const user=await getUserByUsername(req.body.user)
  if(user)
  {
      res.status(201).send(user);
  }
  else{
    res.status.send({
        error:'Couldnt found the user'
    })
  }
})




 module.exports={
    homeRoute:route
 }