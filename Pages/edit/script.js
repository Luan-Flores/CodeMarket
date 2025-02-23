import editCard from '../../Components/editCard.js';
let secProduto = document.getElementById("secProduto");
// CATEGORIAS ENDPOINTS: electronics, jewelery, men's clothing, women's clothing
// ENDPOINT PARA RETORNAR TUDO: products/
//ENDPOINT PARA RETORNAR CATEGORIA ESPECIFICA: products/category/NOMECATEGORI

// document.addEventListener('click', function(event) {
//     const card = event.target.closest('.main-box');
//     if (card) {
//         const titulo = card.querySelector('.nomeProduto');

//         console.log('ID do card clicado:', card.id);
        
//         fetch(`https://fakestoreapi.com/products/${card.id}`)
//         .then(res => res.json())
//         .then(json => {
//             console.log('json aqdentro ' + json);

//             if (titulo) {
//                 titulo.contentEditable = true;
//                 titulo.focus();
//             }
//         });
//         }
// });


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


    
    
    fetch(`https://fakestoreapi.com/products`).then(res => res.json()).then(json => console.log(json) );
    
    
    document.addEventListener('mouseenter', function(event) {
        const card = event.target.closest('.produto');
        if (card && !card.classList.contains('editing')) { // Verifica se não está editando
            console.log('Hover no card:', card);
            card.classList.add('blur');
        }
    }, true);
    
    document.addEventListener('mouseleave', function(event) {
        const card = event.target.closest('.produto');
        if (card && !card.classList.contains('editing')) { // Só remove o blur se não estiver editando
            card.classList.remove('blur');
        }
    }, true);
    
    document.addEventListener('click', function(event) {
        const card = event.target.closest('.produto');
        const edit = event.target.closest('.main-box');
    
        if (card && edit) {
            const titulo = card.querySelector('.nomeProduto');
            const editarBtn = edit.querySelector('.editar-btn');
            const preco = card.querySelector('.precoProduto');
            const img = card.querySelector('.imgProduto');
    
            if (editarBtn && event.target === editarBtn) {
                console.log("Amém");
                card.classList.remove('blur');
                card.classList.add('editing'); // Impede o blur ao sair do card
                titulo.contentEditable = true;
                preco.contentEditable = true;
                img.contentEditable = true;
                titulo.focus();
                preco.focus();
                img.focus();
            }
        }
    });
    
    // Para remover o modo de edição quando o usuário der Enter ou clicar fora
    document.addEventListener('keydown', function(event) {
        if (event.key === "Enter") {
            const editingCard = document.querySelector('.produto.editing');
            if (editingCard) {
                const titulo = editingCard.querySelector('.nomeProduto');
                titulo.contentEditable = false;
                editingCard.classList.remove('editing'); // Permite o hover voltar ao normal
            }
        }
    });
    
    document.addEventListener('click', function(event) {
        const editingCard = document.querySelector('.produto.editing');
        if (editingCard && !editingCard.contains(event.target)) {
            const titulo = editingCard.querySelector('.nomeProduto');
            const preco = editingCard.querySelector('.precoProduto');
            const img = editingCard.querySelector('.imgProduto');
            titulo.contentEditable = false;
            preco.contentEditable = false;
            img.contentEditable = false;
            editingCard.classList.remove('editing');
        }
    });
    
    
carregarProdutos("products/");