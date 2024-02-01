// define variables for cloning the template
const listing = document.querySelector("#event-details");
let params = new URLSearchParams(window.location.search)
const eventID = params.get('id')
// get events from api
async function getEvents() {
  fetch(`https://localhost:8080/events/${eventID}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => 
    {
      
        //Defines container and styling for data listing
        const eventListing = document.createElement("div");
        eventListing.style.backgroundColor = data.displaySettings.backgroundColor
        eventListing.style.color = data.displaySettings.textColor
        eventListing.style.webkitTextStrokeColor = data.displaySettings.textColor2
        eventListing.className = "event-listing";
        //creates data name 
        eventName = document.createElement("h2");
        eventName.className = "event-name"
        eventListing.appendChild(eventName).innerHTML = data.name;
        eventLocation = document.createElement('p')
        eventLocation.className = "event-location"
        eventListing.appendChild(eventLocation).innerHTML = data.loc
        eventGame = document.createElement('p')
        eventGame.className= "game-name"
        eventListing.appendChild(eventGame).innerHTML = data.game;
        eventDate = document.createElement('p')
        eventDate.className="event-time"
        eventListing.appendChild(eventDate).innerHTML = `${data.time} ${data.date}`;
        eventDescription = document.createElement("p");
        eventDescription.className = "event-desc";
        eventListing.appendChild(eventDescription).innerHTML =
          data.description;
        listing.appendChild(eventListing);
        console.log(eventListing)
        });
    
};
getEvents();

