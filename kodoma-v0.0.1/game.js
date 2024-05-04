// Cria as variáveis x e y
x = 20
y = 50


// Função que desenha e atualiza os recursos do jogo
function onGame(dt) {
  
  // Cria as variáveis com propriedades do canvas (Propriedades do jogo só podem ser chamadas dentro de onGame)
  // Pega as coordenadas do centro da tela
  cX = canvas.width / 2;
  cY = canvas.height / 2;
  
  // Limpa a tela (Deve ser chamada antes de desenhar os objetos na tela)
  cls();
  
  // Desenha um grid (Deve ser chamado logo abaixo da função cls)
  canvas.grid();
  
  // Exibe um texto na tela
  print('Hello World!', cX + 100, cY, 14, 'black', 'Dancing Script');
  
  // Acrescenta 1 à variável y
  y += 1;
  
  // Desenha um sprite
  spr('/../player.png', 50, 50, x, y, false);
  
  // Desenha um retângulo
  rect(50, 50, 30, 30, 'green');
  
  // Desenha um retângulo do tipo line
  rect(100, 50, 30, 30, 'red', 'line');
  
  // Desenha um circulo do tipo line
  circ(180, 400, 50, 'blue', 'line');
  
  // Desenha uma linha
  line(0, cY, 300, 100, 'rose');
  
  // Define a variável para a largura da tela
  x1 = canvas.width;
  
  // Desenha um triângulo
  tri(x1 - 50, 0, x1, 100, x1 - 100, 100, 'green', 'fill');
  
  // Desenha um arco
  arc(100, 250, 50, 90, 270, 'cyan');
  
  curve(x, y, cX, cY, 125, 100);
  
  elli(100, 250, 55, 10, 'darkblue');
  
}


// Função de configuração do sistema
function config() {
  
  // Define o título da página
  setTitle('My First Game');
  
  // Define o Favicon (O pequeno ícone no topo da aba do navegador)
  setFavicon('/../player.png')
  
  // Define a cor de fundo do canvas antes de ser criado (Esta é uma propriedade que deve ser alterada antes do canvas ser criado, só poderá ser chamada dentro de config)
  canvas.backgroundColor = '#ffffff';
  
  /**
  * Propriedades que devem ser alteradas antes do canvas ser criado serão chamadas aqui
  * Exemplo1 canvas.width = 300;
  * Exemplo2 canvas.height = 150;
  * Exemplo3 canvas.backgroundColor = 'white';
  */
}