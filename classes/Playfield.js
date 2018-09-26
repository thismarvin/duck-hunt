class Playfield {
  constructor() {
    this.geese = new Array();
    this.mouseX = 0;
    this.mouseY = 0;
    //this.dog = new Dog();
    this.isGameOver = false;
  }

  removeGeese() {
    for (let i = this.geese.length - 1; i <= 0; i--) {
      if (this.geese[i].dead) {
        this.geese[i].splice(i, 1);
      }
    }
  }

  shotsFiredAt(x, y) {

  }

  reset() {

  }

  update() {

    // Have this here at the end so we dont have to call both methods in sketch.js
    this.show();
  }

  show() {

  }
}
