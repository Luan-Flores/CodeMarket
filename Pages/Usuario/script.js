const email = document.getElementById("email");
const username = document.getElementById("username");
const password = document.getElementById("password");
const firstname = document.getElementById("firstname");
const lastname = document.getElementById("lastname");

const nome = `${firstname} ${lastname}`;
// Dando o erro 404
    fetch('https://fakestoreapi.com/users/1',{
        method:"POST",
        body:JSON.stringify(
            {
                email: email,
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
                nome: nome,
            })
        })
        .then(res=>res.json())
        .then(json=>console.log(json))