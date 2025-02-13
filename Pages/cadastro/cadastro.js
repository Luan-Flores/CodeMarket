document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cadastro");

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

            const data = await response.json();
            console.log(data);
            alert("Cadastro realizado com sucesso!");
            window.location.href = "../login/login.html"; // Redireciona para login
        } catch (error) {
            console.error("Erro ao cadastrar usuário:", error);
            alert("Erro ao cadastrar usuário. Tente novamente.");
        }
    });
        
    // Redireciona para a página de login ao clicar no botão de login
    document.getElementById('loginBtn').addEventListener('click', function() {
        window.location.href = '../login/login.html'; // Redireciona para a página de login
    });
    
});

