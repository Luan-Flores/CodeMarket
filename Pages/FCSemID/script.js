import header from '../../Components/headerComp.js';

const urlParams = new URLSearchParams(window.location.search)
const acao = urlParams.get('acao')
let imgAcao = document.getElementById("imgAcao");
let tituloAcao = document.getElementById("tituloAcao");
let msgAcao = document.getElementById("msgAcao");
let btnAcao = document.getElementById("btnAcao");

document.addEventListener('DOMContentLoaded', () => {
    const headerElement = document.querySelector('header');
    headerElement.innerHTML = header();
    mudaTela(acao)
});

function mudaTela(acao){
    if(acao == "FC"){
        imgAcao.src = "../../../Icons/CaminhaEntrega.png"
        tituloAcao.innerHTML = "🎉Compra Finalizada com Sucesso!🎉\nObrigado por sua compra!🛍️"
        msgAcao.innerHTML = "Estamos preparando seu pedido com muito carinho e ele será enviado em breve."
        btnAcao.innerHTML = "Continuar comprando"

        btnAcao.addEventListener('click', () => {
            window.location.href = `../home/home.html`;
        });
    }else if(acao == "SI"){
        imgAcao.src = "../../../Icons/CarrinhoVazio.png"
        tituloAcao.innerHTML = "🛒 Seu Carrinho Está Vazio! 🛒"
        msgAcao.innerHTML = "Parece que você ainda não adicionou nenhum produto ao seu carrinho. 😕<br/>Que tal dar uma olhada em nossos produtos? Temos muitas opções incríveis esperando por você! ✨"
        btnAcao.innerHTML = "Ir as compras!"

        btnAcao.addEventListener('click', () => {
            window.location.href = `../home/home.html`;
        });
    }
}