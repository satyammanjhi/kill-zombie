
var gameState = 1;
var score = 20;

var player,bullet,bullet1,groza,bg,zombie1,zombie2,Bg,invisibleBoundry;

var bs = 0;

var life = 3;

var gun,gunsound,gameover,restart,gameoverimg,restartimg;

function preload() {
  bullet = loadImage("./assets/bulletA.png");
  bullet1 = loadImage("./assets/bullets.png");
  groza = loadImage("./assets/Gun-removebg-preview.png");
  bg = loadImage("./assets/background2.jpg");
  gameoverimg = loadImage("./assets/gameOver.png");
  restartimg = loadImage("./assets/restart.png");
  zombie1 = loadAnimation("./assets/wz1-removebg-preview.png",
  "./assets/wz2-removebg-preview.png","./assets/wz3-removebg-preview.png",
  "./assets/wz4-removebg-preview.png","./assets/wz5-removebg-preview.png",
  "./assets/wz6-removebg-preview.png","./assets/wz7-removebg-preview.png",
  "./assets/wz8-removebg-preview.png","./assets/wz9-removebg-preview.png",
  "./assets/wz10-removebg-preview.png");

  zombie2 = loadAnimation("./assets/z1-removebg-preview.png","./assets/z2-removebg-preview.png",
  "./assets/z3-removebg-preview.png","./assets/z4-removebg-preview.png","./assets/z5-removebg-preview.png",
  "./assets/z6-removebg-preview.png","./assets/z7-removebg-preview.png","./assets/z8-removebg-preview.png",
  "./assets/z9-removebg-preview.png","./assets/z10-removebg-preview.png","./assets/z11-removebg-preview.png",
  "./assets/z12-removebg-preview.png","./assets/z13-removebg-preview.png","./assets/z14-removebg-preview.png",
  "./assets/z15-removebg-preview.png","./assets/z16-removebg-preview.png","./assets/z17-removebg-preview.png",
  "./assets/z18-removebg-preview.png");

  gunsound = loadSound("gun.mp3");
  backsound = loadSound("Ghost Sound.mp3");
  
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  Bg =createSprite(width/2,height/2,10,10);
  Bg.addImage(bg);
  Bg.scale = 2.5;

  invisibleBoundry = createSprite(width/2 ,height/2+180,1500,10);
  invisibleBoundry.visible = false;
  
  gun = createSprite(width/2 - 550,height/2+250);
  gun.addImage(groza);
  gun.scale = 0.3;

  gameover = createSprite(width/2,height/2 - 250);
  gameover.addImage(gameoverimg);
  gameover.visible = false;

  restart = createSprite(width/2,height/2 );
  restart.addImage(restartimg);
  restart.scale = 0.2;
  restart.visible = false;

  BulletsGroup = new Group();
  zombie1Group = new Group();
  zombie2Group = new Group();
  SbulletGroup = new Group();
 
  
}

function draw() {
  background(255,255,255); 
 
  if(gameState === 1){
   gun.x = mouseX;
   spawnBullets();
   spawnZombie1(); 
   spawnZombie2();

   gameover.visible = false;
   restart.visible = false;
    
    var score = 20;
   
   if(zombie1Group.isTouching(SbulletGroup)){
    SbulletGroup.destroyEach(); 
    zombie1Group.destroyEach();  
    bs = bs+10;
   }

   if(zombie2Group.isTouching(SbulletGroup)){
    SbulletGroup.destroyEach(); 
    zombie2Group.destroyEach();  
    bs = bs+10;
   }

   if(touches.length > 0 || keyWentUp("SPACE")){
    Sbullet();
    gunsound.play();
    score = score-1;
    touches = [];
    }

    if(SbulletGroup.isTouching(BulletsGroup)){
      SbulletGroup.destroyEach();
      BulletsGroup.destroyEach();
      score = score+7;
    }

    if(zombie1Group.isTouching(invisibleBoundry) || 
      zombie2Group.isTouching(invisibleBoundry)){
      gameState = 2;
    }


  }

  if(gameState === 2){
    gameover.visible = true;
    restart.visible = true;
    SbulletGroup.destroyEach();
    zombie1Group.destroyEach();
    zombie2Group.destroyEach();
    BulletsGroup.destroyEach();
    if(mousePressedOver(restart)){
      gameState = 1;
    }
  }


  drawSprites();
  stroke(3);
  textSize(20);
  fill("red");
  text("BULLETS : "+ score,camera.position.x+500,50);

  stroke(3);
  textSize(20);
  fill("red");
  text("score : "+ bs,camera.position.x - 600,50);

  if (score<0){
    ending();
  }

  if(gameState === 3){
    gameover.visible = true;
  }
  
}

function spawnBullets(){
  if(frameCount%600 === 0){
  var bullets = createSprite(random(20,width*1),height/2 - 400,10,10);
  bullets.addImage(bullet1);
  bullets.velocityY = 2.5;
  bullets.scale = 0.5;
  bullets.lifetime = 350;
  BulletsGroup.add(bullets);
  }

}

function spawnZombie1(){
  if(frameCount%150 === 0){
  var zombieA = createSprite(random(100,width*0.7) ,height/2-400,10,10);
  zombieA.velocityY = 2.5;
  zombieA.setCollider("rectangle",20,20);
  zombieA.addAnimation("w",zombie1);
  zombieA.lifetime = 240
  zombie1Group.add(zombieA);
  }
}

function spawnZombie2(){
  if(frameCount%250 === 0){
  var zombieB = createSprite(random(130,width*0.8) ,height/2-400,10,10);
  zombieB.velocityY = 2.5;
  zombieB.addAnimation("w",zombie2);
  zombieB.lifetime = 240;
  zombieB.scale = 0.4;
  zombie2Group.add(zombieB);
  }
}

function Sbullet(){
  var bulletA = createSprite(height/2,height/2+200,10,10);
  bulletA.x = gun.x-20;
  bulletA.setCollider("rectangle",0,0,50,50);
  bulletA.addImage(bullet);
  bulletA.velocityY = -25;
  bulletA.scale = 0.1;
  SbulletGroup.add(bulletA);
}

function ending() {
  gun.visible = false;
  SbulletGroup.destroyEach();
  zombie1Group.destroyEach();
  zombie2Group.destroyEach();
  BulletsGroup.destroyEach();
  stroke(3);
  textSize(30);
  fill("red");
  text(" GAME OVER YOU LOST !! BETTER LUCK NEXT TIME !!  ",width/2-450,height/2);
  gameState = 3;
  
}
