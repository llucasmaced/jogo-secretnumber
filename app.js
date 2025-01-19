let listaDeNumerosSecretosSorteados = []; //Cria array de números sorteados
let limiteMaximo = 4; //Para evitar redigitação foi criado essa variável para definir o limite máximo de números dos jogo
let numeroSecreto = gerarNumeroAleatorio(); //A variavel número secreto recebe o valor gerado na função gerarNumeroAleatorio
let tentativas = 1; //Para evitar repetição essa variavel define a quantidade de tentativas do cliente


function exibirTextoNaTela(tag, texto) { //Função com parametros, exige entrada de dados
let campo = document.querySelector(tag); //Está criando uma variável campo e atribuindo a ela o valor definido na tag(h1 ou p...etc)
campo.innerHTML = texto; //está definindo que o campo tem a capacidade de efetuar mudanças no html então o campo recebe a variavel texto e oq tiver em texto será exibido
if ('speechSynthesis' in window) {   //Esse código executa uma API que faz o speak do jogo
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.2; 
    window.speechSynthesis.speak(utterance); 
} else {
    console.log("Web Speech API não suportada neste navegador.");
}
}


function mensagemInicial() { //Essa função função executa uma mensagem inicial
exibirTextoNaTela('h1', 'Jogo do número secreto'); //Perceba que essa função exige entrada de parâmetros.
exibirTextoNaTela('p', `Escolha um número entre 1 e ${limiteMaximo}`);
}

mensagemInicial(); //Chamada da função anterior para executar a mensagem inicial

function verificarChute() { //Essa função está atribuida no html ao botão de chute
    let chute = document.querySelector('input').value //O value serve para extrair apenas o valor que entrou no input
    console.log(chute == numeroSecreto); //No console aparece true se o chute for igual ao numero secreto


    if (chute == numeroSecreto) { //If para caso o usuario ganhe
        exibirTextoNaTela('h1', 'Acertou!!!'); //Faz a alteração no h1 do html
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa' ; //Operador ternario
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}`; //Criando variavel que guarda o texto que vai ser executado caso o usuario acerte
        exibirTextoNaTela('p', mensagemTentativas); //Realiza a alteração do html e executa a variavel com o texto da linha acima
        document.getElementById('reiniciar').removeAttribute('disabled'); //Realiza a ativação do botão de reinicio do jogo
    } else { 
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', 'O número secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O número secreto é maior');
            }

        tentativas++; //Realiza o acrescimo de mais uma tentativa na variavel para cada erro do usuario
        limparLabel(); //Limpa a label de escolher o numero
        
    }
}


function reiniciarJogo() { //Função que está atrelada ao html no botão para reiniciar o jogo
    numeroSecreto = gerarNumeroAleatorio(); //Define que o número secreto vai ser redefinido para uma nova geração de numero
    limparLabel(); //Limpa a label
    tentativas = 1; //Reinicia a tentativa para 1
    mensagemInicial(); //execita a mensagem inicial para escolher o numero
    document.getElementById('reiniciar').setAttribute('disabled', true); //Desativa o botão de reiniciar 

}

function limparLabel() { //Função que faz a limpeza na label de preencher o número
    chute = document.querySelector('input'); //Cria uma variavel chute e define que o valor dela será a entrado do input
    chute.value = ''; //define a variavel como nula, executando a mudança no html

}



function gerarNumeroAleatorio(){ //Função que gera um número aleatório
    let numeroEscolhido =  parseInt(Math.random() * limiteMaximo + 1); //Define uma variavel e atribui a ela um numero aleatorio inteiro, essa função randon pega o valor entre 0 e 1 então multiplica por 10 e transforma em numeros de 0 a 9, e soma mais 1 para ficar valores de 1 a 10
    let quantidadeDeElementosNaLista = listaDeNumerosSecretosSorteados.length; //Criação de uma variavel que guarda a quantidade de elementos no away lista de numeros secretos
    if (quantidadeDeElementosNaLista == limiteMaximo){ //esse if define que quando a quantidade de elementos sorteados na lista for igual ao limite maximo de numeros a escolher o jogo reinicia do zero
        listaDeNumerosSecretosSorteados = []; //Define que será nulo se a linha anterior for verdadeira
    }


    if (listaDeNumerosSecretosSorteados.includes(numeroEscolhido)) { //Esse if pergunta se o numero escolhido está incluso na away com os numeros que ja foram sorteados
        return gerarNumeroAleatorio(); //Caso esteja incluso executa a função para gerar um novo numero (refunção)
    } else { 
        console.log(listaDeNumerosSecretosSorteados); //Caso não esteja incluso vai exibir no console todos os numeros da away de sorteados
        listaDeNumerosSecretosSorteados.push(numeroEscolhido);  //Em seguida vai incluir o novo numero sorteado na away que será exibido na proximo rodada apos o usuario acertar 
        return numeroEscolhido; //Essa função tem retorno que é o numero escolhido
    }
}