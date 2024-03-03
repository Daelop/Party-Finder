// define variables for cloning the template
const listings = document.querySelector("#event-container");
let events;
// get events from api
async function getEvents() {
  fetch("http://localhost:8080/events", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      for (const event of data) {
        console.log(`url(${event.displaySettings.pic}),${event.displaySettings.backgroundColor}ff`)
        //Defines container and styling for event listing
        const color = `linear-gradient(${event.displaySettings.backgroundColor}60,${event.displaySettings.backgroundColor}60), url(${event.displaySettings.pic})`
        console.log(color)
        const eventListing = document.createElement("div");
        eventListing.style.backgroundColor =
          event.displaySettings.backgroundColor;
        eventListing.style.background = color;
        eventListing.style.color = event.displaySettings.textColor;
        eventListing.style.webkitTextStrokeColor =
          event.displaySettings.textColor2;
        eventListing.className = "event-listing";
        //creates event name
        eventName = document.createElement("a");
        eventName.className = "event-name";
        eventName.href = `event-listing.html?id=${event._id}`;
        eventListing.appendChild(eventName).innerHTML = event.name;
        eventLocation = document.createElement("p");
        eventLocation.className = "event-location";
        eventListing.appendChild(eventLocation).innerHTML = event.loc;
        eventGame = document.createElement("p");
        eventGame.className = "game-name";
        eventListing.appendChild(eventGame).innerHTML = event.game;
        eventDate = document.createElement("p");
        eventDate.className = "event-time";
        eventListing.appendChild(
          eventDate
        ).innerHTML = `${event.time} ${event.date}`;
        eventDescription = document.createElement("p");
        eventDescription.className = "event-desc";
        eventListing.appendChild(eventDescription).innerHTML =
          event.description;
        listings.appendChild(eventListing);
        console.log(eventListing);
      }
    });
}
getEvents();
