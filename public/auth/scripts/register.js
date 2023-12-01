// const { redirect } = require("express/lib/response");

$(document).ready(function() {
    //Then assigns the event handler
   
const signupel=document.getElementById('form-signup')

 signupel.addEventListener("submit",(e)=>{
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("DATA:",formData.get('fname'));
    if(formData.get('password')!==formData.get('password-confirm'))
    {
        showError("passwords done match")
    }
    else{
        document.querySelector('.error-alert').style.display='none';
        const signupData={
            firstName: formData.get('fname'),
            lastName: formData.get('lname'),
            email: formData.get('email'),
            password: formData.get('password')
        }
        const email=formData.get('email')
        $.post('/api/auth/register',signupData, function(data) {
            console.log("DATA POSTED");
    }).done(res=>{
        console.log("coming in .done SUCCESS",res);  
        console.log("Redirecting");
   const url=`http://localhost:3434/api/auth/verify?q=${email}`;
   console.log("URLLLL:",url);
        window.location.assign(url);

    })
    .fail(err=>{
        console.log("ERROR:",err.responseJSON.error);
        
        showError(err.responseJSON.error,email)
    })
        
    }

    function showError(msg,email)
    {
        console.log("coming in eror sec");
        document.querySelector('.error-alert').textContent=msg;
        document.querySelector('.error-alert').style.display='block';
        if(msg==="Verify Your Accoount")
        {
            window.location.assign(`http://localhost:3434/api/auth/verify/?q=${email}`);
        }
    }
   
    
   

 })










});
function validate(input){
    if(/^\s/.test(input.value))
      input.value = '';
  }





