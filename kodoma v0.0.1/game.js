function onLoad() {
  // Define o título da página 
  setTitle('My Game');
  
  // Define o favicon da página
  setFavicon('player.png');

/*
  // Cria um canvas
  let canvas = new Canvas('canvas', window.innerWidth, window.innerHeight);
  setCanvas('canvas');
*/
  
  cX = canvas.getWidth() / 2;
  cY = canvas.getHeight() / 2;
  btnX = canvas.getWidth() * 0.85;
  btnY = canvas.getHeight() * 0.85;
  //player = new spr('player.png', 45, 45, cX, cY);
  btn = new circ(30, cX, 50, 'fill', 'green', canvas);
  /*btn.onTouch(down);*/
}

function onGame(dt) {
  //print(`Player X: ${player.x}`, 20, 20, 14, 'Arial');
  //print(`Player Y: ${player.y}`, 20, 40, 14, 'Arial');
  print(`FPS: ${dt}`, 20, 60, 14, 'Arial', canvas);
  //player.display();
  
  btn.display();
  
  
  /*
  // Define a função de callback para o evento de toque
  btn.onTouch(() => {
  console.log("Toque detectado no círculo!");
});
*/

  //canvas.grid();
  
}

// Função que foi passada como parâmetro neste caso
function down() {
  //player.y += 1; // Lógica para mover o jogador para baixo
  console.log('Sucess');
}

