class KeyBlock extends Block {
  constructor(pos, img) {
    super(pos, img);
    this.visible = false;
    this.timer = 0;
    this.start = false;
  }

  drawMe(c) {
    push();
    //It's visible after the Timer activated
    if (this.visible) {
      tint(255, 255, 255, 255);
    } else {
      tint(255, 255, 255, 0);
    }
    translate(-2 * c.pos.x + this.pos.x, this.pos.y);
    image(this.img, -this.img.width / 2, -this.img.height / 2);
    pop();
  }
  
  notDisplay() {
    let index = blocks.indexOf(this);
    blocks.splice(index, 1);
  }

  startTimer() {
    // Set timer for 3 seconds
    this.timer = 3 * 60;
    this.start = true;
  }

  updateTimer() {
    if (this.start) {
      this.timer--;
      if (this.timer <= 0) {
        this.visible = false;
        this.start = false;
        this.notDisplay();
      }
    }
  }

  update(c) {
    // this.updateTimer();
    if (keyIsPressed && key == " " && rNum > 0 && !this.start) {
      this.visible = true;
      this.startTimer();
      rNum--;
    }
    this.updateTimer();
  }
}
