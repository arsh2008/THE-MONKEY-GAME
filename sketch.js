var ground;
var monkey,walk,stop;
var obstacleGroup,bananaGroup;
var background1,jungleimg,bananaimg,stoneimg;
var food,obstacle;
function preload (){
jungleimg = loadImage("jungle.jpg");
bananaimg = loadImage("banana.png");
stoneimg = loadImage("stone.png");
walk = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png");

stop = loadImage("Monkey_03.png");
} 

function setup() {
createCanvas(400, 400);
  

background1 = createSprite(200,200,400,400);
background1.addImage("background",jungleimg);
background1.velocityX=-3
background1.x = background1.width /2;
  
  
ground = createSprite(0, 370,800,20);
ground.visible=false;
  
monkey = createSprite(120, 340,5,5);
monkey.addAnimation("monkey",walk);
monkey.scale=0.1;

obstacleGroup = new Group ();
bananaGroup = new Group ();
}

function draw() {
  background("white");
  
  var survivaltime=0;
stroke("white")
textSize(20);
fill("white")
survivaltime =Math.ceil(frameCount/frameRate())
text("survivaltime: "+survivaltime,100,50);
  
  
  if (keyDown("space") && monkey.y >= 300) {
monkey.velocityY=-15;  
}  
  
if (background1.x < 0){
background1.x = background1.width/2;
}  
  
//giving Gravity
 monkey.velocityY = monkey.velocityY+0.5;   

//calling function food  
spawnfood();

//calling function spawnObstacles
spawnObstacles()
 
if (monkey.isTouching(bananaGroup))
{
survivaltime = survivaltime+2;
food.visible=false;

} 
switch (survivaltime){

  case 20: monkey.scale=0.12;
     break;
  case 40: monkey.scale=0.14;
    break;
   case 60: monkey.scale=0.16;
    break;
  case 80: monkey.scale=0.18;
     break;
}
  if (monkey.isTouching(obstacleGroup))
{
monkey.addImage(stop);
background1.velocityX=0;
obstacleGroup.setLifetimeEach(-1);
bananaGroup.setLifetimeEach(-1);
obstacle.velocityX=0;
food.velocityX=0;
survivaltime=0;
} 
monkey.collide(ground);
    
drawSprites();
  
}
  
  
function spawnfood() {
  //write code here to spawn the clouds
  if (World.frameCount % 80 === 0) {
    food = createSprite(400,320,40,10);
    food.y = random (120,200);
    food .addImage("Banana",bananaimg);
    food.scale = 0.05;
    food .velocityX = -4;
    
     //assign lifetime to the variable
    food.lifetime = 134;
    
   food.depth =  monkey.depth;
    monkey.depth =   monkey.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(food);
  }
  
}

function spawnObstacles() {
  if(World.frameCount % 300 === 0) {
   obstacle = createSprite(400,340,10,40);
    obstacle.velocityX = -4;
    
    //giving animation  to obstacles
    obstacle.addImage("Stone",stoneimg);
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstacleGroup.add(obstacle);
  }
}
  
  
  
  
  