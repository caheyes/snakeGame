let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32; //cada pixel do jogo (quadradinhos), equivalem 32px
let snake = []; //array sendo criado
//criando posições da cobrinha inserindo o que vai ter dentro do array
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";//direção do jogo
//criando posições da comida
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box, //math.floor retira a parte flutuante do math.random. math.random() gerando número aleatórios para diferente posições
    y: Math.floor(Math.random() * 15 + 1) * box //Math.floor retira a parte flutuante (0.1)
}

function criarBG(){
    context.fillStyle = "lightgreen"; //fillStyele trabalha com o contexto, ele está deixando o fundo verde
    context.fillRect(0, 0, 16 * box, 16 * box);//fillRect desenha o retangulo, trabalha com quatros parametros
    
}

function criarCobrinha(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box)
    }
}

function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update); //keydown evento de click e vai chamar a função update

//cada numeração como por exemplo o 37, significa uma tecla do meu teclado. Ela é a tecla da direita.

/* Numeração de cada botão:

37 = esquerda
38 = descer
39 = direita
40 = subir
*/

function update (event){
    if(event.keyCode == 37 && direction !="right") direction = "left"; //caso o evento do código for igual a 37, a cobrinha irá para a esquerda. A direção não pode ser igual a direita, pq se não a snake teria duas cabeças. Sendo assim ela não poderá virar a direita, somente esquerda.
    if(event.keyCode == 38 && direction !="down") direction = "up";
    if(event.keyCode == 39 && direction !="left") direction = "right";
    if(event.keyCode == 40 && direction !="up") direction = "down";
    
}

function iniciarJogo(){

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0; //se snake (cabeça da cobra) do eixo x for maior que 15 (tamanho da box é 16) e a direção dela for direita, a cabeça da cobra será inicia na posição 0 (indo para o outro lado da tela e continuando na mesma linha)
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box; //se snake (cabeça da cobra) do eixo x for menor que 0 e a direção dela for esquerda, a cabeça da cobra será inicia na posição 16 (indo para o outro lado da tela e continuando na mesma linha)
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0; //se snake (cabeça da cobra) do eixo y for menor que 0 e a direção dela for descer, a cabeça da cobra será inicia na posição 16 (indo para o outro lado da tela e continuando na mesma linha)
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box; //se snake (cabeça da cobra) do eixo y for maior que 15 (tamanho da box é 16) e a direção dela for subir, a cabeça da cobra será inicia na posição 0 (indo para o outro lado da tela e continuando na mesma linha)

//a head encosta no body da snake
    for(i=1; i<snake.length; i++){ //snake.length seria o tamanho do array
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){ //se a cabeça for a mesma posição do array(corpo)
            clearInterval(jogo); //parando a função jogo;
            alert('GameOver :(');
        }
    }
   
    criarBG(); //chamando a função para renderizar no navegador
    criarCobrinha();
    drawFood();

    let snakeX = snake[0].x; //array posição 0 de x 
    let snakeY = snake[0].y; //array posição 0 de y

    if(direction == "right") snakeX += box;// caso a direção for direita, irá acrescentar um quadradinho (box) a mais
    if(direction == "left") snakeX -= box; //caso direção for esquerda, irá diminuir o valor fazendo a snake ir para a esquerda. Direções igual um plano cartesiano 
    if(direction == "up") snakeY -= box; // caso a direção for para cima, irá acrescentar um quadradinho (box) para subir
    if(direction == "down") snakeY += box; // caso direção for para abaixo, irá diminuir o valor fazendo a snake descer

    //fazendo a skane comer a food
    if(snakeX != food.x || snakeY != food.y){ //se a cabeça da cobra está na posição X e não for igual da comida posição X / cabeça da cobra na posição Y não for igual da comida posição Y 
        snake.pop(); //retira o último elemento do array, que seria da cobrinha. A cobrinha perderia uma parte do cumprimento ao ter uma posição diferente entre a cabeça e a comida. Caso cobra atinge outro elemento perde o corpo

        //caso a cabeça da cobra acerte a mesma posição da food, irá ser acrescentado um novo elemento na box deixando a cobrinha maior.
    }
    else{
        food.x = Math.floor(Math.random() * 15 + 1) * box, // assim que a snake acerta a mesma posição da comida, gera uma nova comidinha em uma outra box diferente
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY,
    }
    snake.unshift(newHead);
}

let jogo = setInterval(iniciarJogo, 100); //passando um mile segundo para está sendo renovada e dá continuidade ao jogo sem ele travar