let trex_running;
let groundImage;
let cloudImage;
let trex;
let ground;
let cloud;
let ground2;
let bird;
let b;
let obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
let obstaclesGroup;
let trexCollided;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
let cloudGroup;
function preload() {
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  groundImage = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  bird = loadImage("bird.png");
  trexCollided = loadImage("trex_collided.png");

}
function setup() {
  createCanvas(1000, 500);
  trex = createSprite(50, 250, 20, 20);
  trex.addAnimation("running", trex_running);
  ground = createSprite(50, 485, 2000, 20);
  ground.visible = false;
  ground2 = createSprite(50, 485, 2000, 2);
  ground2.shapeColor = "Grey";
  ground2.addImage(groundImage);
  obstaclesGroup = new Group();
  cloudGroup=new Group();
}
function draw() {
  background("White");
  if (gameState == PLAY) {
    if (ground2.x < 0) {
      ground2.x = ground2.width / 2;
    }
    if (keyDown("space") && trex.y >= 400) {
      trex.velocityY = -10;
    }
    trex.velocityY += 0.5;
    ground2.velocityX = -10;
    spawnClouds();
    spawnObstacles();
    if (obstaclesGroup.isTouching(trex)) {
      gameState=END;
    }
  }
  elseif(gameState==END){
    ground2.velocityX=0;
    trex.velocityY=0;
    obstaclesGroup.setVelocityEach(0);
    cloudGroup.setVelocityEach(0);
    
  }
  trex.collide(ground);
  drawSprites();
}
function spawnClouds() {
  if (frameCount % 80 == 0) {
    cloud = createSprite(1000, 100, 200, 50);
    b = createSprite(0, 150, 10, 10);
    b.addImage(bird);
    cloud.addImage(cloudImage);
    cloud.scale = random(0.7, 1.5);
    b.scale = random(0.1, 0.3);
    b.y = Math.round(random(10, 100));
    cloud.y = Math.round(random(10, 100));
    cloud.velocityX = -10;
    b.velocityX = 5;
    cloud.depth = trex.depth;
    trex.depth += 1;
    cloud.lifetime = 200;
    b.lifetime = 200;
  }
  cloudGroup.add(cloud);
}

function spawnObstacles() {
  if (frameCount % 50 == 0) {
    var obstacle = createSprite(1100, 435, 100, 100);
    obstacle.velocityX = -10;

    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break;
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
    }
    obstaclesGroup.add(obstacle);
  }
}
