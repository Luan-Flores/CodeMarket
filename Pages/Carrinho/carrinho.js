import paginaProduto from '../../Components/produtoCard.js';
import header from '../../Components/headerComp.js';

const distanciaFrete = {
    AC:	2870,
    AL:	2860,
    AP:	3060,
    AM:	3600,
    BA:	2150,
    CE:	3050,
    DF:	1130,
    ES:	1470,
    GO:	935,
    MA:	2730,
    MG:	1320,
    PA:	2710,
    PB:	2950,
    PR:	980,
    PE:	3000,
    PI:	2650,
    RJ:	1340,
    RN:	3140,
    RS:	1430,
    RO:	2050,
    RR:	3890,
    SC:	1170,
    SP:	1010,
    SE:	2720,
    TO:	1530,
};

const urlParams = new URLSearchParams(window.location.search)
const idProduto = parseInt(urlParams.get('id'))

let cep = document.getElementById('cep')
let rua = document.getElementById('rua')
let numero = document.getElementById('numero')
let bairro = document.getElementById('bairro')
let cidade = document.getElementById('cidade')
let estado = document.getElementById('estado')

let imgProduto = document.getElementById("productImage");
let nomeProduto = document.getElementById('productName');
let precoProduto = document.getElementById('productPrice');
let carrossel = document.getElementById("carousel");

let valorProduto = document.getElementById("valorProduto")
let frete = document.getElementById("frete")
let total = document.getElementById("valorTotal")

let botao = document.getElementById("completePurchase")

estado.addEventListener("jsupdate", function() {
    calculaFrete(this.value);
});

estado.addEventListener("blur", function() {
    calculaFrete(this.value);
});

document.addEventListener('DOMContentLoaded', () => {
    const headerElement = document.querySelector('header');
    headerElement.innerHTML = header();
    produtoSelecionado()
});

cep.addEventListener('blur', function() {
    preencheEndereco(this.value);
});

botao.addEventListener('click', () => {
    window.location.href = `FCSemID/index.html?acao=FC`;
});


function produtoSelecionado(){
    fetch(`https://fakestoreapi.com/products/${idProduto}`)
        .then(res=>res.json())
        .then(data => {
            if(!data.erro){
                imgProduto.src = data.image;
                nomeProduto.innerHTML = data.title;
                precoProduto.innerHTML = "R$ " + data.price;
                valorProduto.innerHTML = "R$ " + data.price;
                feedCarrossel(data.category);
            } 
        })

}


function feedCarrossel(categoriaProduto){
    fetch(`https://fakestoreapi.com/products/category/${categoriaProduto}?limit=4`)
        .then(res=>res.json())
        .then(data => {
            carrossel.innerHTML = "";
            const semIdRepetido = data.filter(data => data.id !== idProduto)
            semIdRepetido.forEach(semIdRepetido => {
                carrossel.innerHTML += paginaProduto(semIdRepetido);
            });
        })
        .catch(error => console.error("Erro ao carregar produtos do carrossel:", error));
}


function limpaForm(){
    rua.value= "";
    numero.value= "";
    bairro.value= "";
    cidade.value= "";
    estado.value= "";
}


function preencheEndereco(cep) {
    if (cep !== "") {
        rua.value = "Carregando...";
        bairro.value = "Carregando...";
        cidade.value = "Carregando...";
        estado.value = "Carregando...";

        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    rua.value = data.logradouro;
                    bairro.value = data.bairro;
                    cidade.value = data.localidade;
                    estado.value = data.uf;
                    estado.dispatchEvent(new Event("jsupdate"))
                } else {
                    limpaForm();
                    cep.value = ""
                    alert("CEP não encontrado.");
                }
            })
            .catch(error => {
                limpaForm();
                console.error("Erro na consulta do CEP:", error);
            });
    } else if (cep == "" && estado == "") {
        limpaForm();
    }
}


function calculaFrete(estadoDestino){
    let condicao = estadoDestino in distanciaFrete
    if(condicao){
        if(estadoDestino !== "MS" || estadoDestino !== "ms"){
            fetch(`https://fakestoreapi.com/products/${idProduto}`)
            .then(res=>res.json())
            .then(data => {
                if(!data.erro){
                    valorProduto = data.price;
                } 
                let estadoMaiusculo = estadoDestino.toUpperCase();
                let distancia = distanciaFrete[estadoMaiusculo];
                let valorProduto1 = parseInt(valorProduto)
        
                let valorFrete = distancia * 0.05
                let total1 = valorFrete + valorProduto1
        
                frete.innerHTML = "R$ " + valorFrete
                total.innerHTML = "R$ " + total1
            })
        }
    }else if(condicao !== null || condicao !== "" && condicao == false){
        alert("UF escrito errado ou não existe.");

    }
}