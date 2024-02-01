async function signUp() {
  const newUser = {
    email: document.getElementById("email").value,
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  };
  if (document.getElementById("confirm-password").value === newUser.password) {
    fetch("https://localhost:8080/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    body:JSON.stringify(newUser)
    });
  } else {
    alert('Please ensure your passwords match')
    }
    console.log(newUser)
    console.log(newUser.password)
    console.log(document.getElementById("confirm-password").value)
}
