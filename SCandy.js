class SCandy extends Candy {
  constructor(pos, img) {
    super(pos, img);
    this.activeFrame = SCands;
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
    let index = SCandies.indexOf(this);
    SCandies.splice(index, 1);
    p.health += 3;
  }
  update(c) {
    this.drawMe(c);
    this.updateFrame();
    this.CheckCollision(c);
  }
}
