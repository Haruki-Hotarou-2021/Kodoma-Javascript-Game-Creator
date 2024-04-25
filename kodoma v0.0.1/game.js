x = 20

function onGame(dt) {
  // Define o título da página 
  //setTitle('My Game');
  
  // Define o favicon da página
  //setFavicon('/../player.png');
  
  // Cria as variáveis
  cX = canvas.width / 2;
  cY = canvas.height / 2;
  
  // Limpa a tela
  cls();
  
  // Exibe um texto na tela
  print('Hello World!', cX, cY, 14, 'black', 'Times New Roman');
  
  x += 1;
  // Desenha o sprite
  //spr('/../player.png', 50, 50, x, 50);
  rect(20, 20, 59, 50, 'green');
  rectb(20, 20, 59, 50, 'red');
}


function config() {
  canvas.backgroundColor = '#ffffff';
}
