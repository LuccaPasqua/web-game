var containerJogoElement = document.getElementById('containerJogo')
var espadasSpanElement = document.getElementById('espadasSpan');
var pocoesSpanElement = document.getElementById('pocaosSpan');
var moedasSpanElement = document.getElementById('moedasSpan');
var imgMoeda = document.createElement('img')


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
  localizacaoPersonagem = [posX + tamanhoDoTabuleiro, posY + tamanhoDoTabuleiro]
  console.log(containerJogoElement)
  if(containerJogoElement.contains(imgMoeda)){
    containerJogoElement.removeChild(imgMoeda)
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
      containerJogoElement.removeChild(imgMoeda)
    },100000000)
  } else if (elementoArrayDaLocalizacao === '2'){
    console.log('inimigo')
  } else if (elementoArrayDaLocalizacao === '3'){
    console.log('espada')
  } else {
    console.log('poção')
  }

}