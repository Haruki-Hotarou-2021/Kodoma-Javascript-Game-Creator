/**
 * kodoma
 * @version 0.0.1
 * @author Haruki-Hotarou-2021
 * @license MIT 
 */

// Classe para criar um canvas
class Canvas {
  constructor(id, width, height, backgroundColor = "#000000") {
    this.id = id;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
    this.gridColor = '#FFFFFF';
    this.getWidth();
    this.getHeight();
    this._getCtx();
    
    // Cria o elemento canvas no DOM
    this.element = document.createElement('canvas');
    this.element.id = this.id;
    this.element.width = this.width;
    this.element.height = this.height;
    this.element.style.backgroundColor = this.backgroundColor;
    
    // Obtém o contexto do canvas
    this.ctx = this.element.getContext('2d');
    

    //this.centralize();
    this.grid();
    
    // Define a margin e o padding do body para 0
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.background = '#000000';
    
    // Adiciona o elemento canvas ao body
    document.body.appendChild(this.element);
  }
  
  _getCtx() {
      const ctxt = this.ctx;
    }
  
  // Obtém a largura do canvas
  getWidth() {
    return this.width;
  }
  
  // Obtém a altura do canvas
  getHeight() {
    return this.height;
  }

/*
  // Define a origem das coordenadas para o centro da tela
  centralize() {
    this.ctx.translate(this.width / 2, this.height / 2);
    // Invete o eixo Y
    this.ctx.scale(1, -1);
  }
  */

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

/*
// Exemplo de uso
setFavicon('player.png');
*/
// Cria um canvas
let canvas = new Canvas('canvas', window.innerWidth, window.innerHeight);
setCanvas('canvas');

function setCanvas(id) {
  canvasID = document.getElementById(id);
  ctx = canvasID.getContext('2d');
}

// Função que limpa o canvas
function cls() {
  /*let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');*/
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Função para carregar os recursos do jogo
window.onload = function() {
  onLoad();

  // Função para atualizar e desenhar os recursos do jogo
  function update() {
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
  update();
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
  constructor(sprite, width, height, X, Y, canvas) {
    this.sprite = new Image();
    this.sprite.src = sprite;
    this.width = width;
    this.height = height;
    this.x = X - this.width / 2;
    this.y = Y - this.height / 2;
    this.canvas = canvas;
    this.ctxt = canvas.ctx;
    this.display();
  }

  display() {
    this.ctxt.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
}

// Classe que cria um botão
class btn {
  constructor(type, width, height, x, y, color, fill, canvas) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.color = color;
    this.fill = fill;
    this.canvas = canvas;
    this.ctxt = canvas.ctx;
    this.display();
    /*this.onTouch();*/
  }

  display() {
    switch (this.type) {
      case "circ":
        this._desenharCirculo(this.ctxt);
        break;
      case "quad":
        this._desenharQuadradoArredondado(this.ctxt);
        break;
    }
  }
  
  
  /*
  // Função para lidar com o evento de touch no botão
  onTouch(callback) {
    this.ontouchstart = () => {
      callback(); // Chama a função de callback passada como parâmetro
    }
  }
  */


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

/*
function setCanvas() {
  this.canvas = document.getElementById('canvas');
}
*/

// Classe que cria um círculo 
class circ {
  constructor(radius, x, y, fill, color, canvas) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.fill = fill;
    this.color = color;
    this.canvas = canvas;
    this.ctxt = canvas.ctx;
    this.display();
    /*this.onTouch();*/
  }

  display() {
    this.ctxt.beginPath();
    this.ctxt.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    if (this.fill) {
      this.ctxt.fillStyle = this.color;
      this.ctxt.fill();
    } else {
      this.ctxt.strokeStyle = this.color;
      this.ctxt.stroke();
    }
  }
  
  isInside(x, y) {
    const distance = Math.sqrt((x - this.x) ** 2 + (y - this.y) ** 2);
    return distance <= this.radius;
  }
  
  /*setCanvas()*/
  
  
  
  /*
  let canvas = this.canvas;
    // Adiciona evento touchstart ao canvas
  canvas.addEventListener('touchstart', (event) => {
      const touchX = event.changedTouches[0].clientX - canvas.offsetLeft;
      const touchY = event.changedTouches[0].clientY - canvas.offsetTop;

      if (this.isInside(touchX, touchY)) {
        // Chame sua função de callback aqui
        onTouch()
        console.log('Toque no círculo!');
      }
  });
  */
  
  
  
  
  /*
  setCanvas(canvas) {
    this.canvas = canvas;
    this._setupTouchEvents();
  }
  */
  /*
  onTouch(callback) {
    this.ontouchstart = () => {

      if (this.isInside(mouseX, mouseY)) {
        callback(); // Chama a função de callback passada como parâmetro
      }
    }
  }
  */


/*
 onTouch(callback) {
    // No listener attached directly to the canvas
    // Leverage the update loop for touch detection
    let isTouching = false;
    let lastTouchX;
    let lastTouchY;
    
    function handleTouchStart(event) {
      if (event.type === 'touchstart') {
        const touchX = event.touches[0].clientX - canvas.offsetLeft;
        const touchY = event.touches[0].clientY - canvas.offsetTop;
        isTouching = this.isInside(touchX, touchY);
        lastTouchX = touchX;
        lastTouchY = touchY;
        console.log(isTouching)
      }
    }
    
    function handleTouchMove(event) {
      if (event.type === 'touchmove' && isTouching) {
        const touchX = event.touches[0].clientX - canvas.offsetLeft;
        const touchY = event.touches[0].clientY - canvas.offsetTop;
        // Check if touch moved outside the circle during move
        if (!this.isInside(touchX, touchY)) {
          console.log(isTouching);
          isTouching = false;
        }
      }
    }
    
    function handleTouchEnd(event) {
      if (event.type === 'touchend' && isTouching) {
        // Trigger callback only if touch started and ended inside the circle
        callback();
        console.log(isTouching);
        isTouching = false;
      }
    }
    
    window.addEventListener('touchstart', handleTouchStart.bind(this));
    window.addEventListener('touchmove', handleTouchMove.bind(this));
    window.addEventListener('touchend', handleTouchEnd.bind(this));
  }
*/

}


// Função que exibe um texto na tela
function print(text, x, y, size, font, color = "white") {
  /*let myCanvas = document.getElementById('canvas');
  let ctx = myCanvas.getContext('2d');*/
  if (!text) {
    console.error("O parâmetro 'text' não pode ser vazio");
  }

  ctx.font = `${size}px ${font}`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

