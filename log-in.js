function login(){
    const user = document.getElementById('username').value
    const pass = document.getElementById('password').value
    fetch('https://localhost:8080/users/login',{
        "method":"POST",
        "credentials":"include",
        "headers":{
            "content-type":"application/json"
        },
        "body":JSON.stringify({
          user:user,
          pass:pass
        })
    })  
    .then((response)=>{
        console.log(response)
        return response
    })
    .then((response)=>{
        if (response.status === 401){
            
            alert('Invalid credentials')
        }else if(response.status === 200){
       window.location.href = 'index.html'
        }
        
    })
    
}
