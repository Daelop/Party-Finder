let User = {}
let AuthComplete = false
let loggedIn = false
function checkAuth(){
    fetch("http://localhost:8080/auth/discord/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        
      },
      credentials : "include",
    }).then((response) => response.json())
    .then((data) => {
        User = data
        if (User.id) {
            console.log("User is logged in")
            loggedIn = true
            document.getElementById("login").innerHTML = "Profile"
            
            fetch('http://localhost:8080/users',{
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({id: User.id, username: User.username}),
            }).then((response) => response.json())
            .then((data) => {
              document.getElementById("login").setAttribute("href", `http://localhost:5500/profile.html?id=${data._id}`)
              document.getElementById("Sign-out").hidden = false
            }
            )
        } else {
            
            console.log("User is not logged in")
        }
       
    })
}
function logout(){
  document.cookie="token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
async function loginPrompt(){
 setTimeout(function(){
    if(loggedIn==false){
        window.location.href = "http://localhost:5500/log-in.html"
    }
  }, 500);
}
window.addEventListener("load", () => {
  document.querySelector("#Sign-out").addEventListener("click", e => {
      logout()
      e.preventDefault();
      window.location = e.target.href;
  });
});
document.getElementById("Sign-out").hidden = true
checkAuth()