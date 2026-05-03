// quadrado que poderá ser movido com o mouse
let quadradoMovel;

// definição dos quadrados da composição
const composicao = {
  //quadrado externo onde vão acontecer as sobreposições
  externo: {
    x: 0,
    y: 0,
    w: 760,
    h: 750,
    cor: "#F6F6F3"
  },

  // quadrado azul
  azul: {
    x: 0,
    y: 0,
    w: 650,
    h: 650,
    cor: "#0365AE"
  },

  // quadrado ciano
  ciano: {
    x: 0,
    y: 18,
    w: 500,
    h: 500,
    cor: "#33BFD3"
  },

  // quadrado verde
  verde: {
    x: 0,
    y: 48,
    w: 340,
    h: 340,
    cor: "#67C9C0"
  },

  // quadrado amarelo (o que será movido)
  amarelo: {
    x: 0,
    y: 92,
    w: 190,
    h: 190,
    cor: "#C8C54A"
  }
};


// executa uma vez no início
function setup() {
  // cria o canvas
  createCanvas(900, 900);

  // faz os retângulos serem desenhados pelo centro
  rectMode(CENTER);

  // remove contorno
  noStroke();

  // cria o quadrado interativo
  quadradoMovel = {
    x: composicao.amarelo.x,
    y: composicao.amarelo.y,

    // guarda a posição inicial
    origemX: composicao.amarelo.x,
    origemY: composicao.amarelo.y,

    w: composicao.amarelo.w,
    h: composicao.amarelo.h,
    cor: composicao.amarelo.cor
  };
}


//executa continuamente
function draw() {
  // cor do fundo
  background(18);

  // move o sistema de coordenadas para o centro
  translate(width / 2, height / 2 + 20);

  // desenha os dois primeiros quadrados
  desenharQuadrado(composicao.externo);
  desenharQuadrado(composicao.azul);

  //Cria uma pequena animação de vibração
  const vib = sin(frameCount * 0.02) * 4;

  // desenha o quadrado ciano com vibração
  desenharQuadrado({
    x: composicao.ciano.x,
    y: composicao.ciano.y,
    w: composicao.ciano.w + vib,
    h: composicao.ciano.h + vib,
    cor: composicao.ciano.cor
  });

  // desenha o quadrado verde com vibração oposta
  desenharQuadrado({
    x: composicao.verde.x,
    y: composicao.verde.y,
    w: composicao.verde.w - vib * 0.5,
    h: composicao.verde.h - vib * 0.5,
    cor: composicao.verde.cor
  });

  // se o mouse estiver sobre o quadrado amarelo
  if (mouseSobreQuadrado()) {
    // o quadrado acompanha o mouse
    quadradoMovel.x = mouseX - width / 2;
    quadradoMovel.y = mouseY - (height / 2 + 20);
  }

  //Desenha o quadrado móvel
  desenharQuadrado(quadradoMovel);

  // verifica se ele saiu da tela
  verificarSaida();
}


// desenha um quadrado
function desenharQuadrado(q) {
  fill(q.cor);
  rect(q.x, q.y, q.w, q.h);
}


//verifica se o mouse está sobre o quadrado móvel
function mouseSobreQuadrado() {
  // posição do mouse relativa ao centro
  const mx = mouseX - width / 2;
  const my = mouseY - (height / 2 + 20);

  return (
    mx > quadradoMovel.x - quadradoMovel.w / 2 &&
    mx < quadradoMovel.x + quadradoMovel.w / 2 &&
    my > quadradoMovel.y - quadradoMovel.h / 2 &&
    my < quadradoMovel.y + quadradoMovel.h / 2
  );
}


// verifica se o quadrado saiu completamente do canvas
function verificarSaida() {
  // converte a posição para coordenadas da tela
  const xTela = quadradoMovel.x + width / 2;
  const yTela = quadradoMovel.y + height / 2 + 20;

  // testa se saiu por algum lado
  const saiu =
    xTela + quadradoMovel.w / 2 < 0 ||
    xTela - quadradoMovel.w / 2 > width ||
    yTela + quadradoMovel.h / 2 < 0 ||
    yTela - quadradoMovel.h / 2 > height;

  // se saiu, volta para a posição original
  if (saiu) {
    quadradoMovel.x = quadradoMovel.origemX;
    quadradoMovel.y = quadradoMovel.origemY;
  }
}