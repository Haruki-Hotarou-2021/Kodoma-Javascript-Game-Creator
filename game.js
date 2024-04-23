function onLoad() {
  setTitle('My Game');
  player = new spr('player.png', 100, 100, 50, 50);
}

function onGame() {
  print('Hello World', 70, 200, 14, 'Arial')
  player.y += 1;
  player.display();
}