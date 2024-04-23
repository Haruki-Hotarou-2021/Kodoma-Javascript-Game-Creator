function onLoad() {
  setTitle('My Game');
  player = new spr('player.png', 100, 100, 50, 50);
  cX = canvas.getWidth() / 2;
  cY = canvas.getHeight() / 2;
}

function onGame() {
  print('Hello World', cX, cY, 14, 'Arial')
  player.y += 1;
  player.display();
}