const distanciaFrete = [{
    AC:	2.870,
    AL:	2.860,
    AP:	3.060,
    AM:	3.600,
    BA:	2.150,
    CE:	3.050,
    DF:	1.130,
    ES:	1.470,
    GO:	935,
    MA:	2.730,
    MG:	1.320,
    PA:	2.710,
    PB:	2.950,
    PR:	980,
    PE:	3.000,
    PI:	2.650,
    RJ:	1.340,
    RN:	3.140,
    RS:	1.430,
    RO:	2.050,
    RR:	3.890,
    SC:	1.170,
    SP:	1.010,
    SE:	2.720,
    TO:	1.530,
}]

// const idProduto = searchParams.get('idProduto')
let rua = document.getElementById('rua')
let numero = document.getElementById('numero')
let bairro = document.getElementById('bairro')
let cidade = document.getElementById('cidade')
let estado = document.getElementById('estado')

estado.addEventListener("jsupdate", function() {
    calculaFrete(this.value);
});


function produtoSelecionado(idProduto){
    fetch(`https://fakestoreapi.com/products/${idProduto}`)
                .then(res=>res.json())
                .then(json=>console.log(json))

}


function feedCarrossel(categoriaProduto){
    fetch(`https://fakestoreapi.com/products/category/${categoriaProduto}`)
            .then(res=>res.json())
            .then(json=>console.log(json))
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
                    document.getElementById('cep').value = ""
                    alert("CEP não encontrado.");
                }
            })
            .catch(error => {
                limpaForm();
                console.error("Erro na consulta do CEP:", error);
            });
    } else {
        limpaForm();
    }
}


function calculaFrete(estadoDestino){
    console.log(estadoDestino, 'Funciona')
}