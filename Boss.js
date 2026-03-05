class Boss extends Enemy {
  constructor(pos, img) {
    super(pos, img);
    this.bBullets = [];
    this.health = 5;
  }

  checkBullet(c) {
    for (let i = 0; i < this.bBullets.length; ++i) {
      let s = this.bBullets[i];
      //If the Boss is displayed on screen
      if (abs(c.fixedX - (this.pos.x - 2 * c.pos.x)) < 1500) {
        s.update(p);
        s.hit(p);
      }

      if (s.bshow == false || s.pAlive == false) {
        this.bBullets.splice(i, 1);
      }
      if (this.health < 1 || p.health < 1) {
        this.bBullets.splice(i, 1);
      }
    }
  }

  die() {
    this.health--;
    this.pos.x = this.pos.x + 40;
    if (this.health <= 0) {
      let index = Enemies.indexOf(this);
      Enemies.splice(index, 1);
      score += 10;
      BossDead = true;

    }
  }

  fire() {
    let b = new bBullet(
      createVector(this.pos.x, this.pos.y),
      createVector(-10, 0)
    );
    this.bBullets.push(b);
  }

  drawMe(c) {
    push();
    translate(-2 * c.pos.x + this.pos.x, this.pos.y);
    image(this.img, -this.img.width / 2, -this.img.height / 2);

    //Boss's health bar
    noStroke();
    fill(46, 39, 73);
    rect(-35, -75, 15 * this.health, 5);
    noFill();
    stroke(46, 39, 73);
    strokeWeight(2);
    rect(-35, -75, 15 * 5, 5);
    pop();
  }
  update(c) {
    this.drawMe(c);
    this.CheckCollision(c);
    this.checkBullet(c);
    if (
      //Bullet fires every 4 seconds
      frameCount % 240 == 0 &&
      this.health >= 1 &&
      c.health >= 1
    ) {
      this.fire();
    }
    // if time is 0, make the boss displays out of canvas, add 50 scores for player
    if (this.health <= 0) {
      this.dead();
    }
  }
}
