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

    move(dx, dy) {
      this.x += dx;
      this.y += dy;
      this.collRect.move(dx, dy);
    }

    show() {
      this.collRect.show();
    }
}
