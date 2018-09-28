const gooseWidth = 32;
const gooseHeight = 32;
class Goose extends Entity {
  constructor(x, y, speed) {
    // super(x, y, gooseWidth, gooseHeight);
    super(x, y, gooseWidth, gooseHeight);
    this.speed = speed; // not really the magnitude of velocity vector, but works similarly
    this.deltaX = Math.random() * speed + 0.2; // change later, make min dynamic.
    this.deltaY = Math.random() * speed + 0.2; // change later, make min dynamic.

    this.hasFallen = false; // true if the goose has finished falling, marks for pickup
    this.shouldFall = false; // true if the goose is killed and needs to fall
    this.shouldFlyAway = false; // true if the goose should fly away
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
      if (this.y > screenH) {
        this.hasFallen = true;
        this.shouldFall = false;
      }
    } else if (this.shouldFlyAway) {
      super.move(0, -1);
      if (this.y + gooseHeight < 0) {
        this.dead = true;
      }
    } else if (!this.hasFallen){
      super.move(this.deltaX, this.deltaY);
      if (this.x + gooseWidth > playfieldW || this.x < 0) {
        this.deltaX = -this.deltaX;
      }
      if (this.y + gooseHeight > playfieldH || this.y < 0) {
        this.deltaY = -this.deltaY;
      }
    }
  }

  // this will probably be useful later.
  invertDirection() {
    this.deltaX = -this.deltaX;
    this.deltaY = -this.deltaY;
  }
}
