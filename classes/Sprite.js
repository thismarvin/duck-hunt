class Sprite {
    constructor(x, y, sWidth, sHeight, spriteSheet, sourceX = 0, sourceY = 0) {
        this.x = x;
        this.y = y;
        this.sWidth = sWidth;
        this.sHeight = sHeight;
        this.sourceX = sourceX * sWidth;
        this.sourceY = sourceY * sHeight;
        this.spriteSheet = spriteSheet;

        // temp
        this.timer = new Timer(80);
        this.frame = 0;
    }

    setLocation(x, y) {
        this.x = x;
        this.y = y;
    }

    setSpriteSheet(spriteSheet){
        this.spriteSheet = spriteSheet;
    }

    // temp
    update() {
        if (this.timer.isFinished()) {
            this.frame = this.frame + 1 > 7 ? 0 : ++this.frame;
            this.sourceX = this.frame * this.sWidth;
            this.timer.reset();
        }
    }

    show() {
        image(this.spriteSheet, this.x, this.y, this.sWidth, this.sHeight, this.sourceX, this.sourceY, this.sWidth, this.sHeight);
    }
}