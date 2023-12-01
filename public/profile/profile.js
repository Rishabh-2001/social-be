console.log("Profile page:");

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