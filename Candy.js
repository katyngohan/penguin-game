class Candy extends SpecialRock {
  constructor(pos, img) {
    super(pos, img);
    this.activeFrame = Cands;
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
      this.gain();
      GainBell.play();
    }
  }

  gain() {
    let index = Candies.indexOf(this);
    Candies.splice(index, 1);
    p.health += 1;
  }

  update(c) {
    this.drawMe(c);
    this.CheckCollision(c);
    this.updateFrame();
  }
}
