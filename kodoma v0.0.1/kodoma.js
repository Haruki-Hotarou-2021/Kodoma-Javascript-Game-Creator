/**
 * @title   Kodoma JS Game Creator
 * @author  Haruki
 * @desc    A TIC-80 based framework
 * @license MIT License
 * @version 0.0.1
*/

// Configura o canvas
canvas = {
  id: 'canvas', // ID do elemento canvas
  width: window.innerWidth, // Largura do canvas (tamanho da tela)
  height: window.innerHeight, // Altura do canvas (tamanho da tela)
  ctx: null, // Contexto 2D do canvas (inicializado posteriormente)
  backgroundColor: '#000000', // Cor de fundo do canvas (Preto padrão)
  gridColor: '#CCCCCC', // Define a cor do grid para cinza claro

  // Função para desenhar o grid
  grid(distance = 10) {
    let d = distance;
    // Desenha o grid
    this.ctx.beginPath();
    for (var x = -this.width; x <= this.width; x += d) {
      this.ctx.moveTo(x, -this.height);
      this.ctx.lineTo(x, this.height);
    }
    for (var y = -this.height; y <= this.height; y += d) {
      this.ctx.moveTo(-this.width, y);
      this.ctx.lineTo(this.width, y);
    }
    this.ctx.strokeStyle = this.gridColor;
    this.ctx.stroke();
  },
  getWidth() {
    return window.innerWidth;
  },
  getHeight() {
    return window.innerHeight;
  }
};

if (typeof config === 'function') {
  config();
}

// Cria o elemento canvas
const canvasElement = document.createElement('canvas');

// Define os atributos do canvas
canvasElement.id = canvas.id;
canvasElement.width = canvas.width;
canvasElement.height = canvas.height;
canvasElement.style.backgroundColor = canvas.backgroundColor;

// Define a margin e o padding do body para 0
document.body.style.margin = 0;
document.body.style.padding = 0;
document.body.style.background = '#000000';

// Adiciona o canvas ao body
document.body.appendChild(canvasElement);

// Obtém o contexto do canvas
canvas.ctx = canvasElement.getContext('2d');
  
// FUNÇÕES
  
