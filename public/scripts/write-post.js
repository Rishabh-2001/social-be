$('#sbmt-write-post').click(()=>{
    console.log("Form submitted");
    const title=$('#postTitle').val()
    const body=$('#postBody').val()
    
    const user= window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):null;
    console.log("user writing :",user);
    const userId=user.id;
   

            sendToPost({userId,title,body});
                

    


})
 function sendToPost(q){
    console.log(q.title,q.userId,q.body);
    $.post('/api/posts/write',q,po=>{
        console.log("Post added",po);
        // $('#postTitle').reset()
        // $('#postBody').reset()  
    })
    
}

