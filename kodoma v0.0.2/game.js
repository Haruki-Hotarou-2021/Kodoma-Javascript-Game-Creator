// Função que carrega os recursos do jogo
function onLoad() {
  // Criar a variável sem usar var, let ou const
  text = 'Hello World!';

  // Carregar o sprite do player
  player = new Spr('/../player.png', 50, 50, 200, 100);
  
  // Carregar um retângulo
  rect = new Rect(50, 200, 50, 50, "green");
  
  // Carregar um retangulo do tipo line
  rectb = new Rect(50, 255, 50, 50, "red", 'line');
  
  //Carregar um círculo do tipo line
  circ = new Circ(canvas.width - 50, 200, 20, 'blue', 'line');

  arc = new Arc(canvas.width - 50, 250, 20, 90, 270, 'green');

}


// Função que desenha e atualiza os recursos do jogo
function onGame() {
  
  // Exibe o grid
  canvas.grid();
  
  // Exibe um texto na tela
  printf(text, 20, 50, 14, 'red', 'Times New Roman',)
  
  // Desenha o sprite do player
  player.display();
  
  // Espera uma quantidade de segundos e executa a função mudarTexto
  wait(5, mudarTexto);
  
  // Detecta toque no sprite do player e executar a função move()
  player.touchStart(move);
  
  // Desenha o retângulo
  rect.display();
  
  // Desenha o retângulo do tipo line
  rectb.display();
  
  // Desenha o círculo do tipo line
  circ.display();
  
  arc.display()
  
}

// Função que será chamada após a espera
function mudarTexto() {
  text = 'Hey Devs! Have a nice coding!';
}

// Função para o player mover o círculo
function move() {
console.log('Touching');
circ.y += 1;
}

// Função de configuração do jogo
function config() {
  setTitle('MyGame');
  setFavicon('/../player.png');
  canvas.backgroundColor = 'white';
}