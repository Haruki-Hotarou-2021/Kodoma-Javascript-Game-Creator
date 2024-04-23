function onLoad() {
  setTitle('My Game');
  
  cX = canvas.getWidth() / 2;
  cY = canvas.getHeight() / 2;
  btnX = canvas.getWidth() * 0.85;
  btnY = canvas.getHeight() * 0.85;
  player = new spr('player.png', 45, 45, cX, cY);
  circle = new circ(30, btnX, btnY, 'fill', 'green');
}

function onGame(dt) {
  print(`Player X: ${player.x}`, 20, 20, 14, 'Arial')
  print(`Player Y: ${player.y}`, 20, 40, 14, 'Arial')
  player.display();
  circle.onTouch(down);
  circle.display();
  
  //canvas.grid();
  
}

// Função que foi passada como parâmetro neste caso
function down() {
  //player.y += 1; // Lógica para mover o jogador para baixo
  console.log('Sucess');
}