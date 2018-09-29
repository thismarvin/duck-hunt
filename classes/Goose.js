const gooseWidth = 32;
const gooseHeight = 32;
const minTime = 3;
class Goose extends Entity {
  constructor(x, y, speed, panicFactor=0.5) {
    // super(x, y, gooseWidth, gooseHeight);
    super(x, y, gooseWidth, gooseHeight);
    this.speed = speed; // not really the magnitude of velocity vector, but works similarly
    this.deltaX = Math.random() * speed + 0.2; // change later, make min dynamic.
    this.deltaY = Math.random() * speed + 0.2; // change later, make min dynamic.

    this.hasFallen = false; // true if the goose has finished falling, marks for pickup
    this.shouldFall = false; // true if the goose is killed and needs to fall
    this.shouldFlyAway = false; // true if the goose should fly away

    let duration = 10 - getCurrentRound(); // getCurrentRound returns only 1 for now...
    console.log(duration);
    if (duration < minTime) {
      duration = minTime;
    }
    // duck will try to change direction everytime this timer finishes.
    this.timer = new Timer(3); // set to 3 for now until i figure out how to access the round.
    // describes the probability the duck will change direction (0.5 by default).
    this.panicFactor = panicFactor;
  }

  update() {
    this.show();
    this.panic();
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

  invertDirection() {
    this.deltaX = -this.deltaX;
    this.deltaY = -this.deltaY;
  }

  invertDirectionRandom() {
    let hasInverted = false;
    if (Math.random() < 0.5) {
      this.deltaX = -this.deltaX;
      hasInverted = true;
    }
    if (Math.random() < 0.5) {
      this.deltaY = -this.deltaY;
      hasInverted = true;
    }
    if (!hasInverted) {
      this.invertDirection();
    }
  }

  panic() {
    if (this.timer.isFinished()) {
      if (Math.random() < this.panicFactor) {
        this.invertDirectionRandom();
      }
      this.timer.reset();
    }
  }
}
