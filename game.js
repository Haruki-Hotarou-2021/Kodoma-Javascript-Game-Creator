function onLoad() {
  let player = new spr('player.png', w, h, x, y);
  player.x = 10;
  player.y = 20;
}

function onGame() {
  step = player.x + 1;
  player.display();
  player.x = step
}