class Entity {
    constructor(x, y, width, height) {
      this.collRect = new Rectangle(x, y, width, height);
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.dead = false;
    }

    setLocation(x, y) {
      this.x = x;
      this.y = y;
      this.collRect.setLocation(x, y);
    }

    move(x, y) {
      this.x += x;
      this.y += y;
      this.collRect.setLocation(this.x, this.y);
    }

    show() {
      this.collRect.show();
    }
}
