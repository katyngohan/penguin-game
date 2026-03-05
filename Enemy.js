class Enemy {
  vel;
  constructor(pos, img) {
    this.pos = pos;
    this.img = img;
    this.leftLimit = this.pos.x - 175;
    this.rightLimit = this.pos.x + 175;

    this.leftOrRight = int(random(0, 2));
    if (this.leftOrRight == 1) {
      this.vel = createVector(-1.6, 0);
    } else {
      this.vel = createVector(1.6, 0);
    }
  }
  move() {
    this.pos.add(this.vel);
  }

  //Moving left to right and vice versa
  checkLimit() {
    if (
      (this.pos.x > this.rightLimit && this.vel.x > 0) ||
      (this.pos.x < this.leftLimit && this.vel.x < 0)
    ) {
      this.vel.mult(-1);
    }
  }

  drawMe(c) {
    push();
    translate(-2 * c.pos.x + this.pos.x, this.pos.y);
    image(this.img, -this.img.width / 2, -this.img.height / 2);
    pop();
  }

  CheckCollision(c) {
    if (
      abs(c.fixedX - (this.pos.x - 2 * c.pos.x)) <
        c.img.width / 2 + this.img.width / 2 &&
      abs(c.pos.y - this.pos.y) < c.img.height / 2 + this.img.height / 2
    ) {
      this.Collided(c);
      Pumping.play();
    }
  }

  Collided(c) {
    c.health--;
    if (c.health <= 0) {
      c.health = 0;
    }
    //Moving enemy and player far from each other
    c.pos.x = c.pos.x - 50;
    this.pos.x = this.pos.x + 40;
  }
  
  die() {
    let index = Enemies.indexOf(this);
    Enemies.splice(index, 1);
    score += 5;
  }

  update(c) {
    this.drawMe(c);
    this.move();
    this.CheckCollision(c);
    this.checkLimit();
  }
}
