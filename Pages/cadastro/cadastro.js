document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("cadastro");
    const btnCadastrar = document.querySelector(".btn");

 

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const userData = {
            email: email,
            username: username,
            password: password,
        };

        try {
            const response = await fetch("https://fakestoreapi.com/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                throw new Error("Erro ao cadastrar usuário.");
            }

            const data = await response.json();
            console.log(data);
            alert("Cadastro realizado com sucesso!");
            window.location.href = "../login/login.html";
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário. Tente novamente.");
        }
    });


    document.getElementById("loginBtn").addEventListener("click", function () {
        window.location.href = "../login/login.html"; // Redireciona para a página de login
    });
});
