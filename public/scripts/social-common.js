




$(document).ready(function() {
  console.log("doc ready");
  
})


isLoginRequired()

async function addLikes(postId,numLik){
  
//  const {style}=  $(`#likeIcon-${postId}`)
 console.log("Style val:",$(`#likeIcon-${postId}`).css('color'));

 //comapiiring to grey color
   if( $(`#likeIcon-${postId}`).css('color')==="rgb(128, 128, 128)")
   {
    //it means not liked yet
    // $('#likeIcon').css("color","blue")
    const user= window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):null;
    let userId=user.id;

 
        console.log("For likes first time:",userId,postId);
        let toDislike=false;
        $.post('/api/likes',{userId,postId,toDislike},com=>{
          console.log("First time like",com.message);
          $(`.likeCount-${postId}`).text(com.message)
          $(`#likeIcon-${postId}`).css("color","blue")

        })
    
   }
   else{
    // $(`.likeCount-${postId}`).css("color","grey")
    const user= window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):null;
    let userId=user.id
 
        console.log("For like:",userId,postId);
        let toDislike=true;
        $.post('/api/likes',{userId,postId,toDislike},com=>{
          console.log("Likes added successfully",com.count);
          $(`.likeCount-${postId}`).text(com.message)
          $(`#likeIcon-${postId}`).css("color","grey")
        
        })
  
    }
    
}
  
function handleDelete(title,body,createdAt,id)
{
    //delete the post
  
  $.ajax({
    url:'/api/posts/my-posts',
    type:'DELETE',
    data: id,
    success: function (response){
   
      $(`#edit-post-box`).css("display","none")
    location.reload()


   },
    error: function(error) {
      // Handle the error response from the server
      console.error(error);
    }
  })

 

}

// accepts postId
function handleUpdate(id)
{
  const newTitle=$('#postTitle').val()
  const newBody= $('#postBody').val();

const newData={
  title:newTitle,
  body:newBody,
  id:id
}
console.log("NEW DATA:",  newBody,newTitle);


  //new body n title
  
  $.ajax({
    url: '/api/posts/my-posts',
    type: 'PUT',
    data: JSON.stringify(newData),
    success: function (response){
      console.log("Respn at FE:", response);
      $(`#edit-post-box`).css("display","none")
    location.reload()


   },
    error: function(error) {
      // Handle the error response from the server
      console.error(error);
    }

  })



}

function handleEdit(title,body,createdAt,id)
{
  console.log("Coming to edit the psot ",title );

  let editJsx=`
  <div class="container cont-write-post my-1">
      <h2>Edit your Post: </h2>
  <form id="write-post-form">
      <div class="mb-3">
        <label for="postTitle" class="form-label">Enter Post Title: </label>
        <input type="postTitle" class="form-control" id="postTitle"  value='${title}' >
        
      </div>
      <div class="mb-3">
        <label for="postBody" class="form-label">Body</label>
        <textarea id="postBody" placeholder="Enter the post"  cols="40">${body}</textarea>
      </div>
      
      <button type="submit" id="sbmt-write-post" class="btn btn-primary" onclick='handleUpdate("${id}" )'>Submit</button>
      <button type="submit" id="edit-write-post" class="btn btn-secondary"  onclick='handleDelete( "${title}","${body}","${createdAt}","${id}" )'>Delete</button>
    </form>
  </div>
  `

  $(`#edit-post-box`).append(editJsx);




}


function isLoginRequired(){
    let currentUser=window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):null;
    if(currentUser)
    {
         console.log("user resuming as  :",currentUser);
         $('#currentuser').text(currentUser.firstName);
        //  loadArticles()
    }
    else{
        // $.post('/api/users',{},user=>{
        //       console.log("User created is :",user);
        //       localStorage.user=JSON.stringify(user.username);
        //       $('#currentuser').text(currentUser);
        //     //   loadArticles()
        // })
        window.location.assign('/');
    }
}

