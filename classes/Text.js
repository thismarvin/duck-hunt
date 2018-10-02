const textWidth = 19 * 2;
const spacingWidth = 14 * 2;

class Text {
    constructor(x, y, text) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.sprites = [];   
        for (let i = text.length - 1; i >= 0; i--) {
            this.sprites.push(new Sprite(this.x + i * (spacingWidth), this.y, textWidth, textWidth, getFontImage(),text.charCodeAt(i) % 16, floor(text.charCodeAt(i) / 16)));
        }
    }
 
    change(text) {
        this.sprites = [];
        for (let i = text.length - 1; i >= 0; i--) {
            this.sprites.push(new Sprite(this.x + i * (spacingWidth), this.y, textWidth, textWidth, getFontImage(),text.charCodeAt(i) % 16, floor(text.charCodeAt(i) / 16)));
        }
    }

    show() {
        this.sprites.forEach(sprite => {
            sprite.show();          
        });
    }
}