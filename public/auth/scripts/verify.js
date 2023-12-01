$(document).ready(function() {
    //Then assigns the event handler
   
// const signupel=document.getElementById('form-signup')

//  signupel.addEventListener("submit",(e)=>{
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     console.log("DATA:",formData.get('fname'));
//     if(formData.get('password')!==formData.get('password-confirm'))
//     {
//         showError("passwords done match")
//     }
//     else{
//         document.querySelector('.error-alert').style.display='none';
//         const signupData={
//             firstName: formData.get('fname'),
//             lastName: formData.get('lname'),
//             email: formData.get('email'),
//             password: formData.get('password')
//         }
//         $.post('/api/auth/register',signupData, function(data) {
//             console.log("DATA POSTED");
//     }).done(res=>{
//         console.log("coming in .done SUCCESS",res);  
//         console.log("Redirecting");
//         console.log("WINDOW",window.location);
//         window.location.assign("http://localhost:3434/api/auth/login");
//     })
//     .fail(err=>{
//         console.log("ERROR:",err.responseJSON.error);
        
//         showError(err.responseJSON.error)
//     })
        
//     }

//     function showError(msg)
//     {
//         console.log("coming in eror sec");
//         document.querySelector('.error-alert').textContent=msg;
//         document.querySelector('.error-alert').style.display='block';
//     }
   
    
   

//  })
let queryString = window.location.search;
var searchParams = new URLSearchParams(queryString);
let email = searchParams.get("q");
sendOTP();

async function sendOTP()
{
    const data={
        email:email
    }
        // make api to verify
        $.ajax({
            url:'/api/auth/resendOTP',
            type:'POST',
            data: JSON.stringify(data),
            success: function (response){
           
          console.log("Verified sucess");
          window.location.assign('./login')
    
        
        
           },
            error: function(error) {
              // Handle the error response from the server
              console.error(error);

            }
          })

}




const verifyBtn=document.getElementById('verify-btn');
verifyBtn.addEventListener('click',(e)=>{
    console.log("Cl");
   
    const optEntered=$('#otp-inp').val();
    console.log("Entered otp is :", optEntered);

    console.log("Email:::",email);
    const data={
        email:email,
        otp:optEntered
    }



    // make api to verify
    $.ajax({
        url:'/api/auth/verify',
        type:'POST',
        data: JSON.stringify(data),
        success: function (response){
       
      console.log("Verified sucess");
      window.location.assign('http://localhost:3434/api/auth/login')

    
    
       },
        error: function(error) {
          // Handle the error response from the server
          console.log('ERROR in verifying the otp:', error.responseJSON.error);
          console.error(error);
          showError(error.responseJSON.error)
        }
      })

      
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




});
function validate(input){
    if(/^\s/.test(input.value))
      input.value = '';
  }
