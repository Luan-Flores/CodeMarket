import paginaProduto from '../../Components/pagProduto.js';

import header from '../../Components/headerComp.js';

let boxProduto = document.getElementById("boxProduto")

function obterParametrosURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const parametros = {};

    for (const [chave, valor] of urlParams.entries()) {
        parametros[chave] = valor;
    }

    return parametros;
}

const parametros = obterParametrosURL();

async function carregarProduto() {
    try {
        const response = await fetch(`https://fakestoreapi.com/products/${parametros.id}`);

        const produto = await response.json();

        boxProduto.innerHTML = paginaProduto(produto);

        const botao = document.createElement('button');
        botao.id = 'btnCarrinho';
        botao.innerHTML = 'Comprar';
        boxProduto.appendChild(botao);

        botao.addEventListener('click', () => {
            window.location.href = `../Carrinho/carrinho.html?id=${parametros.id}`;
        });

    } catch (error) {
        alert("Erro ao carregar produto:", error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const headerElement = document.querySelector('header');
    headerElement.innerHTML = header();
});

carregarProduto();
