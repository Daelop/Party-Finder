let params = new URLSearchParams(window.location.search)
const eventID = params.get('id')


async function validateOwner(){
    await fetch(`http://localhost:8080/auth/check/event/${eventID}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
    })
        .then((response) => response.json())
        .then((data) => {
        console.log(data)
        if (data.message !== 'You are the owner') {
           window.location.href = `http://localhost:5500/log-in.html`;
        }else{
            console.log('You are the owner')
        }
        });
}
async function eventDetails(){
    fetch(`http://localhost:8080/events/${eventID}`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
    })
        .then((response) => response.json())
        .then((data) => 
        {
            document.getElementById('name').value = data.name
            document.getElementById('game').value = data.game
            document.getElementById('loc').value = data.loc
            document.getElementById('date').value = data.date
            document.getElementById('time').value = data.time
            document.getElementById('description').value = data.description
            document.getElementById('bgColour').value = data.displaySettings.backgroundColor
            document.getElementById('textColour1').value = data.displaySettings.textColor
            document.getElementById('textColour2').value = data.displaySettings.textColor2
            document.getElementById('open').checked = data.applicationSettings.open
            document.getElementById('reqIGN').checked = data.applicationSettings.reqIGN
            document.getElementById('req-ser').checked = data.applicationSettings.reqSer
            document.getElementById('req-tos').checked = data.applicationSettings.reqTOS
            document.getElementById('tos').value = data.applicationSettings.tos
            document.getElementById('allow-title').checked = data.participantSettings.allowTitle
            document.getElementById('req-title').checked = data.participantSettings.reqTitle
            document.getElementById('title-label').value = data.participantSettings.titleLabel
            document.getElementById('allow-desc').checked = data.participantSettings.allowDesc
            document.getElementById('req-desc').checked = data.participantSettings.reqDesc
            document.getElementById('min-desc').value = data.participantSettings.descLength[0]
            document.getElementById('max-desc').value = data.participantSettings.descLength[1]
            document.getElementById('allow-image').checked = data.participantSettings.allowImage
            document.getElementById('req-img').checked = data.participantSettings.reqImg
            document.getElementById('img-label').value = data.participantSettings.imgLabel
            document.getElementById('allow-admin-contact').checked = data.participantSettings.allowAdminContact
        });
}
function hideAll(){
    let elements = document.getElementsByClassName("hide")
    for (let i = 0; i < elements.length; i++) {
        elements[i].hidden = true
    }
}

function detailsSettings(){
    hideAll();
    document.getElementById('event-details-settings').hidden = false;
}

function displaySettings(){
    hideAll();
    document.getElementById('displaySettings').hidden = false;
}

function applySettings(){
    hideAll();
    document.getElementById('application-settings').hidden = false;
}
function deleteEvent(){
    hideAll();
    document.getElementById('delete-event').hidden = false
}
function participantSettings(){
    hideAll();
    document.getElementById('participantSettings').hidden = false
}
function viewApplications(){
    hideAll();
    document.getElementById('applications').hidden = false
}
//potential security vulnerability needs extra validation
function confirmDelete(){ 
    fetch(`http://localhost:8080/events/${eventID}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
    })
        .then((response) => response.json())
        .then((data) => {
        console.log(data)
        window.location.href = `http://localhost:5500/index.html`;
        });
}
function submitChanges(){
    const name = document.getElementById('name').value
    const game = document.getElementById('game').value
    const loc = document.getElementById('loc').value
    const date = document.getElementById('date').value
    const time = document.getElementById('time').value
    const description = document.getElementById('description').value
   
    const displaySettings = {
        backgroundColor: document.getElementById('bgColour').value,
        textColor : document.getElementById('textColour1').value,
        textColor2 : document.getElementById('textColour2').value,
        pic:'./Images/event-default.png'
    }
        
    const applicationSettings = {
        open:document.getElementById('open').checked,
        reqIGN:document.getElementById('reqIGN').checked,
        reqSer:document.getElementById('req-ser').checked,
        reqTOS:document.getElementById('req-tos').checked,
        tos:document.getElementById('tos').value
    }
    const participantSettings = {
        allowTitle:document.getElementById('allow-title').checked,
        reqTitle:document.getElementById('req-title').checked,
        titleLabel:document.getElementById('title-label').value,
        allowDesc:document.getElementById('allow-desc').checked,
        reqDesc:document.getElementById('req-desc').checked,
        descLength:[document.getElementById('min-desc').value,document.getElementById('max-desc').value],
        allowImage:document.getElementById('allow-image').checked,
        reqImg:document.getElementById('req-img').checked,
        imgLabel:document.getElementById('img-label').value,
        allowAdminContact:document.getElementById('allow-admin-contact').checked
    }
    const data = {
        name: name,
        game: game,
        loc: loc,
        date: date,
        time: time,
        description: description,
        displaySettings: displaySettings,
        applicationSettings: applicationSettings,
        participantSettings: participantSettings
    }
    fetch (`http://localhost:8080/events/${eventID}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
        console.log(data)
        window.location.href = `http://localhost:5500/event-listing.html?id=${eventID}`;
        });
}

validateOwner()
eventDetails()