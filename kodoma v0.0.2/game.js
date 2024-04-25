function onLoad() {
setTitle('MyGame');
player = new spr('/../player.png', 50, 50, 200, 100);
text = 'Hello';
}

function onGame() {
  canvas.grid();
  print(text, 20, 50, 14, 'Arial')
  player.display();
  wait(5, mudarTexto);
  
  player.touchStart(log);
}

function mudarTexto() {
  text = player.y;
}

// Função para mover o player
function log() {
console.log('Touching');
player.y += 1;
}