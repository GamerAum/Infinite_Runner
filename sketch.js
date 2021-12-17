var jumpingAnimation,runningAnimation;
var gameBackground,bg,runner;
var obstacle,obstacleIMG;
var mushroom,mushroomIMG;
var obstaclesGroup,mushroomsGroup;
var PLAY=1;
var gameState=PLAY;
var END=0;

function preload(){
gameBackground = loadImage('bg.jpg');
jumpingAnimation = loadAnimation(
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump00.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump01.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump02.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump03.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump04.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump05.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump06.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump07.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump08.png',     
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/jump09.png'    
);
runningAnimation = loadAnimation(
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run00.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run01.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run02.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run03.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run04.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run05.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run06.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run07.png', 
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run08.png',     
  'https://la-wit.github.io/build-an-infinite-runner/build/images/sprites/purpleNinja/run09.png'    
);
  mushroomIMG=loadImage('mushroom.png');
  obstacleIMG=loadImage('Obstacle.png');
  
}

function setup() {
createCanvas(1000,800);
bg=createSprite(140,200,450,450);
bg.addImage(gameBackground)
bg.scale=1.7
runner=createSprite(50,330,25,40);
runner.depth=4;
runner.addAnimation('jump', jumpingAnimation);
runner.addAnimation('run', runningAnimation);
runner.setCollider("rectangle", 0,0,10,41);
obstaclesGroup=new Group()
mushroomsGroup=new Group()
invisibleGround = createSprite(200,360,400,10);
invisibleGround.visible = false;
}

function draw() {
background();
  if(gameState===PLAY){
    bg.velocityX=-6
    if(keyDown('space')){
      runner.velocityY=-5
    }
    runner.velocityY=runner.velocityY+0.8;
    if(bg.x<0){
      bg.x=bg.width/2;
    }
    createObstacle();
    createMushroom();
    if(obstaclesGroup.isTouching(runner)){
      gameState=END;
    }
  }
  else if(gameState===END){
    bg.velocityX=0;
    runner.velocityY=0;
    obstaclesGroup.setVelocityXEach(0);
    mushroomsGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    mushroomsGroup.setLifetimeEach(-1);
  }
  runner.collide(invisibleGround)
  drawSprites();
}

function createObstacle() {
  //write code here to spawn the obstacle
  if (frameCount % 60 === 0) {
    obstacle = createSprite(370,330,40,10);
    obstacle.addImage(obstacleIMG);
    obstacle.scale = 0.03;
    obstacle.velocityX = -3;
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
    
    //adding cloud to the group
   obstaclesGroup.add(obstacle);
    }
}

function createMushroom() {
  //write code here to spawn the mushroom
  if (frameCount % 80 === 0) {
    mushroom = createSprite(360,330,40,10);
    mushroom.addImage(mushroomIMG);
    mushroom.scale = 3;
    mushroom.velocityX = -3;
    
     //assign lifetime to the variable
    mushroom.lifetime = 200;
    
    
    //adding cloud to the group
   mushroomsGroup.add(mushroom);
    }
}