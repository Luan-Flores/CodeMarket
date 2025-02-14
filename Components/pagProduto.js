const paginaProduto = (produto) => {

    return `
            <div class="imgProduto"><img src="${produto.image}" alt="Imagem Produto"></div>
            <div class="nomeProduto">${produto.title}</div>
            <div class="descProduto">${produto.description}</div>
            <div class="priceProd">${produto.price}</div>
    `;
};

export default paginaProduto;