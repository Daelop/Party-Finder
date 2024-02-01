

async function eventCreate(){
    console.log(document.getElementById("name").value);
    console.log(document.getElementById("description").value)
    
    const event = JSON.stringify({
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        open: document.getElementById("open").value == true,
        loc: document.getElementById("loc").value,
        game: document.getElementById("game").value,
        time: document.getElementById("time").value,
        date:document.getElementById("date").value,
        displaySettings: {
            backgroundColor:document.getElementById("bgColour").value,
            textColor: document.getElementById('textColour1').value,
            textColor2: document.getElementById('textColour2').value
        }
    })
    console.log(event)

    await fetch('https://localhost:8080/events',{
        method: "POST",
        headers: {
            "Content-Type":"application/json"
        },
        body: event
    })
    .then((response)=>response.json())
    .then((json)=>console.log(json))
}

function nextCreate(){
    document.getElementById('part-2').hidden = false;
    document.getElementById('part-1').hidden = true;
}

