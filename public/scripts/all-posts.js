
loadArticles()
function loadArticles()
{
  const user= window.localStorage.currentUser?JSON.parse(window.localStorage.currentUser):null;
  userId=user.id;
    $.get('./all',posts=>{
        console.log("Getting all posts:",posts);
        
      for(let post of posts){
        console.log("POST:", post);
        //here compare with particular user's likes
            let isLike= false;
            for(let i=0;i<post.likes.length;i++)
            {
              // console.log("Com[pairing the ", userId, post?.likes?.[i]?.UserId);
                  if(post?.likes?.[i]?.UserId===userId)
                  {
                    isLike=true;
                    break;

                  }
            }





        let col= isLike===true? "blue":"grey";
        
        const renderPost=`
        <div class="col-6 mx-auto my-2"  >
                <div class="card">
                    <div class="card-body">
                     <div class="date-title">
                        <h5 class="card-title">${post.title}</h5>
                        <div>
                        <span style="color: grey; font-weight:300;">${getTimeDifference(post.createdAt)}</span>
                   
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
      console.log("DSFSDF:", ('#posts-box'));
        $('#posts-box').append(renderPost);
     
      }
     

    })
}



