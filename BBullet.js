class bBullet {
  constructor(pos,vel){
    this.pos = pos;
    this.vel = vel;
    this.r = 20;
    this.pAlive = true;
    this.bshow = true;
  }
  
  drawMe(c){
    push();
    translate(-2* c.pos.x + this.pos.x, this.pos.y);
    noStroke();
    fill(46, 39, 73);    
    circle(0,0,this.r);
    pop();
  }
  
  checkWalls() {
    //if boss's bullet out of screen, it stops displaying
    if (this.pos.x + this.r / 2 < 0) {
      this.bshow = false;
    }
  }
    
  move() {
    //add vel to bullet's position
    this.pos.add(this.vel);
  } 
  hit(c) {
    //Check Collision
      if (
      abs(c.fixedX - (this.pos.x - 2 * c.pos.x)) <
        c.img.width / 2 + this.r / 2 &&
      abs(c.pos.y - this.pos.y) < c.img.height / 2 + this.r / 2
    ) {
      c.LifeLost();
     this.pAlive = false;
    }
  }
  update(c) {
    this.move();
    this.drawMe(c);
    this.checkWalls();
  }
}
