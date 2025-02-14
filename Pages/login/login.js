document.addEventListener("DOMContentLoaded", () => {
document.getElementById("cadastroBtn").addEventListener("click", function() {
        window.location.href = "../cadastro/cadastro.html"; });
    
    
    loginBtn.addEventListener("click", async (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if (!username || !password) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            console.log("🔄 Enviando login...");

            const response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                throw new Error(`Erro HTTP! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("✅ Resposta da API (login):", data);

            if (data.token) {
                sessionStorage.setItem("user", username);
                sessionStorage.setItem("token", data.token);

                console.log("🔄 Buscando usuário...");

                // Obtendo a lista de usuários para encontrar o ID do usuário logado
                const usersResponse = await fetch("https://fakestoreapi.com/users");
                if (!usersResponse.ok) {
                    throw new Error(`Erro HTTP ao buscar usuários! Status: ${usersResponse.status}`);
                }

                const users = await usersResponse.json();
                console.log("✅ Lista de usuários:", users);

                const user = users.find(user => user.username === username);
                if (user) {
                    sessionStorage.setItem("userId", user.id);
                    console.log("✅ Usuário encontrado. Redirecionando...");
                    window.location.href = "../home/home.html";
                } else {
                    alert("Usuário não encontrado.");
                }
            } else {
                alert("Erro no login ou senha.");
            }
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            alert("Erro ao conectar com o servidor. Verifique sua conexão.");
        }
    });
});
