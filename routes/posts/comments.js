const route=require('express').Router()
const {createNewComments,showAllComments}=require('../../controllers/comments')

route.get('/:id',async (req,res)=>{
    //this id is the post id 
    //fetch the comments and send it
    if(isNaN(parseInt(req.params.id)))
    {
       res.status(401).send({
        error:"bad request check the post id"
       })
    }
    else{
        // we get numeral post id here
        const comments=await showAllComments(req.params.id)
        if(comments){
            return res.status(200).send(comments);
        }
        else{
            return res.status(400).send({
                error:"No comments yet"
            })
        }

    }

})

route.post('/',async(req,res)=>{
    // console.log("Cinng ot post hte ocmment of user",title,body,userId,postId );

    const {body,userId,postId}=req.body;
    console.log("Cinng ot post hte ocmment of user",body,userId,postId );
    if(!(body)||!(userId)||!(postId))
    {
        return res.status(401).send({
            error: "check userid/postid/body"
        })
    }
    else{
        const comment=await createNewComments(body,userId,postId);
        console.log("Comonet in server after dadding comment s", comment);
        return res.status(201).send(comment);
    }
    
})



module.exports={
    commentsRoute:route 
}