// Função que limpa o canvas
function cls() {
  canvas.ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Define o Título da página
function setTitle(title) {
  document.title = title;
}

// Define o favicon da página
function setFavicon(url) {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = url;
  document.head.appendChild(link);
}

// Função para carregar os recursos do jogo
window.onload = function() {
  // Função para atualizar e desenhar os recursos do jogo
  function update() {
    let lastTime = 0;
    function loop(timestamp) {
      const dt = timestamp - lastTime;
      if (typeof onGame === 'function') {
        onGame(dt);
      }
      lastTime = timestamp;
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }
  update();
}

// Aguardar segundos e executar callback
function wait(seconds, callback) {
  if (isNaN(seconds) || seconds < 0) {
    console.error("O parâmetro 'seconds' deve ser um número não negativo");
    return; // Retorna undefined se o parâmetro 'seconds' for inválido
  }
  if (typeof callback !== 'function') {
    console.error("O parâmetro 'callback' deve ser uma função");
    return; // Retorna undefined se o parâmetro 'callback' não for uma função
  }
  setTimeout(() => {
    callback(); // Chama a função callback após o tempo de espera
  }, seconds * 1000);
}

// Exibe um texto na tela
function print(text, x = 0, y = 0, size = 14, color = "white", font = 'Arial', type = 'normal', align = 'left') {
  if (!text) {
    console.error("O parâmetro 'text' não pode ser vazio");
    return;
  }
  // Defina a fonte
  canvas.ctx.font = `${type} ${size}px ${font}`;
  canvas.ctx.fillStyle = color;
  // Centraliza o texto
  canvas.ctx.textAlign = align;
  canvas.ctx.textBaseline = 'middle';
  // Desenha o texto
  canvas.ctx.fillText(text, x, y);
}

// Retorna o número de milissegundos decorridos desde 1º de janeiro de 1970 00:00:00
function tstamp() {
  return Date.now(); // Retorna o timestamp atual em milissegundos
}


// Objetos

/*
// Função que cria um sprite
  function spr(sprite, width, height, X, Y) {
    let spr = {
      sprite: new Image(),
      width: width,
      height: height,
      x: X - this.width / 2,
      y: Y - this.height / 2,
      display() {
        canvas.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
      },
      // Método para adicionar evento de toque (tocar e soltar) ao sprite
      touchStart(callback) {
        if (typeof callback !== 'function') {
          console.error("O parâmetro 'callback' deve ser uma função");
          return;
        }
        // Verifica se o canvas existe e possui contexto
        if (!canvas || !canvas.ctx) {
          console.error("Canvas não encontrado ou contexto não inicializado.");
          return;
        }
        // Adiciona evento de click (tocar) no canvas
        canvasElement.addEventListener('click', (event) => {
          // Verifica se o clique está dentro da área do sprite
          if (
            event.offsetX >= this.x &&
            event.offsetX <= this.x + this.width &&
            event.offsetY >= this.y &&
            event.offsetY <= this.y + this.height
          ) {
            // Chama a função callback se o clique estiver dentro do sprite
            callback(event);
          }
        });
      }
    }
    spr.sprite.src = sprite;
    spr.display();
    return spr;
  }
*/

// Desenha um sprite
function spr(sprite, width = 50, height = 50, x = 0, y = 0, smooth = true) {
  let spr = new Image();
  spr.src = sprite;
  let X = x;
  let Y = y;
  let _oX_ = X - width / 2;
  let _oY_ = Y - height / 2;
  // Define a suavização do sprite
  canvas.ctx.imageSmoothingEnabled = smooth;
  // Desenha o sprite na tela
  canvas.ctx.drawImage(spr, _oX_, _oY_, width, height);
}

// Desenha um retângulo
function rect(x, y, width, height, color = 'red', fill = 'fill') {
  let X = x;
  let Y = y;
  let _oX_ = X - width / 2;
  let _oY_ = Y - height / 2;
  
  if (fill === 'fill') {
      canvas.ctx.fillStyle = color;
      canvas.ctx.fillRect(_oX_, _oY_, width, height);
    } else {
      canvas.ctx.strokeStyle = color;
      canvas.ctx.strokeRect(_oX_, _oY_, width, height);
    }
}

// Desenha um círculo 
function circ(x, y, radius, color = 'blue', fill = 'fill') {
  canvas.ctx.beginPath();
  canvas.ctx.arc(x, y, radius, 0, 2 * Math.PI);

  if (fill === 'fill') {
    canvas.ctx.fillStyle = color;
    canvas.ctx.fill();
  } else {
    canvas.ctx.strokeStyle = color;
    canvas.ctx.stroke();
  }
}

// Desenha uma linha
function line(x0, y0, x1, y1, color = 'pink') {
  canvas.ctx.beginPath();
  canvas.ctx.moveTo(x0, y0);
  canvas.ctx.lineTo(x1, y1);
  canvas.ctx.strokeStyle = color;
  canvas.ctx.stroke();
}

// Desenha um triângulo
function tri(x1, y1, x2, y2, x3, y3, color = 'green',fill = 'fill') {
  canvas.ctx.beginPath();
  canvas.ctx.moveTo(x1, y1);
  canvas.ctx.lineTo(x2, y2);
  canvas.ctx.lineTo(x3, y3);
  canvas.ctx.closePath();

  if (fill === 'fill') {
    canvas.ctx.fillStyle = color;
    canvas.ctx.fill();
  } else {
    canvas.ctx.strokeStyle = color;
    canvas.ctx.stroke();
  }
}

function arc(x, y, radius, angle1, angle2, color = 'cyan', fill = 'line') {
  canvas.ctx.beginPath();
  canvas.ctx.arc(x, y, radius, angle1 * (Math.PI / 180), angle2 * (Math.PI / 180));
  
  if (fill === 'fill') {
    canvas.ctx.fillStyle = color;
    canvas.ctx.fill();
  } else {
    canvas.ctx.strokeStyle = color;
    canvas.ctx.stroke();
  }
}

function curve(x1, y1, x2, y2, controlX = 125, controlY = 100, color = 'purple') {
  canvas.ctx.beginPath();
  canvas.ctx.moveTo(x1, y1); // Move para o primeiro ponto
  canvas.ctx.quadraticCurveTo(controlX, controlY, x2, y2); // Desenha a curva quadrática
  canvas.ctx.strokeStyle = color; // Define a cor da linha
  canvas.ctx.stroke(); // Renderiza a curva
}

function elli(x, y, a, b, color = 'darkblue', fill = 'fill') {
  canvas.ctx.beginPath();
  canvas.ctx.ellipse(x, y, a, b, 0, 0, 2 * Math.PI);
  
  if (fill === 'fill') {
    canvas.ctx.fillStyle = color;
    canvas.ctx.fill();
  } else {
    canvas.ctx.strokeStyle = color;
    canvas.ctx.stroke();
  }
}
