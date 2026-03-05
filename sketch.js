let p;
let backgrounds;
let gPen;

const grav = 2;
let gravForce;
let num = 21;


//Arrays
let blocks = [];
let snowflakes = [];
let SpecialRocks = [];
let Candies = [];
let SCandies = [];
let Enemies = [];
let BulBags = [];

//Numers and Time
let Time = 0;
let STime = 0;
let CTime = 0;
let GTime = 0;
let score = 0;
let rNum = 0;

let gameStarted = false;

//For the heart's y to decrease at the end
let y;

//Click and win the Penguin Girl at the end
let clicked = false;
//If click but no Rock then Losee
let failclicked = false;
let BossDead = false;
function preload() {
  loadAssets();
  font = loadFont("assets/Arcade.ttf");
}

function setup() {
  createCanvas(1530, 650);
  //Play Background Music
  BgMusic.play();

  //Push/Resize Items
  p = new Character(createVector(1, 500), norPen[0]);
  p.jumping = true;
  backgrounds = new Background(bg);
  bg.resize(6130, 800);
  beginBlock.resize(500, 153);
  norBlock.resize(400, 65);
  
  //BeginBlock
  blocks.push(
    new Block(createVector(width / 2 - 520, height - 77), beginBlock)
  );

  //Blocks
  for (let i = 0; i < num; ++i) {
    let pb = blocks[i];
    let margin;
    let randomBlock = int(random(0, 3));
    let upOrDown = int(random(0, 2));
    if (upOrDown == 1) {
      margin = (-pb.img.height * 3) / 4 + random(-130, -80);
    } else {
      margin = (pb.img.height * 3) / 4 + random(80, 130);
    }
    //Set Limit for Block
    if (
      pb.pos.y + pb.img.height / 2 + margin > 540 ||
      pb.pos.y - pb.img.height / 2 + margin < 200
    ) {
      margin *= -1;
    }
    let xpos = pb.pos.x + random(400, 450);
    let ypos = pb.pos.y + margin;

    //If block 1 and 17, create normal Block. If block 20, create Big Block. Else, Random Blocks
    if (i == 1 || i == 17) {
      blocks.push(new KeyBlock(createVector(xpos, ypos), norBlock));
    } else if (i == 20) {
      blocks.push(new Block(createVector(xpos, ypos), beginBlock));
    } else {
      if (randomBlock == 0) {
        blocks.push(new Block(createVector(xpos, ypos), norBlock));
      } else if (randomBlock == 1) {
        blocks.push(new SlipperyBlock(createVector(xpos, ypos), norBlock));
      } else if (randomBlock == 2) {
        blocks.push(new Block(createVector(xpos, ypos), norBlock));
      }
    }
  }

  //If Final Block, insert Penguin Girl
  let fb = blocks[21];
  gPen = new PenGirl(createVector(fb.pos.x, fb.pos.y - 126), gPen0);
  y = gPen.pos.y - 40;

  //Insert Rock
  let rockR1 = int(random(0, 2));
  let rockR2 = int(random(7, 9));
  for (let i = rockR1; i < num; i += rockR2) {
    let pd = blocks[i];
    if (i == 0 ) {
      SpecialRocks.push(
        new SpecialRock(createVector(pd.pos.x + 60, pd.pos.y - 100), sRock[0])
      );
    } else {
      SpecialRocks.push(
        new SpecialRock(
          createVector(pd.pos.x - random(-70, 70), pd.pos.y - 60),
          sRock[0]
        )
      );
    }
  }

  //Insert Candy
  for (let i = 1; i < num; i++) {
    let randomC = int(random(0, 100));
    if (randomC > 65) {
      let pd = blocks[i];
      if (i != 2 && i != 18 && i != 20) {
        Candies.push(
          new Candy(
            createVector(pd.pos.x - random(-100, 100), pd.pos.y - 60),
            Cands[0]
          )
        );
      }
    }
  }

  //Insert Enemy
  for (let i = 1; i < num; i++) {
    let randomC = int(random(0, 100));
    if (randomC > 65) {
      let pd = blocks[i];
      if (i != 2 && i != 18 && i != 19 && i != 20) {
        Enemies.push(new Enemy(createVector(pd.pos.x, pd.pos.y - 58), enemy));
      }
    }
  }

  //Insert Boss
  let bb = blocks[20];
  boss.resize(70, 115);
  Enemies.push(new Boss(createVector(bb.pos.x, bb.pos.y - 90), boss));

  //Insert sCandy
  let randomS = int(random(7, 9));
  for (let i = randomS; i < num; i += randomS) {
    let pd = blocks[i];
    SCandies.push(
      new SCandy(
        createVector(pd.pos.x - random(-100, 100), pd.pos.y - 60),
        SCands[0]
      )
    );
  }

  //Insert BulBags
  let rB = int(random(3, 10));
  for (let i = rB; i < num; i += 20) {
    let pd = blocks[i];
    if (i != 19) {
      BulBags.push(
        new BulletBag(
          createVector(pd.pos.x - random(-100, 100), pd.pos.y - 60),
          Bul[0]
        )
      );
    }
  }

  //Insert Bullet Bag in block 19
  let b = blocks[19];
  BulBags.push(
    new BulletBag(
      createVector(b.pos.x - random(-100, 100), b.pos.y - 60),
      Bul[0]
    )
  );

  //Snow
  for (let i = 0; i < 300; i++) {
    snowflakes.push({
      x: random(-2, width + 2),
      y: random(-height, 0),
      speedY: random(0.5, 2),
      speedX: random(0.5, 1.5),
    });
  }

  //Player's accerlerate
  upAcc = createVector(0, -90);
  leftAcc = createVector(-1.5, 0);
  rightAcc = createVector(1.5, 0);
  gravForce = createVector(0, grav);
}

