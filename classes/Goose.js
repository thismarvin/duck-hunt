const gooseWidth = 120;
const gooseHeight = 66;
const minSpeed = 0.5; // represents fraction of speed.
const minTime = 3;

// hitbox constants
const headHitboxW = 22;
const headHitboxH = 22;
const headHitboxOffsetX = 86;
const headHitboxOffsetY = 28;
const bodyHitboxW = 36;
const bodyHitboxH = 28;
const bodyHitboxOffsetX = 28;
const bodyHitboxOffsetY = 44;

class Goose extends Entity {
  constructor(x, y, speed, initPanicFactor = 0.5, maxPanicFactor = 0.8) {
    super(x, y, gooseWidth, gooseHeight);
    this.speed = speed + getCurrentRound() - 1 ; // not really the magnitude of velocity vector, but works similarly
    this.deltaX = (Math.random() * (1 - minSpeed) + minSpeed) * this.speed;
    this.deltaY = (Math.random() * (1 - minSpeed) + minSpeed) * this.speed;
    this.bodyHitbox = new Rectangle(x + bodyHitboxOffsetX, y + bodyHitboxOffsetY, bodyHitboxW, bodyHitboxH);
    this.headHitbox = new Rectangle(x + headHitboxOffsetX, y + headHitboxOffsetY, headHitboxW, headHitboxH);

    this.hasFallen = false; // true if the goose has finished falling, marks for pickup
    this.shouldFall = false; // true if the goose is killed and needs to fall
    this.shouldFlyAway = false; // true if the goose should fly away

    this.minDuration = 1000;
    let duration = 10 * 1000 - getCurrentRound() * 1000;
    duration = duration < this.minDuration ? this.minDuration : duration;

    if (duration < minTime) {
      duration = minTime;
    }
    // duck will try to change direction everytime this timer finishes.
    this.timer = new Timer(duration);
    // describes the probability the duck will change direction (0.5 by default).
    this.basePanicFactor = initPanicFactor;
    this.panicFactor = initPanicFactor;
    this.maxPanicFactor = maxPanicFactor;

    this.gooseIndex = floor(Math.random() * 3);
    this.gooseSprite = new Sprite(this.x, this.y, 64 * 2, 48 * 2, getGeeseRightImage(), 7, 0, this.gooseIndex);

  }

  update() {
    this.show();
    this.panic();
    this.move();
  }

  show() {
    // Draws Goose Sprite
    this.gooseSprite.setLocation(this.x, this.y);
    if (this.isFacingRight()) {
      this.gooseSprite.setSpriteSheet(getGeeseRightImage()); //temp?
    } else {
      this.gooseSprite.setSpriteSheet(getGeeseLeftImage()); // temp?
    } 
    if (!this.shouldFall){
      this.gooseSprite.update();  
    }
    else {
      this.gooseSprite.sourceX = 64 * 2 * 3;
    }
    this.gooseSprite.show();

    // Debugging
    //this.headHitbox.show();
    //this.bodyHitbox.show();
  }

  move() {
    if (this.shouldFall) {
      super.move(0, 4);
      this.moveHitboxes(0, 4);
      if (this.y > screenH) {
        this.hasFallen = true;
        this.shouldFall = false;
      }
    } else if (!this.hasFallen && !this.shouldFlyAway) {
      super.move(this.deltaX, this.deltaY);
      this.moveHitboxes(this.deltaX, this.deltaY);
      this.collision();
    } else if (!this.hasFallen && this.shouldFlyAway) {
      super.move(0, -2);
      this.moveHitboxes(0, -2);
      if (this.y + gooseHeight < 0) {
        this.dead = true;
      }
    }
  }

  collision() {
    if (this.x + gooseWidth > playfieldW || this.x < 0) {
      if (this.x + gooseWidth > playfieldW) {
        this.x = playfieldW - gooseWidth;
      } else {
        this.x = 0;
      }
      this.deltaX = -this.deltaX;
      this.updateHitboxes();
    }
    if (this.y + gooseHeight > playfieldH || this.y < 0) {
      if (this.y + gooseHeight > playfieldH) {
        this.y = playfieldH - gooseHeight;
      } else {
        this.y = 0;
      }
      this.deltaY = -this.deltaY;
    }
  }

  moveHitboxes(dx, dy) {
    this.headHitbox.move(dx, dy);
    this.bodyHitbox.move(dx, dy);
  }

  updateHitboxes() {
    // change orientation of hitboxes based on what direction goose is facing.
    if (this.isFacingRight()) {
      this.bodyHitbox = new Rectangle(this.x + bodyHitboxOffsetX, this.y + bodyHitboxOffsetY, bodyHitboxW, bodyHitboxH);
      this.headHitbox = new Rectangle(this.x + headHitboxOffsetX, this.y + headHitboxOffsetY, headHitboxW, headHitboxH);
    } else {
      this.bodyHitbox = new Rectangle(this.x + gooseWidth - bodyHitboxOffsetX - bodyHitboxW,
        this.y + bodyHitboxOffsetY, bodyHitboxW, bodyHitboxH);
      this.headHitbox = new Rectangle(this.x + gooseWidth - headHitboxOffsetX - headHitboxW,
        this.y + headHitboxOffsetY, headHitboxW, headHitboxH);
    }
  }

  isFacingRight() {
    return this.deltaX > 0;
  }

  invertDirection() {
    this.deltaX = -this.deltaX;
    this.deltaY = -this.deltaY;
    this.updateHitboxes();
  }

  // randomly inverts goose direction in unpredicatble ways.
  invertDirectionRandom() {
    let hasInverted = false;
    if (Math.random() < 0.5) {
      let temp = this.deltaY;
      this.deltaY = this.deltaX;
      this.deltaX = temp;
      hasInverted = true;
    }
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
    this.updateHitboxes();
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
