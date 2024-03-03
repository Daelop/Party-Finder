


async function getProfile(){
let params = new URLSearchParams(window.location.search);
const userId = params.get("id");
await fetch(`http://localhost:8080/users/${userId}`, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    const dateRaw = data.createdAt
    const since = new Date(dateRaw)
    const dateString = since.toDateString()
    const profile = document.querySelector("#user-container");
    const userName = document.createElement("h1");
    userName.className = "user-name";
    profile.appendChild(userName).innerHTML = data.username;
    const userSince = document.createElement('p')
    userSince.className = 'user-created'
    profile.appendChild(userSince).innerHTML = `User since: ${dateString}`
    const userPic = document.createElement("img");
    userPic.className = "user-pic";
    userPic.src = data.pic;
    profile.appendChild(userPic);
    const userBio = document.createElement("p");
    userBio.className = "user-bio";
    profile.appendChild(userBio).innerHTML = data.bio;
    listedProfile = data
  }).then(()=>{
    checkOwner()
  });}
  getProfile()
  
  async function checkOwner(){
    console.log(listedProfile.discordId)
   await fetch("http://localhost:8080/auth/discord/user", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id == listedProfile.discordId) {
          document.getElementById("edit").hidden = false;
        } else {
          console.log(data.id, listedEvent.creator)
          document.getElementById("edit").hidden = true;
        }
      });
  }
