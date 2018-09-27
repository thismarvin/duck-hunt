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

    this.fallen = false; // whats the difference?
    this.fall = false;

    this.dead = false;
  }

  update() {
    this.show();
    // Temporary, for debugging
    if (this.fall) {
      super.move(0, 1);
    }
  }

  show() {
    fill(255);
    super.show();
  }
}
