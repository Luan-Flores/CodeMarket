document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.querySelector(".btn");
    const cadastroBtn = document.getElementById("cadastroBtn");

    loginBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const username = document.querySelector(".input input[type='text']").value;
        const password = document.querySelector(".input input[type='password']").value;

        if (!username || !password) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (data.token) {
                sessionStorage.setItem("user", username);

                // Obtendo o ID do usuário com base no nome de usuário
                const usersResponse = await fetch("https://fakestoreapi.com/users");
                const users = await usersResponse.json();

                const user = users.find(user => user.username === username);
                if (user) {
                    sessionStorage.setItem("userId", user.id);
                    window.location.href = "home.html"; // Redireciona para a página Home
                } else {
                    alert("Usuário não encontrado.");
                }
            } else {
                alert("Erro no login ou senha.");
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            alert("Erro ao conectar com o servidor.");
        }
    });

    // Redireciona para a página de cadastro ao clicar no botão de cadastro
    cadastroBtn.addEventListener("click", () => {
        window.location.href = "../cadastro/cadastro.html";
    });
});
