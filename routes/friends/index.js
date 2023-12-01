const route=require('express').Router()
const path=require('path')
const {getFriendList,addFriend, getFriendRequestList, changeFriendStatus} =require('../../controllers/friends')


route.post('/add', async (req,res)=>{
    
    const {userId,friendId}=req.body;
    console.log("At server friend add req",userId, friendId );
    if(!userId || !friendId)
    {
        return res.status(400).send({
            error:"invalid request"
        })
    }
    else{
         await addFriend(userId,friendId)
         .then(respo=>{
            console.log("Sucess crateing ", respo);
          return res.status(201).send(respo)
         })
         .catch(err=>{
            console.log("ERR at server for adding friend",err);
            return res.status(406).send({
                error:err
            })
         })
       

    }


     
})

route.get('/:id/all', async (req,res)=>{
    const {id}=req.params;
    console.log("Came to get the all firned list", id);

    if(!id)
    {
        return res.status(400).send({
            error:"invalid request"
        })
    }
    else{
        await getFriendRequestList(id)
        .then(resp=>{
            console.log("Got resp from db and sending to client ", resp);
            return res.status(201).send(resp)
        })
        .catch(err=>{
            console.log("Err received ", err);
            return res.status(406).send({
                error:err
            })
        })
    }
})

route.get(`/:id/friends`, async (req,res)=>{
    const {id}=req.params;
    console.log("Fethivng hte list of USER:", id);
    if(!id)
    {
        return res.status(400).send({
            error:"invalid request"
        })
    }
    else{
        await getFriendList(id)
        .then(resp=>{
            console.log("sending to client ", resp);
            return res.status(201).send(resp)
        })
        .catch(err=>{
            console.log("Err received ", err);
            return res.status(406).send({
                error:err
            })
        })
    }

})

route.post('/respond', async(req,res)=>{
    const {userId,friendId, result}=req.body;
    if(!userId || !friendId || !result)
    {
        return res.status(400).send({
            error:"invalid request"
        })
    }
    else{
        await changeFriendStatus(userId,friendId,result).then(respp=>{
            console.log("RESP AFTER DB:", respp);
            return res.status(201).send("You are friends now");
        })
        .catch(errr=>{
            console.log("Err received ",err);
            return res.status(406).send({
                error: errr
            })
        })
    }

})

module.exports={
    friendsRoute:route 
}

