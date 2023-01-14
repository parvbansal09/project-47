var bg, bgImg
var bottomGround
var topGround
var balloon, balloonImg
var life = 150
var score = 0
var parv = false
var astronaut, astronautImg
function preload(){
bgImg = loadImage("assets/background.jpg")
astronautImg = loadImage("assets/astronaunt png.png")
asteroidImg = loadImage("assets/asteroid.png")
heartImg = loadImage("assets/blueheart.png")
var audio = loadAudio("assets/die.mp3")
}
function play (){
 audio.play();

}
function setup(){
createCanvas (1000,800)
//background image
ground = createSprite(165,485,200,600);
ground.addImage(bgImg);
ground.scale = 1.5

//creating top and bottom grounds
bottomGround = createSprite(200,390,800,20);
bottomGround.visible = false;

topGround = createSprite(200,10,800,20);
topGround.visible = false;
      
//creating balloon     
astronaut = createSprite(100,720,20,50);
astronaut.addImage("astronaut",astronautImg);
astronaut.scale = 0.2;

asteroidGroup = new Group()

 score = 0 

}

function draw() {
  
 
  background("black");
  ground.velocityX = -2;
        if(ground.x < 0){
        ground.x = ground.width/2;
        
        }
          //making the hot air balloon jump
          if(keyDown("UP_ARROW")) {
            astronaut.velocityY = -3 ;
          parv =  true  
          }

          if(keyDown("DOWN_ARROW")) {
            astronaut.velocityY = +3 ;
           parv = false;
          }
          edges = createEdgeSprites(); 
          astronaut.bounceOff(edges)
         
   
          if(life<=0){
           
            astronaut.velocityY = 0;
            ground.velocityX = 0;
            ground.visble = false;
            background("black");
            asteroidGroup.setVelocityXEach(0);
            textSize(100);
            fill("red");
            text("Game Over", 400, 500);
            
            

            swal({
              title: `Game Over`,
              text: "Oops you hit too many asteroids",
              imageUrl:
                "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
              imageSize: "100x100",
              confirmButtonText: "Thanks For Playing"
            },
function (isConfirm){
  if (isConfirm){
    location.reload();
  }
}
            );
            background("black")
          }
       

          //adding gravity
          //astronaut.velocityY = astronaut.velocityY + 2;
      
        drawSprites();
        textSize(15)
        fill("#00BFFF")
        text("Score:"+score,740,40);
          score = score + Math.round(getFrameRate()/60) 
          
        spawnAsteroids();
       if (asteroidGroup.isTouching(astronaut)&& life >= 0){
       life -= 20;
       
      if (parv) {
        astronaut.y += 60;
      } else {
        astronaut.y -= 60;
      }
       }
        
        image(heartImg, 20,20, 20, 20);
        fill("#00BFFF");
        rect(50, 20, life, 20);
        noStroke();
        
        
        }
        

function spawnAsteroids(){
  if (frameCount % 60 === 0) {
    var asteroid = createSprite(width+20,height-300,40,10);
    asteroid.y = Math.round(random(10,900));
    asteroid.addImage(asteroidImg);
    asteroid.scale = 0.2;
    asteroid.velocityX = -6;
    asteroid.depth = astronaut.depth +1; 
    asteroidGroup.add(asteroid)
    asteroid.setCollider('circle',0,0,45)
 if(score >= 500){
asteroid.velocityX = -9


 }

 if(score >= 800){
  asteroid.velocityX = -13
 
}
if(score >= 1000){
  asteroid.velocityX = -15
}
if(score >= 1200){
  asteroid.velocityX = -17 
}
}
}