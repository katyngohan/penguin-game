class BulletBag extends SpecialRock {
  constructor(pos, img) {
     super(pos, img);
    this.timer = 0;
    this.dim = 0;
    this.start = false;
    this.activeFrame = Bul;
    this.elapsedTime = 0; // Track elapsed time for firing bullets
  }

  CheckCollect(c) {
    if (
      abs(c.fixedX - (this.pos.x - 2 * c.pos.x)) <
        c.img.width / 2 + this.img.width / 2 &&
      abs(c.pos.y - this.pos.y) < c.img.height / 2 + this.img.height / 2
    ) {
      return true;
    }
    return false;
  }

  tShoot() {
    let index = BulBags.indexOf(this);
    BulBags.splice(index, 1);
  }

  startTimer() {
    this.timer = 10 * 60;
    this.dim = this.timer;
    this.start = true;
    this.elapsedTime = 0;
  }

  updateTimer() {
    if (this.start) {
      this.timer--;
      this.dim--;
      this.elapsedTime++;
      //Fire every 0.5 seconds
      if (this.elapsedTime % 30 == 0) {
        p.fire();
      }
      this.trackBar();

      if (this.timer <= 0) {
        this.start = false;
        //Splice after done shooting
        this.tShoot();
      }
    }
  }

  trackBar() {
    if (BossDead == false) {
      noStroke();
      fill(239, 228, 155);
      rect(width / 2 - 150, 50, 30 * this.dim / 60, 12);
      noFill();
      stroke(79, 52, 71);
      strokeWeight(2);
      rect(width / 2 - 150, 50, 30 * 10, 12);
    }
  }
  drawMe(c) {
    push();
    //Make it invisible when the timer activated
    if (this.start) {
      tint(255, 255, 255, 0);
    } else {
      tint(255, 255, 255, 255);
    }
    translate(-2 * c.pos.x + this.pos.x, this.pos.y);
    image(this.img, -this.img.width / 2, -this.img.height / 2);
    pop();
  }

  update(c) {
    this.drawMe(c);
    this.updateFrame();
    this.updateTimer();
    //If collided, start Timer
    if (this.CheckCollect(c) && !this.start) {
      this.startTimer();
    }
  }
}
