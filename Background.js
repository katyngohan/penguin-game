class Background {
  constructor(img) {
    this.img = img;
  }

  drawMe(pos) {

    let tilesX = -floor(pos.x / this.img.width);
    let tilesY = -floor(pos.y / this.img.height);

    for (let i = tilesX - 1; i < tilesX; i++) {
      for (let j = tilesY - 1; j < tilesY; j++) {
        image(
          this.img,
          pos.x + this.img.width * i,
          pos.y + this.img.height * j
        );
      }
    }
  }
}
