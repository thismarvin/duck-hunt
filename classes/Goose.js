const gooseWidth = 120;
const gooseHeight = 66;
const minTime = 3;
class Goose extends Entity {
  constructor(x, y, speed, initPanicFactor=0.5, maxPanicFactor=0.8) {
    super(x, y, gooseWidth, gooseHeight);
    this.speed = speed; // not really the magnitude of velocity vector, but works similarly
    this.deltaX = Math.random() * speed + 0.2; // change later, make min dynamic.
    this.deltaY = Math.random() * speed + 0.2; // change later, make min dynamic.
    this.bodyHitbox = new Rectangle(x + 28, y + 19, 36, 28);
    this.headHitbox = new Rectangle(x + 86, y, 22, 22);

    this.hasFallen = false; // true if the goose has finished falling, marks for pickup
    this.shouldFall = false; // true if the goose is killed and needs to fall
    this.shouldFlyAway = false; // true if the goose should fly away

    let duration = 10 - getCurrentRound();
    if (duration < minTime) {
      duration = minTime;
    }
    // duck will try to change direction everytime this timer finishes.
    this.timer = new Timer(duration);
    // describes the probability the duck will change direction (0.5 by default).
    this.basePanicFactor = initPanicFactor;
    this.panicFactor = initPanicFactor;
    this.maxPanicFactor = maxPanicFactor;

    // Creates Goose Sprite from hosted image.
    this.gooseSprite = createImg('https://cdn1.imggmi.com/uploads/2018/9/30/644df43a5460f47884fbdbe315d413a2-full.png');
    this.gooseSprite.hide();

  }

  update() {
    this.show();
    this.panic();
    this.move();
  }

  show() {
    fill(255);
    //super.show();
    // Draws Goose Sprite
    image(this.gooseSprite, this.x, this.y);
    this.headHitbox.show();
    this.bodyHitbox.show();

  }

  move() {
    if (this.shouldFall) {
      super.move(0, 1);
      this.moveHitboxes(0, 1);
      if (this.y > screenH) {
        this.hasFallen = true;
        this.shouldFall = false;
      }
    } else if (!this.hasFallen){
      super.move(this.deltaX, this.deltaY);
      this.moveHitboxes(this.deltaX, this.deltaY);
      if (this.x + gooseWidth > playfieldW || this.x < 0) {
        this.deltaX = -this.deltaX;
      }
      if (this.y + gooseHeight > playfieldH || this.y < 0) {
        this.deltaY = -this.deltaY;
      }
    } else if (this.shouldFlyAway) {
      super.move(0, -1);
      this.moveHitboxes(0, -1);
      if (this.y + gooseHeight < 0) {
        this.dead = true;
      }
    }
  }

  moveHitboxes(dx, dy) {
    this.headHitbox.move(dx, dy);
    this.bodyHitbox.move(dx, dy);
  }

  updateHitboxes() {
    // make the hitboxes move according to facing.
  }

  isFacingRight() {
    return this.deltaX > 0;
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
    if (this.panicFactor < this.maxPanicFactor) {
      this.panicFactor = this.basePanicFactor + getNumShotsMissed() / 10;
    }
    if (this.timer.isFinished()) {
      if (Math.random() < this.panicFactor) {
        this.invertDirectionRandom();
      }
      this.timer.reset();
    }
  }
}
