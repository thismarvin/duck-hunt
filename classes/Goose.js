class Goose extends Entity {

  const gooseWidth = 30;
  const gooseHeight = 30;

  constructor(x, y, speed) {
    super(x, y, gooseWidth, gooseHeight);
    this.speed = speed;
    this.deltaX = Math.random() + 0.2 * speed; // change later, make min dynamic.
    this.deltaY = Math.random() + 0.2 * speed; // change later, make min dynamic.
    this.fallen = false;
    this.fall = false;
  }

  update() {

  }
}
