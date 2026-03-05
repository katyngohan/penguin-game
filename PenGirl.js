class PenGirl {
  constructor(pos, img) {
    this.pos = pos;
    this.img = img;
  }

  drawMe(c) {
    push();
    translate(-2 * c.pos.x + this.pos.x, this.pos.y);
    image(this.img, -this.img.width / 2, -this.img.height / 2);
    fill(255);
    textFont(font, 7);
    text("Click", 50, 0);
    text("Penguin Girl", 50, 14);

    pop();
  }

  clicked(x, y, c) {
    let d = dist(x, y, -2 * c.pos.x + this.pos.x, this.pos.y);

    if (d < this.img.height / 2) {
      if (rNum > 0) {
        rNum--;
        clicked = true;
      } else {
        failclicked = true;
      }
    }
  }
}
