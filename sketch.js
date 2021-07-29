var PLAY = 1;
var END = 0;
var gameState = PLAY;


var carrot,carrotImg;
var goldenCarrot,goldenCarrotImg;
var rabbit,rabbit_running;
var score = 0;
var ground,groundImg;
var tree,treeImg
var cloud,cloudImg, cloudsGroup;
var snake,snakeImg;
var gameOver, restart;

function preload(){
  rabbit_running =   loadAnimation("images/rabbit1.png","images/rabbit2.png");
  carrotImg = loadImage('images/carrot.png');
  goldenCarrotImg = loadImage('images/goldencarrot.png');
  groundImg = loadImage("images/ground.png");
  cloudImg = loadImage("images/cloud.png")
  treeImg = loadImage("images/tree.png")
  snakeImg = loadImage("images/snake.png");

  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");
}

function setup() {
  createCanvas(600, 600);
  
  ground = createSprite(205, 600,600, 10);
  ground.addImage("ground",groundImg);
  //ground.x = ground.width/2;
  //ground.scale = 0.1;
  

  rabbit = createSprite(50,580,20,20);
  rabbit.addAnimation("rabbit",rabbit_running);
  rabbit.scale = 0.05;
  rabbit.debug = true;
  rabbit.setCollider("rectangle", 0, 0, 40, 250);


  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  
  carrotGroup = new Group();
  goldenCarrotGroup = new Group();
  
  cloudGroup = new Group();
  treeGroup = new Group();
  snakeGroup = new Group();

}
function draw() {
    background("#DDF3F5");
    text("Score: "+ score, 500,50);
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(6 + 3*score/100);
   
    ground.velocityX = -4;

    if(ground.x<0){
      ground.x = ground.width/4;
    }

    if(keyDown("space") && rabbit.y >= 159) {
      rabbit.velocityY = -12;
    }
  
    rabbit.velocityY = rabbit.velocityY + 0.8;

    spawnCarrot();
    spawngoldenCarrot();
    spawnCloud();
    spawntree();
    spawnsnake();

    if(carrotGroup.isTouching(rabbit)){
      carrotGroup.destroyEach();
    }

    if(goldenCarrotGroup.isTouching(rabbit)){
      goldenCarrotGroup.destroyEach();
    }
    if(snakeGroup.isTouching(rabbit)){
      gameState = END;
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    rabbit.velocityY = 0;
    treeGroup.setVelocityXEach(0);
    carrotGroup.setVelocityXEach(0);
    goldenCarrotGroup.setVelocityXEach(0);
    
    //change the rabbit animation
   // rabbit.changeAnimation("collided",rabbit_collided);
    
    //set lifetime of the game objects so that they are never destroyed
    treeGroup.setLifetimeEach(-1);
    cloudGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }

    rabbit.collide(ground);
    
    drawSprites();
  
}

function spawnCarrot(){
  if( frameCount% 200 === 0){
    carrot = createSprite(800,120,30,10);
    carrot.y = Math.round(random(480,520));
    carrot.addImage(carrotImg);
    carrot.scale = 0.06;
    carrot.velocityX = -3;

    //adjust the depth
    carrot.depth = rabbit.depth;
    rabbit.depth = rabbit.depth + 1;

    carrotGroup.add(carrot);
    
  }
}

function spawngoldenCarrot(){
  if( frameCount% 300 === 0){
    goldenCarrot = createSprite(800,120,30,10);
    goldenCarrot.y = Math.round(random(480,520));
    goldenCarrot.addImage(goldenCarrotImg);
    goldenCarrot.scale = 0.3;
    goldenCarrot.velocityX = -3;

    goldenCarrotGroup.add(goldenCarrot);

  }
}

function spawnCloud(){
  //write code here to spawn the clouds
  if (frameCount % 150 === 0) {
    var cloud = createSprite(620,120,40,10);
    cloud.y = Math.round(random(20,160));
    cloud.addImage(cloudImg);
    cloud.scale = 0.15;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 250;
    
    //adjust the depth
    cloud.depth = rabbit.depth;
    rabbit.depth =rabbit.depth + 1;
    
    //add each cloud to the group
    cloudGroup.add(cloud);
  }
}
function spawntree(){
  if( frameCount% 120=== 0){
    tree = createSprite(800,120,30,10);
    tree.y = Math.round((420,420));
    tree.addImage(treeImg);
    tree.scale = 0.3;
    tree.velocityX = -3;

      treeGroup.add(tree);

      tree.depth = rabbit.depth;
      rabbit.depth =rabbit.depth + 1;
      

  }
}
function spawnsnake(){
  if( frameCount% 600=== 0){
    snake = createSprite(800,120,30,10);
    snake.y = Math.round((300,520));
    snake.addImage(snakeImg);
    snake.scale = 0.05;
    snake.velocityX = -3;

      snakeGroup.add(snake);
      }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  treeGroup.destroyEach();
  cloudGroup.destroyEach();
  
  rabbit.changeAnimation("running",rabbit_running);
  
 
  
  score = 0;
  
}
