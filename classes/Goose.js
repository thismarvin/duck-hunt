class Goose extends Entity {

  // You cant do this lol actually how would you make a constant in a class?
  //const gooseWidth = 30;
  //const gooseHeight = 30;

  constructor(x, y, speed) {
    // super(x, y, gooseWidth, gooseHeight);
    super(x, y, 30, 30);
    this.speed = speed;
    this.deltaX = Math.random() + 0.2 * speed; // change later, make min dynamic.
    this.deltaY = Math.random() + 0.2 * speed; // change later, make min dynamic.

    this.hasFallen = false; // whats the difference?
    this.shouldFall = false;
    this.shouldFlyAway = false;
  }

  update() {
    this.show();
    this.move();
  }

  show() {
    fill(255);
    super.show();
  }

  move() {
    if (this.shouldFall) {
      super.move(0, 1);
    } else if (this.shouldFlyAway) {
      super.move(0, -1);
      if (this.y < 0) {
        this.dead = true;
      }
    } else {
      if (this.x > screenW || x < 0) {
        this.deltaX = -this.deltaX;
      }
      if (this.y > screenH || y < 0) {
        this.deltaY = -this.deltaY;
      }
      super.move(this.deltaX, this.deltaY);
    }
  }

  // this will probably be useful later.
  invertDirection() {
    this.deltaX = -this.deltaX;
    this.deltaY = -this.deltaY;
  }
}
