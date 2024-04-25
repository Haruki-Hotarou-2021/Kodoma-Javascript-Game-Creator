function onGame(dt) {
  // Define o título da página 
  setTitle('My Game');
  
  // Define o favicon da página
  setFavicon('/../player.png');
  print(`FPS: ${dt}`, 20, 60, 14);
  
  cX = canvas.getWidth() / 2;
  cY = canvas.getHeight() / 2;
  btnX = canvas.getWidth() * 0.85;
  btnY = canvas.getHeight() * 0.85;
  
  spr('/../player.png', 50, 50, cX, cY);
  
}