
//for testing purposes. replace with get requests
const user = {
"username":"site username"
}
const eventInfo = {
    "name":"event-name",
    "date":"JSON Timestamp String",
    "listed":"JSON Timestamp String",
    "description":"event description",
    "admin":"admin user",
    "applicationSettings":{
        "requireIGN":true,
        "requireServer":true,
        "requireDiscord":true,
        "requireEmail":true,
        "requireTOS":true,
        "TOSBody":"do you agree to show up?",
        "discordConsent":true
    },
    "participantSettings":{
        "allowTitle":true,
        "requireTitle":true,
        "titleLabel":"Please title your entry",
        "allowDescription":true,
        "requireDescription":true,
        "descriptionLabel":"Please describe your entry",
        "descriptionLengthMax":200,
        "descriptionLengthMin":20,
        "allowImage":true,
        "requireImage":false,
        "imageLabel":"Please submit an image of your entry",
        "allowAdminContact":true
    },
    "displaySettings":{
        "backgroundColor":"white",
        "textColor":"black",
        "accentColor":"grey"
    }
}


function displayApplication(eventInfo){
    document.getElementById("eventTitle").innerHTML=`Application for ${eventInfo.name}`;
    const setting = eventInfo.applicationSettings;
    if (setting.requireEmail === false){
        document.getElementById("email").hidden = true;
        document.getElementById("emailLabel").hidden = true;
    }else{
        document.getElementById("email").required = true
    };

    if (setting.requireIGN === false){
        document.getElementById("pName").hidden=true;
        document.getElementById("ignLabel").hidden=true;
    }else{
        document.getElementById("pName").required = true
    };
    if (setting.requireServer === false){
        document.getElementById("server").hidden=true;
        document.getElementById("serverLabel").hidden=true;
    }else{
        document.getElementById("server").required = true
    };
    if (setting.discordConsent === false){
        document.getElementById("discordConsent").hidden=true;
        document.getElementById("consentLabel").hidden=true;
    }else{
        document.getElementById("discordConsent").required = true
    };
    if (setting.requireDiscord === false){
        document.getElementById("discord").hidden=true;
        document.getElementById("discordLabel").hidden=true;
    }else{
        document.getElementById("discord").required = true
    };
    if (setting.requireTOS === false){
        document.getElementById("TOS").hidden=true
    }else{
        document.getElementById("TOS").required = true
        document.getElementById("tosLabel").innerHTML= setting.TOSBody
    };

}
displayApplication(eventInfo);

//TODO write the fetch for event and user

const form = document.getElementById('application');

form.addEventListener('submit', async event => {
  event.preventDefault();

  const data = new FormData(form);

  console.log(Array.from(data));})
