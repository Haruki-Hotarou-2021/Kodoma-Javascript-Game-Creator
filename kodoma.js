// Classe para criar um canvas
class Canvas {
  constructor(id, width, height, backgroundColor = "#000000") {
    this.id = id;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
    this.getWidth();
    this.getHeight();
    
    // Cria o elemento canvas no DOM
    this.element = document.createElement('canvas');
    this.element.id = this.id;
    this.element.width = this.width;
    this.element.height = this.height;
    this.element.style.backgroundColor = this.backgroundColor;
    
    // Obtém o contexto do canvas
    this.ctx = this.element.getContext('2d');
    
    // Define a margin e o padding do body para 0
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    
    // Adiciona o elemento canvas ao body
    document.body.appendChild(this.element);
  }
  
  // Obtém a largura do canvas
  getWidth() {
    return this.width;
  }
  
  // Obtém a altura do canvas
  getHeight() {
    return this.height;
  }
  
}
// Define o Título da página
function setTitle(title) {
  document.title = title;
}

function setFavicon(url) {
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = url;
  document.head.appendChild(link);
}

// Exemplo de uso
setFavicon('player.png');

// Cria um canvas
let canvas = new Canvas('canvas', innerWidth, innerHeight);
let ctxt = canvas.ctx;

// Função que limpa o canvas
function cls() {
  ctxt.clearRect(0, 0, canvas.width, canvas.height);
}

// Função para carregar os recursos do jogo
window.onload = function() {
  onLoad();

  // Função para atualizar e desenhar os recursos do jogo
  function animate() {
    let lastTime = 0;
    function loop(timestamp) {
      const dt = timestamp - lastTime;
      cls(); 
      onGame(dt);
      lastTime = timestamp;
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }
  animate();
}

// Aguardar segundos
function wait(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    console.error("O parâmetro 'seconds' deve ser um número não negativo");
  }

  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

// Classe que cria um sprite
class spr {
  constructor(sprite, width, height, X, Y) {
    this.sprite = new Image();
    this.sprite.src = sprite;
    this.width = width;
    this.height = height;
    this.x = X;
    this.y = Y;
    this.display();
  }

  display() {
    ctxt.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
}

// Classe que cria um botão
class btn {
  constructor(type, width, height, x, y, color, fill) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
    this.fill = fill;
    this.display();
  }

  display() {
    switch (this.type) {
      case "circ":
        this._desenharCirculo(ctxt);
        break;
      case "quad":
        this._desenharQuadradoArredondado(ctxt);
        break;
    }
  }
  
  // Função para lidar com o evento de touch no botão
  onTouch(callback) {
    this.ontouchstart = () => {
      callback(); // Chama a função de callback passada como parâmetro
    }
  }

  _desenharCirculo(ctx) {
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, 2 * Math.PI);

    if (this.fill) {
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }

  _desenharQuadradoArredondado(ctx) {
    const radius = 5; // Raio de arredondamento das bordas
    ctx.beginPath();
    ctx.moveTo(this.x + radius, this.y);
    ctx.lineTo(this.x + this.width - radius, this.y);
    ctx.quadraticCurveTo(this.x + this.width, this.y, this.x + this.width, this.y + radius);
    ctx.lineTo(this.x + this.width, this.y + this.height - radius);
    ctx.quadraticCurveTo(this.x + this.width - radius, this.y + this.height, this.x + this.x - radius, this.y + this.height);
    ctx.lineTo(this.x + radius, this.y + this.height);
    ctx.quadraticCurveTo(this.x, this.y + this.height - radius, this.x, this.y + this.y - radius);
    ctx.lineTo(this.x, this.y + radius);
    ctx.quadraticCurveTo(this.x + radius, this.y, this.x + this.x + radius, this.y);

    if (this.fill) {
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }
}

// Classe que cria um círculo 
class circ {
  constructor(radius, x, y, fill, color) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.fill = fill;
    this.color = color;
    this.display();
    this.onTouch();
  }

  display() {
    ctxt.beginPath();
    ctxt.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    if (this.fill) {
      ctxt.fillStyle = this.color;
      ctxt.fill();
    } else {
      ctxt.strokeStyle = this.color;
      ctxt.stroke();
    }
  }
  
  // Função para lidar com o evento de touch no botão
  onTouch(callback) {
    this.ontouchstart = () => {
      callback(); // Chama a função de callback passada como parâmetro
    }
  }
}

// Função que exibe um texto na tela
function print(text, x, y, size, font, color = "white") {
  if (!text) {
    console.error("O parâmetro 'text' não pode ser vazio");
  }

  ctxt.font = `${size}px ${font}`;
  ctxt.fillStyle = color;
  ctxt.fillText(text, x, y);
}


// Eventos de Touch:

//ontouchstart
//ontouchmove
//ontouchend

// Eventos de Mouse:

//onmousedown
//onmouseup