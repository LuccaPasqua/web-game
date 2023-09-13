var divDoBotaoNorteElement = document.getElementById('divDoBotaoNorte')
var divDoBotaoLesteElement = document.getElementById('divDoBotaoLeste')
var divDoBotaoOesteElement = document.getElementById('divDoBotaoOeste')
var divDoBotaoSulElement = document.getElementById('divDoBotaoSul')

var vidasDoJogadorElement = document.getElementById('vidasDoJogador')

var botaoPraResposta1 = document.createElement('button')
var botaoPraResposta2 = document.createElement('button')
var botaoPraResposta3 = document.createElement('button')
var botaoPraResposta4 = document.createElement('button')

var flexaNorteElement = document.getElementById('flexaNorte')
var flexaOesteElement = document.getElementById('flexaOeste')
var flexaLesteElement = document.getElementById('flexaLeste')
var flexaSulElement = document.getElementById('flexaSul')



var containerJogoElement = document.getElementById('containerJogo')
var espadasSpanElement = document.getElementById('espadasSpan');
var pocoesSpanElement = document.getElementById('pocaosSpan');
var moedasSpanElement = document.getElementById('moedasSpan');
var mapaDeAuxilho = document.getElementById('mapaDeAuxilho');

var imgMoeda = document.createElement('img')
var imgInimigo = document.createElement('img')

var spanTimerInimigo = document.createElement('span')
var pConta = document.createElement('p')

var numero1=0
var numero2=0

var isJogoOn = false;
var posX = 0;
var posY = 0;
var mapaJogo = [];

var tamanhoDoTabuleiro=4
var quantidadeDeCasasTabuleiro = ((tamanhoDoTabuleiro + 1) * tamanhoDoTabuleiro * 4) +1
var moedasNoJogo = 15
var inimigosNoJogo = 10
var espadasNoJogo = 2
var pocoesNoJogo = 3

var vidas = 3;
var moedas = 0;
var espadas = 0;
var pocoes = 0;

espadasSpanElement.textContent = `${espadas} / ${espadasNoJogo}`;
pocoesSpanElement.textContent = `${pocoes} / ${pocoesNoJogo}`;
moedasSpanElement.textContent = `${moedas} / 16`;

for(let i = 0; i < quantidadeDeCasasTabuleiro; i++){
  var divDaGridDoMapa = document.createElement('div')
  divDaGridDoMapa.style.backgroundColor = "red"
  divDaGridDoMapa.style.width= "100px";
  divDaGridDoMapa.style.height= "100px";

  mapaDeAuxilho.style="display: grid;grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));grid-gap: 1px;"

  mapaDeAuxilho.appendChild(divDaGridDoMapa);

}

if(vidas< 3 ){
  if(vidas === 2){
    vidasDoJogadorElement[0].style = 'filter: grayscale(100%)'
  }
}


function handleFlechaNorte(){
  console.log('flexa norte')
  if(isJogoOn===false){
    return comecarJogo()  
  } else {
    if(posY === tamanhoDoTabuleiro){
      alert('fim do mapa')
    } else {
      posY++ 
      console.log(posX, posY)
      moverPersonagem(posX,posY)
    }
  }
}

function handleFlechaOeste(){
  console.log('flexa oeste')
  if(isJogoOn===false){
    return comecarJogo()  
  } else {
    if(posX === tamanhoDoTabuleiro * -1){
      alert('fim do mapa')
    } else {
      posX--
      console.log(posX, posY)
      moverPersonagem(posX,posY)
    }

  }
}

function handleFlechaLeste(){
  console.log('flexa leste')
  if(isJogoOn===false){
    return comecarJogo()  
  } else {
    if(posX === tamanhoDoTabuleiro){
      alert('fim do mapa')
    } else {
      posX++
      console.log(posX, posY)
      moverPersonagem(posX,posY)
    }
  }
}

function handleFlechaSul(){
  console.log('flexa sul')
  if(isJogoOn===false){
    return comecarJogo()  
  } else {
    if(posY === tamanhoDoTabuleiro * -1){
      alert('fim do mapa')
    } else {
      posY--
      console.log(posX, posY)
      moverPersonagem(posX,posY)
    }

  }
}

