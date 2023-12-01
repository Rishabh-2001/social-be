
// import moment from "moment/moment";

function loadMyArticles(){
    const user= window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):null;
    if(user)
    {
        const userId=user.id;
        console.log("Get dposts of user id :", userId);
            getMyPosts(userId);
    }

 
}
// async function addComment(postId)
// {
//    if($(`#post-${postId}`).css("display")==="none")
//    {
//     $(`#post-${postId}`).css("display","block");
//     $.get(`/api/comments/${postId}`,comments=>{
//         console.log("Getting all the comments",comments);
//         comments.forEach(comment => {
//             var date=new Date(comment.createdAt)

//             let str=` <div class="comment-card">
//             <h4 class="user-who-comment">${comment.user.username}<span class="time-comment-made">${date.toLocaleString()}</span></h4>
//               <h3 class="comment-title-show">${comment.title}<h3>
//               <p class="comment-body-show">${comment.body}</p>
//              </div> `

//              $(`#allComments-${postId}`).append(str);
            
//         });
//     })

//    }
//    else{
//     $(`#post-${postId}`).css("display","none");
//    }
// //    console.log("POST ID",postId);
//     // const user= window.localStorage.user?JSON.parse(window.localStorage.user):null;
//     // let userId;
//     // $(`#post-${postId}`).css("display","block");
//     // console.log(e);
//     // e.css("display","block");
 


//     // $.post('/api/users/getUserid',{user:user},us=>{
//     //   userId=us.id
//     //   const title=$('#commentTitle').val();
//     //   const body=$('#newComment').val();
//     //   console.log(userId,title,body,postId);
//     //   $.post('./api/comments',{title,body,userId,postId},com=>{
//     //     console.log("Comment added successfully");
//     //   })

//     // }) 

// }

// async function submitComment(postId){
//     console.log("submit fun:",postId);
//     const user= window.localStorage.user?JSON.parse(window.localStorage.user):null;
//     let userId;
//     $.post('/api/users/getUserid',{user:user},us=>{
//         userId=us.id
//         const title=$(`#commentTitle-${postId}`).val();
//         const body=$(`#newComment-${postId}`).val();
//         console.log(userId,title,body,postId);
//         $.post('./api/comments',{title,body,userId,postId},com=>{
//           console.log("Comment added successfully");
//           $(`#commentTitle-${postId}`).val('')
//           $(`#newComment-${postId}`).val('')
//           addComment(postId);


//         })
  
//       }) 
// }
loadMyArticles()


function getMyPosts(userId){
    $.get(`./my-posts/${userId}`,posts=>{
        console.log("Gtting my posts", posts);
       
        for(let post of posts){
            let col= post.numLikes>0? "blue":"grey";
            let ddd=JSON.stringify(post);
            const{title,body,createdAt,id,user}=post;
            
            const renderPost=`
            <div class="col-6 mx-auto my-2" id='edit-post-cont'  >
                    <div class="card">
                        <div class="card-body">
                         <div class="date-title">
                            <h5 class="card-title" >${post.title}</h5>
                            <div>
                              <span  onclick='handleEdit( "${title}","${body}","${createdAt}","${id}" )' >${getTimeDifference(post.createdAt)}</span>
                                        
                              <i class="fa fa-edit" style="color:grey;" onclick='handleEdit( "${title}","${body}","${createdAt}","${id}" )' ></i>
                              </div>
                              </div>
                                <h6 class="card-subtitle mb-2 text-muted">${post.User.firstName}</h6>
                                
                                <p class="card-text">${post.body.substr(0,200)}...<a href="#">Read more</a></p>
                                <span class="likeCount-${post.id}">${post.numLikes}</span>
                                <i class="fa fa-heart" id="likeIcon-${post.id}" style="color: ${col};margin-right:1em;"></i>
                                <i class="fa fa-comment" style="color: blue;"></i>
                               
                                <br>
                                <span  class="card-link" onclick=addLikes(${post.id},${post.numLikes}) style="text-decoration: none; ">Like</span>
                                <span  onclick=addComment(${post.id})  class="card-link"style="text-decoration: none;" >Comment</span>
    
                        </div>
                        <div class="comment-container" id="post-${post.id}">
                        <label for="newComment" name="newComment">Add your comment-</label>
                        <br>
                        <input type="text" id="commentTitle-${post.id}" placeholder="Enter title">
                        <br>
                        <textarea id="newComment-${post.id}" ></textarea>
                        <br>
                        <button id="addComments" onclick=submitComment(${post.id})>Add Comment</button>
                        <div id="allComments-${post.id}">
                          
                        </div>
                    </div>
                    </div>
                </div>
            `
            $('#posts-box').append(renderPost);
          }
       
         
    })

   

}

