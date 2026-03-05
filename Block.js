class Block {
  constructor(pos, img) {
    this.pos = pos;
    this.img = img;
  }

  isOn(c) {
    if (
      abs(c.fixedX - (this.pos.x - 2 * c.pos.x)) <
      c.img.width / 2 + this.img.width / 2
    ) {
      return true;
    }
    return false;
  }

  bump(c) {
    if (
      abs(c.fixedX - (this.pos.x - 2 * c.pos.x)) <
        c.img.width / 2 + this.img.width / 2 &&
      abs(c.pos.y - this.pos.y) < c.img.height / 2 + this.img.height / 2
    ) {
      return true;
    }
    return false;
  }

  drawMe(c) {
    push();
    translate(-2 * c.pos.x + this.pos.x, this.pos.y);
    image(this.img, -this.img.width / 2, -this.img.height / 2);
    pop();
  }
  update() {}
}
