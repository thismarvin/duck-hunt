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
    this.backgroundImage = createImg('https://user-images.githubusercontent.com/43303199/56609699-5f20ca00-65d3-11e9-854a-b2fbbe3c69aa.png');
    this.foregroundImage = createImg('https://user-images.githubusercontent.com/43303199/56609815-a8711980-65d3-11e9-9089-4619592fe6cf.png');
    this.fontImage = createImg('https://user-images.githubusercontent.com/43303199/56609814-a8711980-65d3-11e9-91f8-08799d580512.png');
    this.redGooseImage = createImg('https://user-images.githubusercontent.com/43303199/56609821-a909b000-65d3-11e9-8a66-8b752d1fe303.png');
    this.geeseRightImage = createImg('https://user-images.githubusercontent.com/43303199/56609818-a8711980-65d3-11e9-89f4-51c574f79a73.png');
    this.geeseLeftImage = createImg('https://user-images.githubusercontent.com/43303199/56609817-a8711980-65d3-11e9-8162-d88960c4f33f.png');
    this.lionGrabImage = createImg('https://user-images.githubusercontent.com/43303199/56609819-a909b000-65d3-11e9-9cb6-e022e4f6eb69.png');
    this.deadGeeseImage = createImg('https://user-images.githubusercontent.com/43303199/56609813-a8711980-65d3-11e9-9de4-8b3d402ff9bc.png');
    this.lionLaughImage = createImg('https://user-images.githubusercontent.com/43303199/56609820-a909b000-65d3-11e9-91ea-d8b732a11ad5.png');

    this.backgroundImage.hide();
    this.foregroundImage.hide();
    this.fontImage.hide();
    this.redGooseImage.hide();
    this.geeseRightImage.hide();
    this.geeseLeftImage.hide();
    this.lionGrabImage.hide();
    this.deadGeeseImage.hide();
    this.lionLaughImage.hide();
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
