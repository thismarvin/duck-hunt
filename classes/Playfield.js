class Playfield {
  constructor() {
    this.geese = []; //new Array(); // ???
    //this.mouseX = 0; // mouseX and mouseY already exist in p5
    //this.mouseY = 0;
    this.dog = new Dog();
    this.isGameOver = false;

    // Temporary, for debugging
    this.geese.push(new Goose(16, 16, 5));
  }


  reset() {
    this.geese = [];
    this.dog = new Dog();
    this.isGameOver = false;

    // Temporary, for debugging
    this.geese.push(new Goose(16, 16, 5));
  }

  removeGeese() {
    for (let i = this.geese.length - 1; i >= 0; i--) {
      if (this.geese[i].dead) {
        this.geese.splice(i, 1);
      }
    }
  }

  wasAGooseHitAt(x, y) {
    let mouseCollRect = new Rectangle(x, y, 1, 1);
    let result = "Missed";
    this.geese.forEach(goose => {
      if (mouseCollRect.intersects(goose.bodyHitbox)) {
        goose.shouldFall = true;
        result = "Body was shot";
      } else if (mouseCollRect.intersects(goose.headHitbox)) {
        goose.shouldFall = true;
        result = "Head was shot";
      } else {
        goose.invertDirectionRandom();
      }
    });
    return result;
  }

  updateGeese() {
    this.geese.forEach(goose => {
      goose.shouldFlyAway = getAmmoRemaining() == 0;
      goose.update();
    });
    this.removeGeese();
  }

  update() {
    this.updateGeese();
    //this.dog.update();
  }
}
