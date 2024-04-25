/**
 * @title   Kodoma JS Game Creator
 * @author  Haruki
 * @desc    A LÖVE based framework
 * @license MIT License
 * @version 0.0.2
*/

// Configura o canvas
canvas = {
  id: 'canvas', // ID do elemento canvas
  width: window.innerWidth, // Largura do canvas (tamanho da tela)
  height: window.innerHeight, // Altura do canvas (tamanho da tela)
  context: '2d', // Define o contexto para 2D
  ctx: null, // Contexto 2D do canvas (inicializado posteriormente)
  backgroundColor: '#000000', // Cor de fundo do canvas (branco padrão)
  gridColor: '#CCCCCC', // Define a cor do grid para cinza claro

  // Função para desenhar o grid
  grid() {
    // Desenha o grid
    this.ctx.beginPath();
    for (var x = -this.width; x <= this.width; x += 20) {
      this.ctx.moveTo(x, -this.height);
      this.ctx.lineTo(x, this.height);
    }
    for (var y = -this.height; y <= this.height; y += 20) {
      this.ctx.moveTo(-this.width, y);
      this.ctx.lineTo(this.width, y);
    }
    this.ctx.strokeStyle = this.gridColor;
    this.ctx.stroke();
  }
};

// Define a funcao de configuração do canvas
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
canvas.ctx = canvasElement.getContext(canvas.context);
  
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
  if (typeof onLoad === 'function') {
  onLoad();
  }

  // Função para atualizar e desenhar os recursos do jogo
  function update() {
    let lastTime = 0;
    function loop(timestamp) {
      const dt = timestamp - lastTime;
      cls(); 
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

function print(text, x, y, size, color = "white", font = 'Arial', type = 'normal') {
  if (!text) {
    console.error("O parâmetro 'text' não pode ser vazio");
    return;
  }
  // Defina a fonte
  canvas.ctx.font = `${type} ${size}px ${font}`;
  canvas.ctx.fillStyle = color;
  // Calcule a largura do texto usando a função measureText()
  const textMetrics = canvas.ctx.measureText(text);
  const textWidth = textMetrics.width;
  // Ajuste a posição x para centralizar o texto
  x -= textWidth / 2;
  // Desenhe o texto na posição ajustada
  canvas.ctx.fillText(text, x, y);
}


// Função que exibe um texto na tela
function printf(text, x, y, size, color = "white", font = 'Arial', type = 'normal') {
  if (!text) {
    console.error("O parâmetro 'text' não pode ser vazio");
  }
  canvas.ctx.font = `${type} ${size}px ${font}`;
  canvas.ctx.fillStyle = color;
  canvas.ctx.fillText(text, x, y);
}


// CLASSES

// Classe que cria um sprite
class Spr {
  constructor(sprite, width, height, X, Y) {
    this.sprite = new Image();
    this.sprite.src = sprite;
    this.width = width;
    this.height = height;
    this.x = X - this.width / 2;
    this.y = Y - this.height / 2;
  }

  display() {
    canvas.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }


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


class Rect {
  constructor(x, y, width, height, color, fill = 'fill') {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = color;
    this.fill = fill;
  }

  display() {
    if (this.fill === 'fill') {
      canvas.ctx.fillStyle = this.color;
      canvas.ctx.fillRect(this.x, this.y, this.width, this.height);
    } else {
      canvas.ctx.strokeStyle = this.color;
      canvas.ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
  }
}

class Circ {
  constructor(radius, x, y, color, fill = 'fill') {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.fill = fill;
    this.color = color;
  }

  display() {
    canvas.ctx.beginPath();
    canvas.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    
    if (this.fill === 'fill') {
      canvas.ctx.fillStyle = this.color;
      canvas.ctx.fill();
    } else {
      canvas.ctx.strokeStyle = this.color;
      canvas.ctx.stroke();
    }
  }
}
