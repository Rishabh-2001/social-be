const route=require('express').Router()
const {gettingNewLike,loadLikes}=require('../../controllers/likes')
// import verifyToken from '../../Verify'
const {verifyToken}=require('../../Verify')


route.get('/:id', async (req,res)=>{
    if(isNaN(parseInt(req.params.id)))
    {
         res.status(401).send({
         error:"bad request check the post id"
       })
    }
    else{
        const likes=await loadLikes(req.params.id)
        if(likes){
            return res.status(200).send(likes);
        }
        else{
            return res.status(400).send({
                error:"No likes yet"
            })
        }
    }

})
route.post('/', async (req,res)=>{
    const {userId,postId, toDislike}=req.body;
    const like=await gettingNewLike(userId,postId,toDislike)
    console.log("Retuened after db operation ",like);
    if(like)
    {
        res.status(200).send({ message: like });
    }
    else{
        return res.status(201).send({
            error:"disliked post",
            message: like
        })
    }
})



module.exports={
    likesRoute:route
}