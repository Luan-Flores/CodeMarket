const username = document.getElementById("username")
const password = document.getElementById("password")


if()
fetch('https://fakestoreapi.com/auth/login',{
            method:'POST',
            body:JSON.stringify({
                username: username,
                password: password,
            })
        })
            .then(res=>res.json())
            .then(json=>console.log(json))

