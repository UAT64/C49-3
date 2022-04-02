let ground;
let lander;
var lander_img;
var bg_img;
var bg2_img;
var stage1img
var stage2img
var rock1,rock2,rock3,rock4,rock5
var rockGroup
var heightAboveMoon = 1000
var gameState = 0
var stage2
var moonGround
var explosion
var lander_landed
var replay_button, replay
var over, overImg
var win, winImg
var start, startImg, begin
var rocket_plume, rocket_plume_sprite
var bg_music
var rocket_sound
var explosion_sound
var instructions, instructionsImg


var vx = 0;
var g = 0.05;
var vy = 0;

function preload()
{
  lander_img = loadAnimation("normal.png");
  lander_landed = loadAnimation("ended.png")
  rock1 = loadImage("rock1.png")
  rock2 = loadImage("rock2.png")
  rock3 = loadImage("rock3.png")
  rock4 = loadImage("rock4.png")
  rock5 = loadImage("rock5.png")
  bg_img = loadImage("First_Stage.png");
  bg2_img = loadImage("Final_Stage.png")
  explosion = loadAnimation("explode_01.png","explode_02.png","explode_03.png","explode_04.png","explode_05.png","explode_06.png","explode_07.png")
  winImg = loadImage("YouWin_Header.png")
  overImg = loadImage("YouLose_Header.png")
  replay_button = loadImage("Replay_BTN.png")
  startImg = loadImage("Start_BTN.png")
  rocket_plume = loadAnimation("engine_firing.png")
  bg_music = loadSound("gredghrd.mp3")
  rocket_sound = loadSound("VASIMRLoop01.wav")
  explosion_sound = loadSound("fireworks_explosion_3.wav")
  instructionsImg = loadImage("Instructions.png")




}

function setup() {
  createCanvas(600, windowHeight)
  frameRate(80);
  bg_music.play()
  bg_music.setVolume(0.5)


  

  rockGroup=new Group()

  stage1img = createSprite(300,width/2,width, height)
  stage1img.addImage("stage1",bg_img)

  stage2 = createSprite(300,width/2,width, height)


  lander = createSprite(300,200,50,50);
  lander.addAnimation("lander",lander_img);
  lander.addAnimation("explosion",explosion)
  lander.addAnimation("landed",lander_landed)
  lander.addAnimation("engine",rocket_plume)

  //rocket_plume_sprite = createSprite(lander.position.x, lander.position.y, 10, 60)
  //rocket_plume_sprite.visible = false
 
  lander.scale = 0.1;
  rectMode(CENTER);
  textSize(15)

  //replay_button = createSprite(300,400)
  //replay_button.addImage(restart_image)
  //replay_button.scale = 0.5


  //game_over = createSprite(300,50)
  //game_over.addImage(game_over_image)
  //game_over.scale = 0.8
  
  replay = createSprite(300, windowHeight - 200, 20, 20)
  replay.addImage(replay_button)
  replay.visible = false
  replay.scale = 0.75

  start = createSprite(300,windowHeight - 400)
  start.addImage(startImg)
  start.visible = false

  instructions = createSprite(300,300)
  instructions.addImage(instructionsImg)
  instructions.scale = 0.7
  instructions.visible = false

  win = createSprite(300, windowHeight - 400)
  win.addImage(winImg)
  win.visible = false

  over = createSprite(300, windowHeight - 400)
  over.addImage(overImg)
  over.visible = false
}

