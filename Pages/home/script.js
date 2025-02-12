import produtoCard from '../../Components/produtoCard.js';

let secProduto = document.getElementById("secProduto");

// CATEGORIAS ENDPOINTS: electronics, jewelery, men's clothing, women's clothing
// ENDPOINT PARA RETORNAR TUDO: products/
//ENDPOINT PARA RETORNAR CATEGORIA ESPECIFICA: products/category/NOMECATEGORI
let endpoint;

function carregarProdutos(endpoint) {
    fetch(`https://fakestoreapi.com/${endpoint}`)
    .then(res => res.json())
    .then(json => {
        json.forEach(element => {
            secProduto.innerHTML += produtoCard(element);
        });
    });
}

const pegarValor = () => {
    const filtroProdutos = document.getElementById('filtroProdutos');
    const valorFiltro = filtroProdutos.value;
    secProduto.innerHTML = ''
    if (valorFiltro === '0'){
        carregarProdutos(`products/`)    
    }
    carregarProdutos(`products/category/${valorFiltro}`)
}

carregarProdutos("products/")