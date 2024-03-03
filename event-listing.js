// define variables for cloning the template
const listing = document.querySelector("#event-details");
let params = new URLSearchParams(window.location.search)
const eventID = params.get('id')
let appId = ''
let listedEvent= {}
// get events from api
async function getEvents() {
  fetch(`http://localhost:8080/events/${eventID}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => 
    {
        //defines background image with color overlay

        const color = `linear-gradient(${data.displaySettings.backgroundColor}60,${data.displaySettings.backgroundColor}60), url(${data.displaySettings.pic})`
        //creates data name 
        eventName = document.createElement("h2");
        eventName.className = "event-title"
        eventName.id = "event-title"
        eventName.style.background = color;
        eventName.style.border = `${data.displaySettings.backgroundColor} solid 0.5vw`
        eventName.style.color = data.displaySettings.textColor;
        eventName.style.webkitTextStrokeColor =
          data.displaySettings.textColor2;
        listing.appendChild(eventName).innerHTML = data.name;

        eventLocation = document.createElement('p')
        eventLocation.className = "event-location-p"
        listing.appendChild(eventLocation).innerHTML = 'Location: ' + data.loc

        eventGame = document.createElement('p')
        eventGame.className= "game-name-p"
        listing.appendChild(eventGame).innerHTML ='Game: ' + data.game;

        eventDate = document.createElement('p')
        eventDate.className="event-time-p"
        listing.appendChild(eventDate).innerHTML = 'Date: ' +`${data.time} ${data.date}`;

        eventDescription = document.createElement("p");
        eventDescription.className = "event-desc-p";
        listing.appendChild(eventDescription).innerHTML =
          data.description;
        console.log(listing)
        listedEvent = data
        })
        .then(() => {
          checkOwner()
        });
    
};

async function checkOwner(){
  console.log(listedEvent.creator)
 await fetch("http://localhost:8080/auth/discord/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.id == listedEvent.creator) {
        document.getElementById("edit").hidden = false;
        document.getElementById("apply").hidden = true;
      } else {
        console.log(data.id, listedEvent.creator)
        document.getElementById("edit").hidden = true;
        document.getElementById("apply").hidden = false;
      }
    });
}
function apply(){
  window.location.href = `application.html?id=${eventID}`
}
function edit(){
  window.location.href = `edit-event.html?id=${eventID}`
}

getEvents()