import editCard from '../../Components/editCard.js';
let secProduto = document.getElementById("secProduto");
// CATEGORIAS ENDPOINTS: electronics, jewelery, men's clothing, women's clothing
// ENDPOINT PARA RETORNAR TUDO: products/
//ENDPOINT PARA RETORNAR CATEGORIA ESPECIFICA: products/category/NOMECATEGORI
document.addEventListener('click', function(event) {
    const card = event.target.closest('.main-box');
    if (card) {
        console.log('ID do card clicado:', card.id);
        fetch(`https://fakestoreapi.com/products/${card.id}`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            console.log(json.id)
        });
        }
});


function carregarProdutos(endpoint) {
    fetch(`https://fakestoreapi.com/${endpoint}`)
    .then(res => res.json())
    .then(json => {
        json.forEach(element => {
            secProduto.innerHTML += editCard(element);
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

carregarProdutos("products/");

const cardProduct = document.getElementsByClassName('produto');
for (var i = 0; i < cardProduct.length; i++) {
    cardProduct[i].addEventListener('hover', branco = () => {
    console.log("menina");
})}


fetch(`https://fakestoreapi.com/products`).then(res => res.json()).then(json => console.log(json) );