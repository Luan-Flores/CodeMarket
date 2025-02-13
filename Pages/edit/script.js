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
            // falta linkar o card para cada produto especifico (facin)
            const cardProduto = document.createElement('div');
            const cardDois = document.createElement('div');
            const card3 = document.createElement('div');
            const card4 = document.createElement('div');
            cardProduto.classList.add('produto');
            cardDois.classList.add('desc');
            card3.classList.add('card3');
            card4.classList.add('card4');
            cardProduto.innerHTML = `
                <div class="divImgProd">
                    <img id="imgProduto" src="${element.image}">
                </div>
                
            `;
            card3.innerHTML = `<p id="nomeProduto">${element.title}</p>`;
            card4.innerHTML = `<p id="precoProduto">R$ ${element.price}</p>`;
            cardDois.appendChild(card3);
            cardDois.appendChild(card4);
            secProduto.appendChild(cardProduto);
            cardProduto.appendChild(cardDois);
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

