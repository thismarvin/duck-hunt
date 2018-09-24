class Entity() {
    constructor(x, y, width, height) {
      let collRect = new Rectangle(x, y, width, height);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
    }
}
