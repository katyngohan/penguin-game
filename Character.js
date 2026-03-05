class Character {
  constructor(pos, img) {
    this.pos = pos;
    this.vel = createVector();
    this.img = img;
    this.jumping = false;
    this.fixedX = 150;
    this.damp = 0.5;
    this.health = 5;
    this.bullets = [];
    this.block = null;
    this.currentFrame = 0;
    this.activeFrame = norPen;
    this.animationRate = 6;
  }

  moveCharacter() {
    this.pos.add(this.vel);
    this.vel.mult(this.damp);
  }

  accelerate(acc) {
    this.vel.add(acc);
  }
  checkWalls() {
    if (this.pos.x / 2 < 0) this.pos.x = this.img.width / 2;
    if (this.pos.y > height - this.img.height / 2)
      this.pos.y = height + this.img.height / 2;
    if (this.pos.y < 0) this.pos.y = this.img.height / 2;
  }

  jump(upAcc) {
    this.accelerate(upAcc);
    this.jumping = true;
  }
  fall() {
    this.vel.y *= -1;
  }

  landOn(b) {
    this.jumping = false;
    this.block = b;
    this.pos.y = b.pos.y - this.img.height / 2 - b.img.height / 2;
    this.vel.y = 0;
  }

  updateFrame() {
    if (this.activeFrame[this.currentFrame + 1] != null) {
      if (frameCount % this.animationRate == 0) {
        this.currentFrame++;
      }
    } else {
      this.currentFrame = 0;
    }

    this.img = this.activeFrame[this.currentFrame];
  }
  LifeLost() {
    this.health -= 1;
    this.pos.x = this.pos.x - 80;
    noStroke();
    fill(244, 140, 142, 240);
    circle(this.pos.x, this.pos.y, 100);
  }

  checkBullet() {
    for (let i = 0; i < this.bullets.length; ++i) {
      let b = this.bullets[i];
      if(BossDead == false){
      b.update(p);
      }
      for (let j = 0; j < Enemies.length; ++j) {
        let e = Enemies[j];
        b.hit(p, e);
      }
      if (b.show == false || b.eAlive == false || b.bAlive == false) {
        this.bullets.splice(i, 1);
      }
    }
  }
  //every time it fires, push the bullet
  fire() {
    if(BossDead == false){
    let b = new Bullet(
      createVector(this.fixedX, this.pos.y),
      createVector(20, 0)
    );
    this.bullets.push(b);
    FireSound.play();
    }
  }

  drawCharacter() {
    push();
    translate(this.fixedX, this.pos.y);
    image(this.img, -this.img.width / 2, -this.img.height / 2);
    noStroke();
    pop();
  }
  update() {
    this.drawCharacter();
    this.checkWalls();
    this.moveCharacter();
    this.updateFrame();
    this.checkBullet();
  }
}

let upAcc, leftAcc, rightAcc;
let up, left, right;
let display = false;

function keyPressed() {
  if (key == 'd' || key == 'D') right = true;
  if (key == 'a' || key == 'A') left = true;
  if (key == 'w' || key == 'W') up = true; 
}

function keyReleased() {
  if (key == 'd' || key == 'D') right = false;
  if (key == 'a' || key == 'A') left = false;
  if (key == 'w' || key == 'W') up = false;
}