function draw() {
  console.log("Gamestate:",gameState)
  if (gameState===0){
    stage2.visible = false
    console.log("gamestate 0")
    background("green");
    lander.visible = false
    text.visible = false

    //start = createSprite(300,windowHeight - 200)
    //start.addImage(startImg)
    start.visible = true

    //instructions = createSprite(300,300)
    //instructions.addImage(instructionsImg)
    //instructions.scale = 0.7
    instructions.visible = true
    

    if(lander.x > 551){
      lander.x = 550
      }
      if(lander.x < 50){
      lander.x = 51
      }
    
  
    if (mousePressedOver(start)){
      start.visible = false
      instructions.visible = false
      console.log("Start Button Pressed")
      gameState=1
    }
  }
  if(gameState === 1){
    
    
    

    lander.visible = true
    lander.changeAnimation(lander)
    stage2.visible = false

    if(lander.x > 551){
    lander.x = 550
    }
    if(lander.x < 50){
    lander.x = 51
    }

    if(lander.isTouching(rockGroup)){
      gameState = 4
    }

    rocks()
    background("black");

    if (stage1img.y < -50){
     stage1img.y = stage1img.width/2;
    }

    stage1img.velocityY = -3

    heightAboveMoon -= 1

    if(keyIsDown(RIGHT_ARROW)){
    lander.x += 3
    }
    if(keyIsDown(LEFT_ARROW)){
    lander.x -= 3
    }
  }

  if(gameState === 2){

    

    //canvas.height = 4220
    //canvas.width = 696
    lander.visible = true
    stage2.visible = true

    if(lander.x > 551){
      lander.x = 550
      }
      if(lander.x < 50){
      lander.x = 51
      }

    stage2.addImage("stage2",bg2_img)

    stage2.velocityY = -3

    background("#4747471");
    stage1img

    if(heightAboveMoon == 300){
      stage1img.velocityY = 0
      stage2.velocityY = 0
      //stage2img.velocityY = 0
      lander.velocityY = 3
    }

    if(heightAboveMoon < 300){
      camera.position.y = lander.position.y
      lander.velocityY += 0.10
      stage2.velocityY = 0
      moonGround = createSprite(300,1200,600,50)
      moonGround.visible = false
      heightAboveMoon.visible = false
      //console.log("Moon Ground Y position is:", moonGround.position.y)
      //console.log("Moon Ground X position is:", moonGround.position.x)

      if(moonGround.position.y - lander.position.y <= 50 && lander.velocityY > 5.5){
        gameState = 4
      }
      if(moonGround.position.y - lander.position.y <= 50 && lander.velocityY < 5.5){
        gameState = 3
      }



      lander.collide(moonGround)
      lander.debug = true
      lander.setCollider("rectangle",0,0,25,120)
  
      if(keyIsDown(32)) {
        lander.velocityY -= 0.25
        rocket_sound.play()
        lander.changeAnimation("engine")
        //rocket_plume_sprite.velocityY = lander.velocityY
        //rocket_plume_sprite.addImage(rocket_plume)
        //rocket_plume_sprite.visible = true

      }
      else{
        if(gameState !==4){
          rocket_sound.stop()
          lander.changeAnimation("lander")
        }
      }
      
    }


      console.log("Lander Y velocity is:", lander.velocityY)
      //console.log("Stage2 Y velocity is:", stage2.velocityY)
      //console.log("Lander Y position is:", lander.position.y)
      //console.log("Lander X position is:", lander.position.x)

  

    if(keyIsDown(RIGHT_ARROW)){
      lander.x += 3
      }
    if(keyIsDown(LEFT_ARROW)){
      lander.x -= 3
      }

    if(heightAboveMoon < 300){
      rockGroup.destroyEach()      
      }

      heightAboveMoon -= 0.5

    //if(lander.isTouching(moonGround)){
    //  gameState = 3
    //}

    ///if(moonGround.position.y - lander.position.y <= 50 && lander.velocityY > 1.5){
    //  gameState = 4
    //}

    

    if(rockGroup.isTouching(lander)){
      gameState = 4
    }



  }

  if(gameState === 3){
    lander.changeAnimation("landed")
    lander.velocityY = 0
    console.log("Gamestate:", gameState)
    replay.visible = true
    replay.position.y = windowHeight - 10
    win.position.y = windowHeight - 145
    win.visible = true

    if(mousePressedOver(replay) && gameState === 3){
      restart()
    }
    
  }

  if(gameState === 4){
    console.log("Gamestate:", gameState)
    lander.changeAnimation("explosion")
    lander.scale = 2
    rockGroup.setVelocityEach(0)
    stage1img.velocityY = 0
    over.visible = true
    //explosion_sound.play()

    setTimeout(()=>{
      lander.remove()
      //explosion_sound.stop()
    },450);

    replay.visible = true

    if(mousePressedOver(replay) && gameState === 4){
      restart()
    }
    
    
  }
  
 if(heightAboveMoon < 500){
   gameState = 2
 }





  
/*
  if(lander.x > 551){
    lander.x = 550
  }

  if(lander.x < 50){
    lander.x = 51
  }
*/

  


  //camera.position.y = lander.position.y

  //fall down
  //vy +=g;
  //lander.position.y+=vy;

  //rockGroup.depth = stage1img.depth +1

  drawSprites();
  push()
  fill(255);
  text("Meters above moon:"+heightAboveMoon,350,40)
  pop();
}

function restart(){
  gameState = 0
  //console.log("Restarting")
  replay.visible = false 
  win.visible = false
  over.visible = false
  heightAboveMoon = 1000
  lander.position.x = 300
  lander.position.y = 200
  lander.changeAnimation("lander")
}

function rocks(){
  if(frameCount%70==0){
      rock=createSprite(300,windowHeight + 100,10,10)
      rock.velocityY = -5
      rock.shapeColor = 100
      //rock.addImage(rock1)
      //rock.velocityY=+ (5+distance/5000)
      //rocks.rotation +=15
      rock.x=Math.round(random(50,550))
      var rockran =Math.round(random(1,5))
      switch(rockran){
          case 1:
          rock.addImage(rock1)
          

          break

          case 2:
          rock.addImage(rock2)

          break

          case 3:
          rock.addImage(rock3)
          rock.scale = 0.6
          break

          case 4:
          rock.addImage(rock4)
          rock.scale = 0.6

          break

          case 5:
          rock.addImage(rock5)
          rock.scale = 0.6
          break

          default:
              break
              
      }

      //rock.scale = 1
      
      rockGroup.add(rock)
      //rock.rotation += 180
      rock.debug = false

  }

}
