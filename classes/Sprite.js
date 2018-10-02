class Sprite {
    constructor(x, y, sWidth, sHeight, spriteSheet, sourceX=0, sourceY=0) {
        this.x = x;
        this.y = y;

        this.sWidth = sWidth;
        this.sHeight = sHeight;

        this.sourceX = sourceX * sWidth;
        this.sourceY = sourceY * sWidth;

        this.spriteSheet = spriteSheet;
    }

    show() {
        image(this.spriteSheet, this.x, this.y, this.sWidth, this.sHeight, this.sourceX, this.sourceY, this.sWidth, this.sHeight);
    }
}