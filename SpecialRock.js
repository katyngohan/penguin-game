class SpecialRock {
  constructor(pos, img) {
    this.pos = pos;
    this.img = img;
    this.currentFrame = 0;
    this.activeFrame = sRock;
    this.animationRate = 15;
  }
  drawMe(c) {
    push();
    translate(-2 * c.pos.x + this.pos.x, this.pos.y);
    image(this.img, -this.img.width / 2, -this.img.height / 2);
    fill(255);
    textFont(font, 7);
    text("Press Space to use", -60, -30);
    pop();
  }
  CheckCollision(c) {
    if (
      abs(c.fixedX - (this.pos.x - 2 * c.pos.x)) <
        c.img.width / 2 + this.img.width / 2 &&
      abs(c.pos.y - this.pos.y) < c.img.height / 2 + this.img.height / 2
    ) {
      this.gain();
      GainBell.play();
    }
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
  gain() {
    let index = SpecialRocks.indexOf(this);
    SpecialRocks.splice(index, 1);
    rNum++;
  }
  update(c) {
    this.drawMe(c);
    this.CheckCollision(c);
    this.updateFrame();
  }
}
