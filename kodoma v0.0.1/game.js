function onGame(dt) {
  // Define o título da página 
  setTitle('My Game');
  
  // Define o favicon da página
  setFavicon('/../player.png');
  print('Hello World!', 20, 60, 14);
  
  cX = canvas.width / 2;
  cY = canvas.height / 2;
  
  spr('/../player.png', 50, 50, cX, cY);
  
}