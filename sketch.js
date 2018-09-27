const screenW = 320 * 2;
const screenH = 180 * 2;

let backgroundImage;

let playfield;
let hud;

function preload() {

    //this.backgroundImage = loadImage('assets/background.png');
    
}

function setup() {
    createCanvas(screenW, screenH);
    this.backgroundImage = createImg('https://cdn1.imggmi.com/uploads/2018/9/27/d71796736c56971a86c4a36fc32b306c-full.png');
    this.backgroundImage.hide();

    this.playfield = new Playfield();
    this.hud = new HUD();
}

function mousePressed() {
    // Handles when the player shoots at a goose.
    if (this.hud.ammoAvailable()) {
        this.hud.shoot();
        let result = this.playfield.wasAGooseHitAt(mouseX, mouseY);
        if (result) {
            this.hud.reload();
        }
        this.hud.parseResultOfShot(result);
    }
}

function keyPressed() {
    // Press R to reset HUD and Playfield.
    if (keyCode === 82) {
        this.hud.reset();
        this.playfield.reset();
    }
}

function draw() {
    background(0);
    image(this.backgroundImage, 0, 0);

    this.playfield.update();
    this.hud.update();
}
