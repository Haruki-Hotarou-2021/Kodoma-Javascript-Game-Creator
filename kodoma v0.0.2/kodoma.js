/**
 * @title   Kodoma JS Game Creator
 * @author  Haruki
 * @desc    A LÖVE based framework
 * @license MIT License
 * @version 0.0.2
*/

// CONFIGURAÇÕES -----------------------

// Configura o canvas
canvas = {
  id: 'canvas', // ID do elemento canvas
  width: window.innerWidth, // Largura do canvas (tamanho da tela)
  height: window.innerHeight, // Altura do canvas (tamanho da tela)
  ctx: null, // Contexto 2D do canvas (inicializado posteriormente)
  backgroundColor: '#000000', // Cor de fundo do canvas (branco padrão)
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
canvas.ctx = canvasElement.getContext('2d');

//--------------------------------------
  
// FUNÇÕES -----------------------------
  
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
  if (typeof onClick === 'function') {
    onClick();
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

// Exibe um texto na tela
function print(text, x = 0, y = 0, size = 14, color = "white", font = 'Arial', type = 'normal', align = 'left') {
  if (!text) {
    console.error("O parâmetro 'text' não pode ser vazio");
    return;
  }
  // Define a fonte
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

//--------------------------------------

// CLASSES -----------------------------

// Cria um sprite
class Spr {
  constructor(sprite, width = 50, height = 50, X = 0, Y = 0, smooth = true) {
    this.sprite = new Image();
    this.sprite.src = sprite;
    this.width = width;
    this.height = height;
    this.x = X;
    this.y = Y;
    this.smooth = smooth;
  }

  display() {
    // Define as origens do sprite
    this._oX_ = this.x - (this.width / 2);
    this._oY_ = this.y - (this.height / 2);
    // Define a suavização do sprite
    canvas.ctx.imageSmoothingEnabled = this.smooth;
    // Desenha o sprite na tela
    canvas.ctx.drawImage(this.sprite, this._oX_, this._oY_, this.width, this.height);
  }


  // Método para adicionar evento de toque (tocar e soltar) ao sprite
  click(callback) {
    if (typeof callback !== 'function') {
      console.error("O parâmetro 'callback' deve ser uma função");
      return;
    }

    // Verifica se o canvas existe e possui contexto
    if (!canvas || !canvas.ctx) {
      console.error("Canvas não encontrado ou contexto não inicializado.");
      return;
    }

    // Adiciona evento de toque (touchstart) no canvas
    canvasElement.addEventListener('touchstart', (event) => {
      // Previne o comportamento padrão do toque para evitar o zoom da página
      event.preventDefault();
      
      // Verifica se o toque está dentro da área do sprite
      const touchX = event.touches[0].clientX - canvasElement.getBoundingClientRect().left;
      const touchY = event.touches[0].clientY - canvasElement.getBoundingClientRect().top;
      if (
        touchX >= this._oX_ &&
        touchX <= this._oX_ + this.width &&
        touchY >= this._oY_ &&
        touchY <= this._oY_ + this.height
      ) {
        // Chama a função callback se o toque estiver dentro do sprite
        callback(event);
      }
    });
  }
}

// Desenha um retângulo
class Rect {
  constructor(x = 0, y = 0, width = 50, height = 50, color = 'red', fill = 'fill') {
    this.x = x - width / 2;
    this.y = y - height / 2;
    this.width = width;
    this.height = height;
    this.color = color;
    this.fill = fill;
  }

  display() {
    // Defune as origens do retângulo
    this._oX_ = this.x - (this.width / 2);
    this._oY_ = this.y - (this.height / 2);
    // Verifica se o retângulo deve ser preenchido
    if (this.fill === 'fill') {
      canvas.ctx.fillStyle = this.color;
      canvas.ctx.fillRect(this._oX_, this._oY_, this.width, this.height);
    } else {
      canvas.ctx.strokeStyle = this.color;
      canvas.ctx.strokeRect(this._oX_, this._oY_, this.width, this.height);
    }
  }
}

// Desenha um círculo
class Circ {
  constructor(x = 0, y = 0, radius = 30, color = 'blue', fill = 'fill') {
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

// Desenha uma linha
class Line {
  constructor(x0 = 0, y0 = 250, x1 = 300, y1 = 250, color = 'pink') {
    this.x0 = x0;
    this.y0 = y0;
    this.x1 = x1;
    this.y1 = y1;
    this.color = color;
  }

  display() {
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(this.x0, this.y0);
    canvas.ctx.lineTo(this.x1, this.y1);
    canvas.ctx.strokeStyle = this.color;
    canvas.ctx.stroke();
  }
}

// Desenha um triângulo
class Tri {
  constructor(x1, y1, x2, y2, x3, y3, color = 'green', fill = 'fill') {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.x3 = x3;
    this.y3 = y3;
    this.color = color;
    this.fill = fill;
  }

  display() {
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(this.x1, this.y1);
    canvas.ctx.lineTo(this.x2, this.y2);
    canvas.ctx.lineTo(this.x3, this.y3);
    canvas.ctx.closePath();

    if (this.fill === 'fill') {
      canvas.ctx.fillStyle = this.color;
      canvas.ctx.fill();
    } else {
      canvas.ctx.strokeStyle = this.color;
      canvas.ctx.stroke();
    }
  }
}

// Desenha um arco
class Arc {
  constructor(x = 0, y = 0, radius = 30, angle1 = 270, angle2 = 90, color = 'cyan', fill = 'line') {
    this.x = x; 
    this.y = y;
    this.radius = radius;
    this.angle1 = angle1 * (Math.PI / 180); // Convertendo o ângulo para radianos
    this.angle2 = angle2 * (Math.PI / 180); // Convertendo o ângulo para radianos
    this.color = color;
    this.fill = fill;
  }

  display() {
    canvas.ctx.beginPath();
    canvas.ctx.arc(this.x, this.y, this.radius, this.angle1, this.angle2);
    if (this.fill === 'fill') {
      canvas.ctx.fillStyle = this.color;
      canvas.ctx.fill();
    } else {
      canvas.ctx.strokeStyle = this.color;
      canvas.ctx.stroke();
    }
  }
}

// Desenha uma linha curva 
class Curve {
  constructor(x1 = 0, y1 = 250, x2 = 300, y2 = 250, controlX = 125, controlY = 100, color = 'purple') {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.controlX = controlX;
    this.controlY = controlY;
    this.color = color;
  }

  display() {
    canvas.ctx.beginPath();
    canvas.ctx.moveTo(this.x1, this.y1); // Move para o primeiro ponto
    canvas.ctx.quadraticCurveTo(this.controlX, this.controlY, this.x2, this.y2); // Desenha a curva quadrática
    canvas.ctx.strokeStyle = this.color; // Define a cor da linha
    canvas.ctx.stroke(); // Renderiza a curva
  }
}

// Desenha uma elipse 
class Elli {
  constructor(x = 0, y = 0, a = 50, b = 10, color = 'darkblue', fill = 'fill') {
    this.x = x;
    this.y = y;
    this.a = a;
    this.b = b;
    this.color = color;
    this.fill = fill;
  }

  display() {
    canvas.ctx.beginPath();
    canvas.ctx.ellipse(this.x, this.y, this.a, this.b, 0, 0, 2 * Math.PI);

    if (this.fill === 'fill') {
      canvas.ctx.fillStyle = this.color;
      canvas.ctx.fill();
    } else {
      canvas.ctx.strokeStyle = this.color;
      canvas.ctx.stroke();
    }
  }
}