async function addComment(postId)
{
   if($(`#post-${postId}`).css("display")==="none")
   {
    $(`#post-${postId}`).css("display","block");
    $.get(`/api/comments/${postId}`,comments=>{
        console.log("Getting all the comments",comments);
        comments.forEach(comment => {
            var date=new Date(comment.createdAt)

            let str=` <div class="comment-card">
            <h4 class="user-who-comment">${comment.User.firstName}<span class="time-comment-made">${date.toLocaleString()}</span></h4>
              <h3 class="comment-title-show">${comment.title}<h3>
              <p class="comment-body-show">${comment.body}</p>
             </div> `

             $(`#allComments-${postId}`).append(str);
            
        });
    })

   }
   else{
    $(`#post-${postId}`).css("display","none");
   }
//    console.log("POST ID",postId);
    // const user= window.localStorage.user?JSON.parse(window.localStorage.user):null;
    // let userId;
    // $(`#post-${postId}`).css("display","block");
    // console.log(e);
    // e.css("display","block");
 


    // $.post('/api/users/getUserid',{user:user},us=>{
    //   userId=us.id
    //   const title=$('#commentTitle').val();
    //   const body=$('#newComment').val();
    //   console.log(userId,title,body,postId);
    //   $.post('./api/comments',{title,body,userId,postId},com=>{
    //     console.log("Comment added successfully");
    //   })

    // }) 

}

async function submitComment(postId){
    console.log("submit fun:",postId);
    const user= window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):null;
    let userId=user.id
    console.log("User writing comemnt iu s:", userId);

        const title=$(`#commentTitle-${postId}`).val();
        const body=$(`#newComment-${postId}`).val();
        console.log(userId,title,body,postId);
        
        $.post('../comments',{title,body,userId,postId},com=>{
          console.log("Comment added successfully", com);
          $(`#commentTitle-${postId}`).val('')
          $(`#newComment-${postId}`).val('')
          addComment(postId);


        })
  
     
}
 function getTimeDifference(time)
{
  
  const newdate=new Date(time)
 
  const current=new Date()
  const _MS_PER_DAY = 1000 * 60 * 60 * 24;
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(newdate.getFullYear(), newdate.getMonth(), newdate.getDate());
  const utc2 = Date.UTC(current.getFullYear(), current.getMonth(), current.getDate());


 if(Math.floor((utc2 - utc1) / _MS_PER_DAY)>=7&&Math.floor((utc2 - utc1) / _MS_PER_DAY)<=365)
 {
   let numWeek=Math.round(Math.floor((utc2 - utc1) / _MS_PER_DAY)/7)
   return `${numWeek} weeks ago`;
 }
 else if(Math.floor((utc2 - utc1) / _MS_PER_DAY)>=1&&Math.floor((utc2 - utc1) / _MS_PER_DAY)<7)
 {
  return `${Math.floor((utc2 - utc1) / _MS_PER_DAY)} days ago`;
 }
 else if(Math.floor((utc2 - utc1) / _MS_PER_DAY)<1)
 {
    return `today`;
 }
 else if(Math.floor((utc2 - utc1) / _MS_PER_DAY)>365)
 {
   let numYear=Math.round(Math.floor((utc2 - utc1) / _MS_PER_DAY)/365)
   if(numYear<2){
   return `${numYear} Year ago`
   }
   else{
    return `${numYear} Years ago`
   }
 }



  
}

$('#user-icon').click(()=>{
  console.log("User clicked");
  if( $('#user-icon-dropdown').css('display') === 'none')
  {
    $('#user-icon-dropdown').css("display", "block");
  }
  else{
    $('#user-icon-dropdown').css("display", "none");
  }
  
})

function handleLogOut()
{
  console.log("Coming in log out");
  localStorage.clear()
  window.location.assign('/')
}

function goToProfile(){
  console.log('Going to profile');
  window.location.assign('/api/profile');
}




