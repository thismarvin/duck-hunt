const screenW = 320 * 2;
const screenH = 180 * 2;

let backgroundImage;

let playfield;
let hud;

function preload() {
    this.backgroundImage = loadImage('assets/background.png');
}

function setup() {
    createCanvas(screenW, screenH);
    this.playfield = new Playfield();
    this.hud = new HUD();
}

function mousePressed() {
    // Temporary, used to test the HUD.
    this.hud.shoot();
    this.hud.gooseWasHit(true);
}

function keyPressed() {
    // keyCode 82 is "R"
    if (keyCode === 82){
        this.hud.reset();
    }
}

function draw() {
    background(0);
    image(this.backgroundImage, 0, 0);

    this.playfield.update();
    this.hud.update();
}
