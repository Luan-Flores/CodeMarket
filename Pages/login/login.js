document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("cadastroBtn").addEventListener("click", () => {
        window.location.href = "../cadastro/cadastro.html";
    });

    document.getElementById("loginBtn").addEventListener("click", async (e) => {
        e.preventDefault();
        
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        if (!username || !password) return alert("Preencha todos os campos!");

        try {
            const response = await fetch("https://fakestoreapi.com/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) throw new Error(`Erro HTTP! Status: ${response.status}`);
            
            const { token } = await response.json();
            if (!token) return alert("Erro no login ou senha.");
            
            sessionStorage.setItem("user", username);
            sessionStorage.setItem("token", token);
            
            const users = await (await fetch("https://fakestoreapi.com/users")).json();
            const user = users.find(u => u.username === username);
            
            if (user) {
                sessionStorage.setItem("userId", user.id);
                window.location.href = "../home/home.html";
            } else alert("Usuário não encontrado.");
        } catch (error) {
            console.error("Erro ao conectar com o servidor:", error);
            alert("Usuário não encontrado.");
        }
    });
});
