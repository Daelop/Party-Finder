export function auth(){
    let SID=document.cookie;
    fetch('/sessions',{
        method:"POST",
        body:JSON.stringify({
            sessionID:SID
        })
    })
}