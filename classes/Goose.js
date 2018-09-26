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
    this.fallen = false;
    this.fall = false;
  }

  update() {

  }

  show() {
    super.show();
  }
}
