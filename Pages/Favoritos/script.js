import produtoCard from '../../Components/produtoCard.js';
import header from '../../Components/headerComp.js';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('header').innerHTML = header();

    const secFavoritos = document.getElementById('secFavoritos');
    const filtroFavoritos = document.getElementById('filtroFavoritos');
    const btnFiltrar = document.getElementById('filtrarFavoritos');

    if (!secFavoritos || !filtroFavoritos || !btnFiltrar) {
        console.error("Erro: Elementos não encontrados no DOM.");
        return;
    }

    carregarFavoritos();

    btnFiltrar.addEventListener('click', () => {
        const categoria = filtroFavoritos.value;
        carregarFavoritos(categoria);
    });
});

function carregarFavoritos(categoria = '0') {
    const secFavoritos = document.getElementById('secFavoritos');
    if (!secFavoritos) {
        console.error("Erro: secFavoritos não encontrado.");
        return;
    }

    secFavoritos.innerHTML = '';
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    if (favoritos.length === 0) {
        secFavoritos.innerHTML = '<p>Nenhum favorito adicionado.</p>';
        return;
    }

    let promises = favoritos.map(id =>
        fetch(`https://fakestoreapi.com/products/${id}`).then(res => res.json())
    );

    Promise.all(promises)
        .then(produtos => {
            secFavoritos.innerHTML = '';
            produtos.forEach(produto => {
                if (categoria === '0' || produto.category === categoria) {
                    let cardContainer = document.createElement('div');
                    cardContainer.classList.add('produto-card-container');
                    cardContainer.innerHTML = produtoCard(produto);

                    let btnRemover = document.createElement('button');
                    btnRemover.textContent = 'Remover dos Favoritos';
                    btnRemover.classList.add('btn-remover');
                    btnRemover.addEventListener('click', () => removerDosFavoritos(produto.id));

                    cardContainer.appendChild(btnRemover);
                    secFavoritos.appendChild(cardContainer);
                }
            });
        })
        .catch(error => console.error('Erro ao carregar favoritos:', error));
}

function removerDosFavoritos(id) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    favoritos = favoritos.filter(favId => favId !== id);
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
    carregarFavoritos();
}
