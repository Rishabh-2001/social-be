$(document).ready(function() {

console.log("Hello world from login.js");
    const loginEl=document.getElementById('login-form');
     loginEl.addEventListener("submit",(e)=>{
        e.preventDefault();
    
            const formData = new FormData(e.target);
            // document.querySelector('.error-alert').style.display='none';
            const loginData={
                email: formData.get('email'),
                password: formData.get('password')
            }
      console.log("LD:",loginData);
            $.post('/api/auth/login',loginData, function(data) {
                console.log("DATA POSTED",data);
        }).done(res=>{
            console.log("coming in .done SUCCESS",res);

            const user={
                id: res.id,
                firstName:res.firstName,
                email:res.email
            }

            
            localStorage.setItem("currentUser",JSON.stringify(user));
            window.location.assign("http://localhost:3434/api/posts");
        })
        .fail(err=>{
            console.log("Coming in FAIL:",err.responseJSON.error);
            showError(err.responseJSON.error,loginData?.email )
        })
            
        
    
    
    
       
    
        function showError(msg,email)
        {
            
            document.querySelector('.error-alert').textContent=msg;
            document.querySelector('.error-alert').style.display='block';
            if(msg==="Verify Your Accoount")
            {
                window.location.assign(`http://localhost:3434/api/auth/verify/?q=${email}`);
            }
        }
     })
     
    }
    )
    
    function validate(input){
        if(/^\s/.test(input.value))
          input.value = '';
      }
    