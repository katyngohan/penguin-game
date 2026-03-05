class SlipperyBlock extends Block {
  constructor(pos, img) {
    super(pos, img);
  }

  update(c) {
    if (c.block == this) {
      if (c.vel.x > 0) {
        c.vel.add(0.5, 0);
      } else if (c.vel.x < 0) {
        c.vel.add(-0.5, 0);
      }
    }
  }
}
