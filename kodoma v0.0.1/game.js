// Cria as variáveis x e y
x = 20
y = 50


// Função que desenha e atualiza os recursos do jogo
function onGame(dt) {
  
  // Cria as variáveis com propriedades do canvas
  cX = canvas.width / 2;
  cY = canvas.height / 2;
  
  // Limpa a tela
  cls();
  
  // Exibe um texto na tela
  print('Hello World!', cX, cY, 14, 'black', 'Times New Roman');
  
  // Acrescenta 1 à variável y
  y += 1;
  
  // Desenha um sprite
  spr('/../player.png', 50, 50, x, y);
  
  // Desenha um retângulo
  rect(50, 50, 30, 30, 'green');
  
  // Desenha um retângulo do tipo line
  rect(100, 50, 30, 30, 'red', 'line');
  
  // Desenha um circulo do tipo line
  circ(180, 400, 50, 'blue', 'line');
  
  // Desenha uma linha
  line(cX, cY, x, y, 'green');
  
  // Define a variável para a largura da tela
  x1 = canvas.width;
  
  // Desenha um triângulo
  tri(x1 - 50, 0, x1, 100, x1 - 100, 100, 'green', 'fill');
  
  // Desenha um arco
  arc(100, 250, 50, 90, 270, 'green');
}


// Função de configuração do sistema
function config() {
  
  // Define o título da página
  setTitle('My First Game');
  
  // Define o Favicon (O pequeno ícone no topo da aba do navegador)
  setFavicon('/../player.png')
  
  // Define a cor de fundo do canvas antes de ser criado
  canvas.backgroundColor = '#ffffff';
}
