# Kodoma - JS Game Creator 

> kodoma - JS Game Creator (v0.0.1) <br>
Is Inspired On TIC-80

> kodoma - JS Game Creator (v0.0.2) <br>
Is Inspired On LÖVE

## Kodoma v0.0.2
kodoma é um framework de jogos JavaScript 2D leve e fácil de usar, projetado para ajudar desenvolvedores iniciantes a criar jogos simples.
Documentação

Este README fornece uma visão geral do framework e documenta suas funções e classes principais. Para começar a usar o kodoma, siga estas etapas:

#### Inclusão: 
Adicione o arquivo kodoma.js ao seu projeto HTML, abaixo do arquivo do seu jogo:

```html
<script src="game.js"></script>
<script src="kodoma.js"></script>
```

## Funções do Jogo:

`onLoad()`: Função chamada quando o documento é carregado. <br>
Use-a para inicializar recursos do jogo como sprites, sons, etc.

`onGame(dt)`: Função chamada em cada frame do jogo. <br>
Use-a para atualizar a lógica do jogo e desenhar na tela. <br>
O parâmetro `dt` representa o tempo decorrido desde o último frame (em segundos).

`cls()`: Limpa o canvas, apagando o conteúdo desenhado anteriormente.

## Desenho:

`print(text, x, y, size, color)`: Exibe texto na tela com as coordenadas, tamanho e cor especificados.<br>
Obs. A cor padrão é branco.

`spr`: Classe para criar sprites a partir de imagens.


###### Exemplo de uso:
```javascript
// Função onLoad para carregar recursos
function onLoad() {
    // Define o Título da página e o FavIcon
    setTitle("Meu Primeiro Jogo");
    setFavicon("caminho/para/favicon.png");

    // Criar as variáveis (Sem usar var, let ou const)
    largura = 50;
    altura = 50;
    x = 150;
    y = 200;
    text = "Hey Devs!"
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;

    // Carregar sprites
    player = new spr("caminho/para/sua/imagem.png", largura, altura, x, y)
}

// Função onGame para atualizar e desenhar o jogo
function onGame(dt) {
  // Lógica do jogo e desenho na tela

  // Exibe um texto na tela 
  print("Hello, kodoma!", 100, 100, 24, "red");
  print(text, centerX, centerY, 24);

  // Desenha o sprite do player na tela
  player.display();
}
```

## Funções Úteis

`setTitle(title)`: Define o título da página da web.

`setFavicon(url)`: Define o favicon da página da web (o pequeno ícone na aba do navegador).

`wait(seconds, callback)`: Aguarda um determinado número de segundos e então executa a função de callback.

## Classes

`spr`: Classe para criar sprites a partir de imagens.

`new spr(sprite, width, height, X, Y)`: Quando atribuido à uma variável cria uma instância do sprite.

`sprite`: Caminho para a imagem do sprite.

`width`: Largura do sprite (em pixels).

`height`: Altura do sprite (em pixels).

`X`: Posição X do centro do sprite (em pixels).

`Y`: Posição Y do centro do sprite (em pixels).

### Métodos:

`display()`: Desenha o sprite na tela.

`onTouch(callback)`: Adiciona evento de toque (tocar e soltar) ao sprite.

# Licença

### MIT

Este documento fornece uma introdução básica ao kodoma. Para explorar todos os recursos do framework, consulte o código fonte e experimente com diferentes funcionalidades.