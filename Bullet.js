class Bullet extends bBullet {
  constructor(pos, vel) {
    super(pos, vel);
    this.eAlive = true;
    this.bAlive = true;
    this.show = true
  }

  drawMe(c) {
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(255, 229, 241);
    stroke(46, 39, 73);
    strokeWeight(2);
    circle(0, 0, this.r);
    pop();
  }
  
  checkWalls() {
    //if boss's bullet out of screen, it stops displaying
    if (this.pos.x + this.r / 2 > width) {
      this.show = false;
    }
  }

  hit(c, e) {
    //Check Collision
    if (
      abs(-2 * c.pos.x + e.pos.x - this.pos.x) < e.img.width / 2 + this.r / 2 &&
      abs(e.pos.y - this.pos.y) < e.img.height / 2 + this.r / 2
    ) {
      e.die();
      this.eAlive = false;
    }
  }
  update(c) {
    this.move();
    this.drawMe(c);
    this.checkWalls();
  }
}
