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
let lionGrabImage;
let deadGeeseImage;
let lionLaughImage;

let playfield;
let hud;

function preload() {
    this.backgroundImage = loadImage('assets/Background.png');
    this.foregroundImage = loadImage('assets/Foreground.png');
    this.fontImage = loadImage('assets/font.png');
    this.redGooseImage = loadImage('assets/Red Duck.png');
    this.geeseRightImage = loadImage('assets/geeseRight.png');
    this.geeseLeftImage = loadImage('assets/geeseLeft.png');
    this.lionGrabImage = loadImage('assets/lionGrab.png');
    this.deadGeeseImage = loadImage('assets/deadGeese.png');
    this.lionLaughImage = loadImage('assets/lionLaugh.png');
}

function setup() {
    createCanvas(screenW, screenH);
    this.hud = new HUD();

    this.playfield = new Playfield();
}

function mousePressed() {
    // Only registers a shot if the mouse is within the sketch.
    if (mouseX < 0 || mouseX > screenW || mouseY < 0 || mouseY > screenH)
        return;
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
        masterReset();
    }
}

function masterReset(){
    this.hud.reset();
    this.playfield.reset();
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

function getLionGrabImage(){
    return this.lionGrabImage;
}

function getDeadGeeseImage(){
    return this.deadGeeseImage;
}

function getLionLaughImage(){
    return this.lionLaughImage;
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

function toggleGameOver(){
    this.playfield.toggleGameOver();
}

// Global access to functions in HUD
function reload() {
    this.hud.reload();
}