async function comecarJogo(){
  //o tamanho do tabuleiro quer dizer que será possível andar n vezes +x -x +y -y
  
  var localizacaoPersonagem = [posX + tamanhoDoTabuleiro, posY + tamanhoDoTabuleiro]

  isJogoOn = true

  var arrayLugaresVazios = [] //0
  var arrayDeMoedas = [] //1
  var arrayDeInimigos = [] //2
  var arrayEspadasNoJogo = [] //3
  var arrayPocoesNoJogo = [] //4



  for(let i = (quantidadeDeCasasTabuleiro - (moedasNoJogo + inimigosNoJogo + espadasNoJogo + pocoesNoJogo)); i > 0; i-- ){
    arrayLugaresVazios.push('0')
  }  
  
  for(let i = moedasNoJogo; i > 0; i-- ){
    arrayDeMoedas.push('1')
  }

  for(let i = inimigosNoJogo; i > 0; i-- ){
    arrayDeInimigos.push('2')
  }

  for(let i = espadasNoJogo; i > 0; i-- ){
    arrayEspadasNoJogo.push('3')
  }

  for(let i = pocoesNoJogo; i > 0; i-- ){
    arrayPocoesNoJogo.push('4')
  }

  mapaJogo = [
    ...arrayLugaresVazios, 
    ...arrayDeMoedas, 
    ...arrayDeInimigos, 
    ...arrayEspadasNoJogo, 
    ...arrayPocoesNoJogo
  ]

  mapaJogo = shuffleArray(mapaJogo)
  
  mapaJogo = array_chunk(mapaJogo, ((tamanhoDoTabuleiro*2)+1))

  
  console.log(mapaJogo)
}

