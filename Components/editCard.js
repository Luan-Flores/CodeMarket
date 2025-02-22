
function teste(){
    console.log("teste");
}
const editCard = (element) => {
    return `
        <div class="produto">
            <div class="infoProduto">
                <a class="info-a" id=${element.id}>
                    <div class="divImgProd">
                        <img class="imgProduto" src="${element.image}">
                    </div>
                        
                    <div class="desc">
                        <div class="card3">
                            <p class="nomeProduto" id="nomeProduto">${element.title}</p>
                        </div>
                        <div class="card4">
                            <p class="precoProduto">R$ ${element.price}</p>
                        </div>
                    </div>
                </a>
            </div>
            <div class="ctaCardProduto">
                <div href="" class="main-box" id=${element.id}>
                    <img src="../../Icons/LAPIS.png" alt="img" width="34px" height="34px">
                    <button class="editar-btn">Editar</button>
                </div>
                <a class="del-box" id="remover">
                    <img src="../../Icons/lixo.png" alt="" width="34px" height="34px">
                    <button class="remover-btn">Remover</button>
                </a>
            </div>
        </div>
    `;
};
export default editCard;  // 🔹 Certifique-se de que está exportando como default
