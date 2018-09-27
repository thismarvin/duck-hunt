class Dog extends Entity {
    constructor(x, y) {
        super(x, y, 1, 1);

    }

    update() {
        this.show();

      }
    
      show() {
        super.show();
      }
}