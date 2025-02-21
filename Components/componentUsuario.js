const perfilUsuario = ({username, name, email, password, phone}) => {
    let nomeFormatado = name.firstname + " " + name.lastname;
    return `<form name="dadosUsuario">
    <fieldset>
        <legend>Dados Pessoais</legend>
            <div class="container">
                <label for="usuario">Usuario: </label>
                <input type="text" id="inputUsuario" name="usuario" value=${username}>
            </div>

            <div class="container">
                <label for="nome">Nome: </label>
                <input type="text" id="nome" name="nome" value="${nomeFormatado}" disabled>
            </div>

            <div class="container">
                <label for="email">Email: </label>
                <input type="email" id="email" name="email" value=${email} disabled>
            </div>

            <div class="container">
                <label for="senha">Senha: </label>
                <input type="password" id="senha" name="senha" value=${password}>
            </div>

            <div class="container">
                <label for="telefone">Telefone: </label>
                <input type="tel" name="telefone" id="telefone" value=${phone}>
            </div>

            <div class="envioInput">
                <button type="submit">Atualizar Dados</button>
            </div>
        </fieldset>
    </form>`;
}

export default perfilUsuario;