function shuffleArray(arr) {
  // Loop em todos os elementos
  for (let i = arr.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  // Retornando array com aleatoriedade
  return arr;
}


function array_chunk(arr, len) {
  let chunks = [], i = 0, n = arr.length
  while (i < n) {
    chunks.push(arr.slice(i, i += len))
  }
  return chunks
}

// function moverNorte(){
//   posY++ 
//   console.log(posX, posY)
//   moverPersonagem(posX,posY)
// }

// function moverOeste(){
//   posX--
//   console.log(posX, posY)
//   moverPersonagem(posX,posY)
// }

// function moverLeste(){
//   posX++ 
//   console.log(posX, posY)
//   moverPersonagem(posX,posY)
// }

// function moverSul(){
//   posY-- 
//   console.log(posX, posY)
//   moverPersonagem(posX,posY)
// }

function moverPersonagem(posX,posY){
  numero1 = Math.floor(Math.random() * 100)
  numero2 = Math.floor(Math.random() * 60)
  
  localizacaoPersonagem = [posX + tamanhoDoTabuleiro, posY + tamanhoDoTabuleiro]
  rendenizarBordaDoMapa(posX, posY)
  console.log(containerJogoElement)
  if(containerJogoElement.contains(imgMoeda)){
    containerJogoElement.removeChild(imgMoeda)
  } else if( containerJogoElement.contains(imgInimigo)){
    containerJogoElement.removeChild(imgInimigo)
  }
  
  var elementoArrayDaLocalizacao = mapaJogo[localizacaoPersonagem[1]][localizacaoPersonagem[0]]

  console.log(mapaJogo[localizacaoPersonagem[1]])
  console.log(mapaJogo[localizacaoPersonagem[1]][localizacaoPersonagem[0]])

  if(elementoArrayDaLocalizacao === '0'){
    console.log('nada')
  } else if (elementoArrayDaLocalizacao === '1'){
    console.log('moeda')
    imgMoeda.src='./assets/moeda.png'
    mapaJogo[localizacaoPersonagem[1]][localizacaoPersonagem[0]] = '0'
    moedas += 1
    moedasSpanElement.textContent = `${moedas} / 16`
    containerJogoElement.appendChild(imgMoeda)
    imgMoeda.style.height= '200px'

    setTimeout(()=>{
      if(containerJogoElement.contains(imgMoeda)){
        containerJogoElement.removeChild(imgMoeda)
      }
    },2000)
  } else if (elementoArrayDaLocalizacao === '2'){
    inibirFlexasDeMovimentacao()

    console.log('inimigo')
    imgInimigo.src='./assets/inimigo.webp'
    containerJogoElement.appendChild(imgInimigo)
    imgInimigo.style='height:300px; width: 300px'
    mapaJogo[localizacaoPersonagem[1]][localizacaoPersonagem[0]] = '0'
    containerJogoElement.appendChild(spanTimerInimigo)
    
    var tempoAntesDaMatematica = 5
    var intervalIID = setInterval(timerAntesDoInimigo, 1000)

    function timerAntesDoInimigo(){
      spanTimerInimigo.textContent=`${tempoAntesDaMatematica}`
      if(tempoAntesDaMatematica === 0){
        jogarJogoDoInimigo()
        clearInterval(intervalIID)
      } else {
        if(tempoAntesDaMatematica % 2 === 0){
          spanTimerInimigo.style='color: rgb(255, 75, 75)'
        } else {
          spanTimerInimigo.style='color: aliceblue'
        }
        tempoAntesDaMatematica -= 1
      }
    }

  } else if (elementoArrayDaLocalizacao === '3'){
    console.log('espada')
  } else {
    console.log('poção')
  }

}

function rendenizarBordaDoMapa(posX, posY){
  if(posX < tamanhoDoTabuleiro && posX > -tamanhoDoTabuleiro && posY < tamanhoDoTabuleiro && posY > -tamanhoDoTabuleiro){
    containerJogoElement.style= 'border: 5px solid rgb(61, 7, 7);  width: 350px;height: 350px;'
  }else if(posX === tamanhoDoTabuleiro){
    console.log('X é quatro')
    if(posY == tamanhoDoTabuleiro || posY == -tamanhoDoTabuleiro){
    console.log('Y é quatro ou menos quatro')
      if(posY == tamanhoDoTabuleiro){
        console.log('Y é 4')
        containerJogoElement.style= 'border-right:40px solid gray; width: 310px;border-top:40px solid gray; height: 310px;'
      } else if (posY == -tamanhoDoTabuleiro){
        containerJogoElement.style= 'border-right:40px solid gray; width: 310px;border-bottom:40px solid gray; height: 310px;'
      }
    } else {
      containerJogoElement.style= 'border-right:40px solid gray; width: 310px'
    }
  } else if(posX === - tamanhoDoTabuleiro ){
    console.log('X é - quatro')
    if(posY == tamanhoDoTabuleiro || posY == -tamanhoDoTabuleiro){
    console.log('Y é quatro ou menos quatro')
      if(posY == tamanhoDoTabuleiro){
        console.log('Y é 4')
        containerJogoElement.style= 'border-left:40px solid gray; width: 310px;border-top:40px solid gray; height: 310px;'
      } else if (posY == -tamanhoDoTabuleiro){
        containerJogoElement.style= 'border-left:40px solid gray; width: 310px;border-bottom:40px solid gray; height: 310px;'
      }
    } else {
      containerJogoElement.style= 'border-left:40px solid gray; width: 310px'
    }
  } else if(posY === tamanhoDoTabuleiro ){
    console.log('Y é - quatro')
    if(posX < tamanhoDoTabuleiro && posX > -tamanhoDoTabuleiro){
      containerJogoElement.style= 'border-top:40px solid gray; height: 310px;'
    } else {
      containerJogoElement.style= 'border-left:40px solid gray; width: 310px'
    }
  } else if(posY === - tamanhoDoTabuleiro ){
    console.log('Y é - quatro')
    if(posX < tamanhoDoTabuleiro && posX > -tamanhoDoTabuleiro){
      containerJogoElement.style= 'border-bottom:40px solid gray; height: 310px;'
    } else {
      containerJogoElement.style= 'border-left:40px solid gray; width: 310px'
    }
  } 
}

function jogarJogoDoInimigo(){
  // var timerParaOInimigoGanhar = 5  

  criarContasMatematicas()
  //   setInterval(()=> {
  //     console.log(numero1, numero2)
  // }, 1000)
}


function inibirFlexasDeMovimentacao(){
  flexaNorteElement.style='visibility:hidden'
  flexaOesteElement.style='visibility:hidden'
  flexaLesteElement.style='visibility:hidden'
  flexaSulElement.style='visibility:hidden'
}

function criarContasMatematicas() {
  flexaNorteElement.style='display:none'
  flexaOesteElement.style='display:none'
  flexaLesteElement.style='display:none'
  flexaSulElement.style='display:none'

  numero1 = Math.floor(Math.random() * 100)
  numero2 = Math.floor(Math.random() * 60)

  var resultado = numero1 + numero2
  var indexQueEstaOResultadoCerto = 0

  var resultadoErrado1 = (numero1 + numero2) + Math.floor(Math.random() * 15+1)
  var resultadoErrado2 = (numero1 + numero2) - Math.floor(Math.random() * 15)
  var resultadoErrado3 = (numero1 + numero2) - Math.floor(Math.random() * 15)

  var arrayDosResultados = shuffleArray([resultado, resultadoErrado1, resultadoErrado2, resultadoErrado3])

  for(let i = 0; i < 3; i++){
    if(arrayDosResultados[i] === resultado){
      indexQueEstaOResultadoCerto = i
      console.log(indexQueEstaOResultadoCerto)
    }
  }

  console.log(arrayDosResultados)

  containerJogoElement.appendChild(pConta)
  pConta.textContent = `${numero1} + ${numero2}`

  divDoBotaoNorteElement.appendChild(botaoPraResposta1)
  botaoPraResposta1.textContent = `${arrayDosResultados[0]}`
  botaoPraResposta1.style='font-size:40px'
  botaoPraResposta1.onclick = respostaUsuario(arrayDosResultados[0])

  divDoBotaoOesteElement.appendChild(botaoPraResposta2)
  botaoPraResposta2.textContent = `${arrayDosResultados[1]}`
  botaoPraResposta2.style='font-size: 40px'
  botaoPraResposta2.onclick = respostaUsuario(arrayDosResultados[1])



  divDoBotaoLesteElement.appendChild(botaoPraResposta3)
  botaoPraResposta3.textContent = `${arrayDosResultados[2]}`
  botaoPraResposta3.style='font-size: 40px'
  botaoPraResposta3.onclick = respostaUsuario(arrayDosResultados[2])



  divDoBotaoSulElement.appendChild(botaoPraResposta4)
  botaoPraResposta4.textContent = `${arrayDosResultados[3]}`
  botaoPraResposta4.style='font-size: 40px'
  botaoPraResposta4.onclick = respostaUsuario(arrayDosResultados[3])


  var tempoAntesDaMatematica = 5
  var intervalIID = setInterval(timerDoInimigo, 1000);

  function timerDoInimigo(){

    spanTimerInimigo.textContent=`${tempoAntesDaMatematica}`
    if(tempoAntesDaMatematica === 0){
      clearInterval(intervalIID)
      perderVida()
    } else {
      if(tempoAntesDaMatematica % 2 === 0){
        spanTimerInimigo.style='color: rgb(255, 75, 75)'
      } else {
        spanTimerInimigo.style='color: aliceblue'
      }
      tempoAntesDaMatematica -= 1
    }
  }
}

function perderVida(){
  vidas -= 1
  if(vidas === 2){
    vidasDoJogadorElement.children[0].style='filter: grayscale(100%)'
    voltarAoJogo()
  } else if(vidas === 1){
    vidasDoJogadorElement.children[0].style='filter: grayscale(100%)'
    vidasDoJogadorElement.children[1].style='filter: grayscale(100%)'
    voltarAoJogo()
  }
  if(vidas === 0){
    gameOver()
  }
}

function gameOver(){
  console.log('Você perdeu')
}

function respostaUsuario(resposta){
  if(resposta === numero1 + numero2){
    moedas += 1
  }
}

function voltarAoJogo(){
  divDoBotaoNorteElement.removeChild(botaoPraResposta1)
  divDoBotaoOesteElement.removeChild(botaoPraResposta2)
  divDoBotaoLesteElement.removeChild(botaoPraResposta3)
  divDoBotaoSulElement.removeChild(botaoPraResposta4)

  flexaNorteElement.style='display:inline; padding:0'
  flexaOesteElement.style='display:block'
  flexaLesteElement.style='display:block'
  flexaSulElement.style='display:block'

  flexaNorteElement.style='visibility:visible'
  flexaOesteElement.style='visibility:visible'
  flexaLesteElement.style='visibility:visible'
  flexaSulElement.style='visibility:visible'
}