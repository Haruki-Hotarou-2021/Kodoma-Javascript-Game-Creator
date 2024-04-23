function onLoad() {
  setTitle('My Game');
  player = new spr('player.png', 100, 100, 50, 50);
  cX = canvas.getWidth() / 2;
  cY = canvas.getHeight() / 2;
  circle = new circ(50, cX, 150, 'fill', 'green');
}

function onGame() {
  print(player.y, cX, cY, 14, 'Arial')
  player.display();
  circle.onTouch(down);
  circle.display();
}

// Função que foi passada como parâmetro neste caso
function down() {
  player.y += 1; // Lógica para mover o jogador para baixo
}