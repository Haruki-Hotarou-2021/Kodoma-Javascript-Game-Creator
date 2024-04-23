// Função para carregar os recursos do jogo
window.load = function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  onload();
};

// Função para atualizar e desenhar os recursos do jogo
function animate() {
  let lastTime = 0;
  function loop(timestamp) {
    const dt = timestamp - lastTime;
    cls(ctx); // Passa o contexto como parâmetro para a função cls
    onGame(dt);
    lastTime = timestamp;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

animate();

// Função que limpa o canvas
function cls(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function getWidth() {
  return canvas.width;
}

function getHeight() {
  return canvas.height;
}

function wait(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    throw new Error("O parâmetro 'seconds' deve ser um número não negativo");
  }

  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
}

// Classe que irá criar um sprite
class spr {
  constructor(sprite, width, height, x, y) {
    this.sprite = new Image();
    this.sprite.src = sprite;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.display();
  }

  display() {
    ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
  }
}

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
        this._desenharCirculo(ctx);
        break;
      case "quad":
        this._desenharQuadradoArredondado(ctx);
        break;
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

class circ {
  constructor(radius, x, y, fill, color) {
    this.radius = radius;
    this.x = x;
    this.y = y;
    this.fill = fill;
    this.color = color;
    this.display();
  }

  display() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    if (this.fill) {
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      ctx.strokeStyle = this.color;
      ctx.stroke();
    }
  }
}



function print(text, x, y, size, font, color = "black") {
  if (!text) {
    throw new Error("O parâmetro 'text' não pode ser vazio");
  }

  ctx.font = `${size}px ${font}`;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}
