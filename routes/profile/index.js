const route=require('express').Router()
const path=require('path')

// const { getProfile } =require('../../controllers/profile')
const {getProfile, setProfile} =require('../../controllers/profile.js');

 route.get('/getProfile/:id', async (req,res)=>{
    console.log("Getting PROFILE GET >>>> :", req?.params?.id, ">>>");
    const id=req?.params?.id;

    if(!id)
    {
       return res.status(400).send({
        error: "no user id found"
       })
    }
    else{
          await getProfile(id)
          .then(result=>{
            console.log("REsult found from get progi;e ", result);
            res.status(200).send(result);
           
          })
          .catch(err=>{
            console.log("Error wfound while fetching the perofile ", err);
            return res.status(401).send({
                error: err
               })

          })
    }

 })

 route.post('/setProfile', async (req,res)=>{
    const bodyData=req?.body;
    console.log("BODY DATA IN POST:", bodyData);
    if(!bodyData?.id)
    {
        return res.status(400).send({
            error: "no user id found"
           })
    }
    else{
        await setProfile(bodyData)
        .then(resp=>{
          console.log("AFter seting response:", resp);
          if(resp)
          {
            res.status(200).send(resp);
          }
          res.status(200).send({message:"Data updated Successfuly"});
        })
        .catch(err=> {
          console.log("ERR ", err);
          return res.status(401).send({
              error: err
             })
        })
    }
  
 })








module.exports={
    profileRoute:route
 }