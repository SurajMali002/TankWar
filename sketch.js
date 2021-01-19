var tank, tank_,p1,pl1,explosionanimation,explosion;
var background0;
var start_screen,play, playimg;
var enemy1,enemygroup1,p1bullets,bulletimg1,p1bullet;
var ground,invisigr;
var gamestate, background00
var bad2;
var p1bullets;
var  scorep1, p1health;
var 0,1,2;
var gameover,restart,overimg,resetimg;
var startsound, gamesound;
gamestate=0
scorep1 = 0
p1health = 10

function preload(){
  tank_ = loadAnimation("tank-0.png","tank-1.png","tank-2.png","tank-3.png","tank-4.png","tank-5.png","tank-6.png","tank-7.png")
  background0 = loadImage("city0.jpg")
  ground_ = loadImage("ground.png")
  p1 = loadImage("player1.png")
  playimg = loadImage("play.png")
  bulletimg1 = loadImage("bullet2.png")
  explosionanimation = loadAnimation("explosion.png")
  bad2 = loadAnimation("villan4-0.png","villan4-1.png","villan4-2.png","villan4-3.png")
  overimg = loadImage("gameover.png")
  resetimg = loadImage("reset.jpg")
  
}
function setup() {
  createCanvas(900, 400);
 
  //make tank
  tank = createSprite(300,310)
  tank.addAnimation("tank",tank_)
  tank.scale=0.8
  //make ground
  ground = createSprite(450,230)
  ground.addImage(ground_)
  ground.scale=1
  //make player1
  pl1 = createSprite(tank.x,tank.y-50)
  pl1.addImage(p1)
  pl1.scale=0.5
  //make gameover
  gameover = createSprite(450,100)
  gameover.addImage(overimg)
  gameover.scale=0.3
  gameover.visible=false
  //make restart
  restart = createSprite(450,250)
  restart.addImage(resetimg)
  restart.scale=0.3
  restart.visible=false
  //makeGroup
  enemygroup1 = new Group()
  p1bullets = new Group()
  //make play 
  play = createSprite(450,200)
  play.addImage(playimg)
  play.visible=false
}

function draw() {
  background(background0);
  edges = createEdgeSprites()
 
  tank.collide(edges)
  fill("white")
  textSize(25)
  stroke("black")
  strokeWeight(5)
  text("Player 1 Score: "+scorep1,680,30)
  text("Player 1 Health: "+p1health,680,60)
  
  
  if (gamestate === 0){
     play.visible=true
    if(mousePressedOver(play)){
      gamestate = 1
    }
   } 
  
  if (gamestate === 1){
    play.visible=false
    ground.velocityX=-5
    if(ground.x<400){
      ground.x=450
    }
    
    pl1.x=tank.x
    pl1.y=tank.y-50
    
    if(frameCount % 90 === 0){
      enemies1()
    }
    
    if(keyDown("right")){
      tank.x=tank.x+5
    } else if(keyDown("left")){
      tank.x=tank.x-5
    } 
       
    if(keyDown("space")){
      bullets1()
    }
    
    if(enemygroup1.isTouching(tank)){
      p1health=p1health-1
      enemygroup1.destroyEach()
    }
    

    if(p1health <= 0){
      gamestate = 2
    }
 }
  
  if(gamestate === 2){  
    
    play.visible=false
   
    pl1.visible=false
    gameover.visible=true
    restart.visible=true
    ground.x=450
    ground.setVelocity(0,0)
    enemygroup1.destroyEach()
    tank.visible=false
   
    if(mousePressedOver(restart)){
       reset()
    }   
  }
  
  drawSprites()
}



function bullets1(){
  if(frameCount % 10 === 0){
    p1bullet = createSprite(tank.x+50,tank.y)
    p1bullet.addImage(bulletimg1)
    p1bullet.scale=0.5
    p1bullet.velocityX=10
    p1bullet.lifetime=30
    p1bullets.add(p1bullet)
    
    if(p1bullets.isTouching(enemygroup1)){
      p1bullets.destroyEach()
      enemygroup1.destroyEach()
      scorep1 = scorep1+6
    }
  }  
}  



function enemies1(){
  if (frameCount % 90 === 0){
    enemy1 = createSprite(900,290)
    enemy1.addAnimation("bad2",bad2)
    enemy1.velocityX=-10
    enemy1.lifetime=1000
    enemygroup1.add(enemy1)
  } 
}


function reset(){
  scorep1=0
  p1health=10
  gamestate = 0
  gameover.visible=false
  restart.visible=false
  tank.visible=true
  pl1.visible=true
}