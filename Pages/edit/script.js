import editCard from '../../Components/editCard.js';
let secProduto = document.getElementById("secProduto");
// CATEGORIAS ENDPOINTS: electronics, jewelery, men's clothing, women's clothing
// ENDPOINT PARA RETORNAR TUDO: products/
//ENDPOINT PARA RETORNAR CATEGORIA ESPECIFICA: products/category/NOMECATEGORI

function carregarProdutos(endpoint) {
    fetch(`https://fakestoreapi.com/${endpoint}`)
    .then(res => res.json())
    .then(json => {
        json.forEach(element => {
            armazenar("produtos", element); 
        });

        let listaProdutos = JSON.parse(localStorage.getItem("produtos")) || []; // Garante que seja um array válido
        secProduto.innerHTML = ""; // Evita renderizar duplicado na tela

        listaProdutos.forEach(produto => {
            secProduto.innerHTML += editCard(produto);
        });
    });
}

function armazenar(item, keyAndvalue) {
    let storedData = JSON.parse(localStorage.getItem(item)) || [];

    // Verifica se o produto já existe pelo ID
    const existe = storedData.some(produto => produto.id === keyAndvalue.id);

    if (!existe) {
        storedData.push(keyAndvalue);
        localStorage.setItem(item, JSON.stringify(storedData));
    }
}


function excluir(produto){
    
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
    document.addEventListener('click', function(event) {
        const card = event.target.closest('.produto'); // Pega o card do produto
        const del = event.target.closest('.del-box'); // Verifica se o clique foi na área de exclusão
        
        if (card && del) {
            const removerBtn = del.querySelector('.remover-btn');
            
            if (removerBtn && event.target === removerBtn) {
                let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
                const idProduto = card.querySelector('.info-a').id; 
    
                // Filtra a lista de produtos removendo o que tem o ID correspondente
                const novaLista = produtos.filter(produto => produto.id != idProduto);
    
                // Atualiza o localStorage com a nova lista
                localStorage.setItem("produtos", JSON.stringify(novaLista));
    
                // Remove o card da tela
                card.remove();
    
                alert("Produto excluído.");
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
    
    // function armazenar(id){
    //     if (carregarProdutos("products/")){
    //         localStorage.setItem('produtos', JSON.stringify(produtos));
            
            

    //     }
    // }
    // function removerDosFavoritos(id) {
    //     favoritos = favoritos.filter(favId => favId !== id);
    //     localStorage.setItem('favoritos', JSON.stringify(favoritos));
    //     carregarFavoritos();
    // }
    

    carregarProdutos("products/");
    