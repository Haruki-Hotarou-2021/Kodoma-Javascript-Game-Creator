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
    clearCanvas(ctx); // Passa o contexto como parâmetro para a função clearCanvas
    onGame(dt);
    lastTime = timestamp;
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
}

animate();

function clearCanvas(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
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