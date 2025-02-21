import perfilUsuario from "./componentUsuario.js";

const userId = sessionStorage.getItem("userId");

fetch(`https://fakestoreapi.com/users/${userId}`)
.then(res=>res.json())
.then(json => {
    document.getElementById("usuario").innerHTML += perfilUsuario(json);
})

    document.addEventListener("submit", (event) => {
        event.preventDefault()
        if(!event.target == dadosUsuario){
            return;
        }

    /* Parâmetros que vão ser usados para preencher o componente*/
    const json = {
        username: dadosUsuario.usuario.value,
        name:{
            firstname: dadosUsuario.nome.value,
            lastname: dadosUsuario.nome.value
        },
        email: dadosUsuario.email.value,
        password: dadosUsuario.senha.value,
        phone: dadosUsuario.telefone.value
    }

    fetch(`https://fakestoreapi.com/users/${userId}`,{
        method:"PATCH",
        body:JSON.stringify(json)
    })
    .then(res=>res.json())
    .then(json=>console.log(json))
        alert("Dados alterados com sucesso!");
        
    console.log(json)
}) 