function draw() {
  //Background
  background(220);
  backgrounds.drawMe(createVector(-p.pos.x, -1));
  snowbg();
  
  //Startscreen
  if (!gameStarted) {
    startScreen();
    return; // stop draw() from running the game until click
}

  //SCandy
  STime++;
  if (STime >= 3 * 60 && STime <= 6 * 60) {
    for (let i = 0; i < SCandies.length; i++) {
      SCandies[i].update(p);
    }
  }
  if (STime >= 6 * 60) {
    STime = 0;
  }

  //Special Rock
  for (let i = 0; i < SpecialRocks.length; i++) {
    SpecialRocks[i].update(p);
  }

  // Enemies
  for (let i = 0; i < Enemies.length; i++) {
    Enemies[i].update(p);
  }

  //Candy
  CTime++;
  if (CTime >= 1 * 60 && CTime <= 4 * 60) {
    for (let i = 0; i < Candies.length; i++) {
      Candies[i].update(p);
    }
  }
  if (CTime >= 4 * 60) {
    CTime = 0;
  }

  //BulBags
  for (let i = 0; i < BulBags.length; i++) {
    BulBags[i].update(p);
  }

  //Blocks
  for (let i = 0; i < blocks.length; i++) {
    blocks[i].drawMe(p);
    blocks[i].update(p);
  }

  //PLayer's accelerate
  if (up && !p.jumping) {
    p.jump(upAcc);
    if (frameCount % 15 == 0) {
      Footstep.play();
    }
  }
  if (left) {
    p.accelerate(leftAcc);
    p.activeFrame = leftPen;
    if (frameCount % 15 == 0) {
      Footstep.play();
    }
  }
  if (right) {
    p.accelerate(rightAcc);
    p.activeFrame = rightPen;
    if (frameCount % 15 == 0) {
      Footstep.play();
    }
  }

  if (!left && !right) {
    p.activeFrame = norPen;
  }

  //Player
  p.update();

  //Girl Penguin
  gPen.drawMe(p);

  //Player lands on Block
  if (p.block != null) {
    if (!p.block.isOn(p)) {
      p.jumping = true;
    }
  }
  if (p.jumping) {
    p.accelerate(gravForce);
    for (let i = 0; i < blocks.length; i++) {
      let b = blocks[i];
      if (b.bump(p)) {
        if (p.vel.y > 0) {
          p.landOn(b);
        } else {
          p.fall();
        }
      }
    }
  }

  //Player's at the end of screen width
  if (p.pos.x > width * 3) {
    p.pos.x = width * 3 - p.img.width / 2;
  }

  //Player falls out of Canvas
  if (p.pos.y > height - p.img.height / 2 || p.health <= 0 || failclicked) {
    // p.pos = createVector(0,0);
    p.vel = createVector(0, 0);
    gameOver();
    GTime++;
    if (GTime <= 1 * 60) {
      GameOver.play();
    }
  }

  //When Clicked to the Girl Penguin
  if (clicked) {
    push();
    gPen.img = gPen1;
    translate(-2 * p.pos.x + gPen.pos.x - 30, y);
    image(sRock[0], 0, 0);
    pop();
    y--;
    gameWin();
    GTime++;
    if (GTime <= 0.5 * 60) {
      GameWin.play();
    }
  }
}

function snowbg() {
  for (let i = 0; i < snowflakes.length; i++) {
    let snowflake = snowflakes[i];
    noStroke();
    fill(255, 214, 236);
    circle(snowflake.x, snowflake.y, 2.5);
    snowflake.y += snowflake.speedY;
    snowflake.x -= snowflake.speedX;

    if (snowflake.y > height) {
      snowflake.y = random(-height, 0);
      snowflake.x = random(-2, width + 2);
    }
    if (snowflake.x < -2) {
      snowflake.x = random(width + 2, width + 2);
    }
  }
  fill(255, 229, 241);
  stroke(45, 39, 73);
  strokeWeight(2);
  Time += 1 / 60;
  textFont(font, 14);
  text("Time: " + int(Time), 55, 50);
  text("Score: " + score, 56, 80);
  text("Rock: " + rNum, width - 200, 50);
  text("Health: " + p.health, 56, 110);
}

function startScreen() {
  background(119, 114, 208);
  fill(255, 229, 241);
  stroke(46, 39, 73);
  strokeWeight(5);
  textFont(font, 130);
  textSize(40);
  text("Click to Start", width / 2 - 250, height / 2);
}

function gameOver() {
  background(119, 114, 208);
  Time = 0;
  snowbg();
  fill(255, 229, 241);
  stroke(46, 39, 73);
  strokeWeight(5);
  textFont(font, 100);
  text("Game", width / 2 - 200, height / 2 - 25);
  text("Over", width / 2 - 200, height / 2 + 75);
  BgMusic.stop();
}
let alpha = 0;
function gameWin() {
  background(119, 114, 208, (alpha += 3));
  Time = 0;
  snowbg();
  fill(255, 229, 241);
  stroke(46, 39, 73);
  strokeWeight(5);
  textFont(font, 160);
  text("WIN", width / 2 - 280, height / 2 + 50);
  textSize(50);
  text("Congratulations!!", width / 2 - 450, height / 2 + 110);
  BgMusic.stop();
}

function mousePressed() {
   if (!gameStarted) {
    gameStarted = true;
    return;
  }
  gPen.clicked(mouseX, mouseY, p);
}
