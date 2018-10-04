/*
   TODO:
    - Possibly make panic timer decrease with shots missed.
    - Add countdown timer.
    - Complete art, sounds, music, etc.
        + Make screen flash when you shoot, for effect
        + Make animations for Dog.
        + Display round, game over, etc. (text class)
 */

const screenW = 320 * 2;
const screenH = 180 * 2;
const playfieldW = screenW;
const playfieldH = screenH - 100;

// Sprites
let backgroundImage;
let foregroundImage;
let fontImage;
let redGooseImage;
let geeseRightImage;
let geeseLeftImage;

let playfield;
let hud;

function preload() {
    this.backgroundImage = createImg('https://cdn1.imggmi.com/uploads/2018/9/28/95de8eee248cd8fe030292a0a13f5274-full.png');
    this.backgroundImage.hide();
    this.foregroundImage = createImg('https://cdn1.imggmi.com/uploads/2018/9/28/19df8e9052b7d8e2fa6a7fa98e6c1991-full.png');
    this.foregroundImage.hide();
    this.fontImage = createImg('https://cdn1.imggmi.com/uploads/2018/10/2/f99cd60631585be006760c659cdf41df-full.png');
    this.fontImage.hide();
    this.redGooseImage = createImg('https://cdn1.imggmi.com/uploads/2018/9/27/b412c3e57c886f822060a44772606d68-full.png');
    this.redGooseImage.hide();
    this.geeseRightImage = createImg('https://cdn1.imggmi.com/uploads/2018/10/3/e56c9fffcc423412bf673d7865f08aed-full.png');
    this.geeseRightImage.hide();
    this.geeseLeftImage = createImg('https://cdn1.imggmi.com/uploads/2018/10/3/c050d65e661848275bcdb37e99463398-full.png');
    this.geeseLeftImage.hide();
}

function setup() {
    createCanvas(screenW, screenH);
    this.hud = new HUD();
    this.playfield = new Playfield();
}

function mousePressed() {
    // Handles when the player shoots at a goose.
    if (this.hud.ammoAvailable()) {
        this.hud.shoot();
        let result = this.playfield.wasAGooseHitAt(mouseX, mouseY);
        if (result === "Body was shot" || result === "Head was shot") {
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

// Getters for sprites
function getFontImage() {
    return this.fontImage;
}

function getRedGooseImage() {
    return this.redGooseImage;
}

function getGeeseRightImage(){
    return this.geeseRightImage;
}

function getGeeseLeftImage(){
    return this.geeseLeftImage;
}


// Getters for HUD
function getAmmoRemaining() {
    return this.hud.currentAmmo;
}

function getCurrentRound() {
    return this.hud.round;
}

function getProgressIndex() {
    return this.hud.progressIndex;
}

function getDucksPerRound() {
    return this.hud.ducksPerRound;
}

function getNumShotsMissed() {
    return this.hud.shotsFired - this.hud.hits;
}

// Global access to functions in Playfield
function spawnNewGoose() {
    this.playfield.spawnNewGoose();
}

function lastGooseCanFlyAway() {
    this.playfield.lastGooseCanFlyAway();
}

// Global access to functions in HUD
function reload() {
    this.hud.reload();
}
