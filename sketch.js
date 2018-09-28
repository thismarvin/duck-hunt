const screenW = 320 * 2;
const screenH = 180 * 2;

const playfieldW = screenW;
const playfieldH = screenH - 100;

let backgroundImage;
let foregroundImage;

let playfield;
let hud;

function preload() {
    this.backgroundImage = createImg('https://cdn1.imggmi.com/uploads/2018/9/28/95de8eee248cd8fe030292a0a13f5274-full.png');
    this.backgroundImage.hide();
    this.foregroundImage = createImg('https://cdn1.imggmi.com/uploads/2018/9/28/19df8e9052b7d8e2fa6a7fa98e6c1991-full.png');
    this.foregroundImage.hide();
}

function setup() {
    createCanvas(screenW, screenH);
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
    image(this.foregroundImage, 0, 0);
    this.hud.update();
}

// gets the ammo left from the hud object (i don't know of any other way to do this lol)
function getAmmoRemaining() {
  return this.hud.currentAmmo;
}
