import paginaProduto from '../../Components/pagProduto.js';
import header from '../../Components/headerComp.js';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('header').innerHTML = header();
    carregarProduto();
});

let boxProduto = document.getElementById("boxProduto");

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
        
        const botaoCarrinho = document.createElement('button');
        botaoCarrinho.id = 'btnCarrinho';
        botaoCarrinho.innerHTML = 'Comprar';
        boxProduto.appendChild(botaoCarrinho);

        botaoCarrinho.addEventListener('click', () => {
            window.location.href = `../Carrinho/carrinho.html?id=${parametros.id}`;
        });

        const estrelaFavorito = document.createElement('span');
        estrelaFavorito.id = 'favoritoIcon';
        estrelaFavorito.classList.add('favorito-icon');
        atualizarIconeFavorito(estrelaFavorito, produto.id);
        boxProduto.appendChild(estrelaFavorito);

        estrelaFavorito.addEventListener('click', () => {
            toggleFavorito(produto.id, estrelaFavorito);
        });
    } catch (error) {
        alert("Erro ao carregar produto: " + error);
    }
}

function atualizarIconeFavorito(elemento, id) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    if (favoritos.includes(id)) {
        elemento.innerHTML = '★'; 
        elemento.classList.add('favorito-ativo');
    } else {
        elemento.innerHTML = '☆'; 
        elemento.classList.remove('favorito-ativo');
    }
}

function toggleFavorito(id, elemento) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favoritos.includes(id)) {
        favoritos = favoritos.filter(favId => favId !== id);
    } else {
        favoritos.push(id);
    }

    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    atualizarIconeFavorito(elemento, id);
}
