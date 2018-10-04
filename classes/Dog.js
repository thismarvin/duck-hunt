const dogW = 80;
const dogH = 200;
const moveSpeed = 3;
class Dog extends Entity {
  constructor() {
    super(0, playfieldH, dogW, dogH);
    this.geeseToPickup = [];
    this.isPickingUpGoose = false;
    this.needsToMoveDown = false;
    this.isLaughing = false;
  }

  update() {
    this.show();
    this.pickupNextGoose();
    this.doLaugh();
  }

  show() {
    super.show();
  }

  queueGoose(goose) {
    this.geeseToPickup.push(goose);
  }

  pickupNextGoose() {
    if (this.geeseToPickup.length > 0 && !this.isPickingUpGoose) {
      this.moveToNextGoose();
      this.isPickingUpGoose = true;
    } else if (this.isPickingUpGoose) {
      if (!this.moveUpAndDown()) {
        this.setLocation(0, playfieldH);
        this.killCurrentGoose();
        this.isPickingUpGoose = false;
      }
    }
  }

  initLaugh() {
    this.isLaughing = true;
  }

  doLaugh() {
    if (this.isLaughing) {
      let mid = Math.floor(playfieldW / 2 - dogW / 2);
      this.setLocation(mid, this.y);
      if (!this.moveUpAndDown()) {
        this.setLocation(0, playfieldW);
        this.isLaughing = false;
      }
    }
  }

  // returns false if completed animation, true if animation is in progress.
  moveUpAndDown() {
    if (this.y + dogH > playfieldH && !this.needsToMoveDown) {
      this.move(0, -moveSpeed);
    } else if (!this.needsToMoveDown){
      this.needsToMoveDown = true;
      this.setLocation(this.x, playfieldH - dogH);
    } else if (this.needsToMoveDown) {
      if (this.y < playfieldH) {
        this.move(0, moveSpeed);
      } else {
        this.needsToMoveDown = false;
        return false;
      }
    }
    return true;
  }

  killCurrentGoose() {
    if (this.isPickingUpGoose)
      this.geeseToPickup.shift().dead = true;
  }

  moveToNextGoose() {
    let target = this.geeseToPickup[0];
    let xPos = target.x //+ Math.floor(target.x / 2) - Math.floor(dogW / 2);
    this.setLocation(xPos, playfieldH);
  }

}
