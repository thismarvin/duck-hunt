class Playfield {
  constructor() {
    this.geese = [];
    this.dog = new Dog();
    this.isGameOver = false;
    this.queueNewGoose = false;
    this.pickingUpGoose = false;
    this.spawnNewGoose();
  }

  reset() {
    this.geese = [];
    this.dog = new Dog();
    this.isGameOver = false;
    this.spawnNewGoose();
  }

  spawnNewGoose() {
    this.queueNewGoose = false;
    if (getProgressIndex() < getDucksPerRound()) {
      reload();
      if (floor(Math.random() * 2) % 2 == 0) {
        this.geese.push(new Goose(16, 16 + floor(Math.random() * playfieldH / 2), 5));
      }
      else {
        this.geese.push(new Goose(playfieldW - 60 * 2, 16 + floor(Math.random() * playfieldH / 2), 5));
        this.geese[this.geese.length - 1].invertDirection();
      }
    }
  }

  removeGeese() {
    for (let i = this.geese.length - 1; i >= 0; i--) {
      if (this.geese[i].dead) {
        this.geese.splice(i, 1);
        this.queueNewGoose = true;
        this.pickingUpGoose = false;
      }
      else if (this.geese[i].hasFallen && !this.pickingUpGoose) {
        this.dog.queueGoose(this.geese[i]);
        this.pickingUpGoose = true;
      }
    }
    if (this.queueNewGoose) {
      spawnNewGoose();
    }
  }

  lastGooseCanFlyAway() {
    if (this.geese.length <= 0)
      return;
    this.geese[this.geese.length - 1].shouldFlyAway = true;
  }

  wasAGooseHitAt(x, y) {
    let mouseCollRect = new Rectangle(x, y, 1, 1);
    let result = "Missed";
    this.geese.forEach(goose => {
      if ((mouseCollRect.intersects(goose.bodyHitbox) || mouseCollRect.intersects(goose.headHitbox)) && !goose.shouldFall) {
        goose.shouldFall = true;
        result = mouseCollRect.intersects(goose.headHitbox) ? "Head was shot" : "Body was shot";
      } else {
        goose.invertDirectionRandom();
      }
    });
    return result;
  }

  updateGeese() {
    this.geese.forEach(goose => {
      goose.update();
    });
    this.removeGeese();
  }

  update() {
    this.dog.update();
    this.updateGeese();
  }
}
