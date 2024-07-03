//let titulo = document.querySelector('h1'); //criando variavél para guardar a selecao do h1
//titulo.innerHTML = "Jogo do número secreto";

//let paragrafo = document.querySelector('p'); //criando variavel para o elemento do campo do paragrafo
//paragrafo.innerHTML = "Esolha um número entre 1 e 10";

//boolean é tipo "verdadeiro ou falso"(true or false)
//string é tipo texto("blablabla")
//number é tipo número(1263...0,2...)

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();  //usando a função
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {//vai exibir a tag e o texto inserido nela
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );

}


function exibirMensagemInicial() {
    exibirTextoNaTela('h1', "Jogo do número secreto"); //executa o texto na tela do h1
    exibirTextoNaTela('p', "Escolha um número entre 1 e 10"); //executa o texto na tela do parágrafo 
    
}
exibirMensagemInicial();

//precisa ser exatamente igual ao que está no html
//nomes de variaveis e funçoes precisam ser claros 
function verificarChute(){
    let chute = document.querySelector('input').value;

    if ( chute == numeroSecreto){
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`;

        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');

    } else {
        if(chute  > numeroSecreto){
            exibirTextoNaTela('p', 'O número secreto é menor!');
        }else {
            exibirTextoNaTela('p', 'O número secreto é maior!');
        }
        tentativas++;
        limparCampo();
    }   // console.log(chute == numeroSecreto);

} 

function gerarNumeroAleatorio() { //cria a função
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);     
    //parseInt permite que seja selecionado somente números inteiros e o 10 + 1 é porque a contagem de número começa no 0.
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }

    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido); // o push funciona pegando o parâmetro que está sendo enviado entre parênteses e colocando ao final da lista
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
    
    
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
    
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    
}
