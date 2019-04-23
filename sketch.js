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
    this.backgroundImage = createImg();
    this.backgroundImage.hide();
    this.foregroundImage = createImg('https://cdn1.imggmi.com/uploads/2018/9/28/19df8e9052b7d8e2fa6a7fa98e6c1991-full.png');
    this.foregroundImage.hide();
    this.fontImage = createImg('https://cdn1.imggmi.com/uploads/2018/10/2/f99cd60631585be006760c659cdf41df-full.png');
    this.fontImage.hide();
    this.redGooseImage = createImg('https://cdn1.imggmi.com/uploads/2018/10/5/823a93c264e1b39e5262b03ad63b78f2-full.png');
    this.redGooseImage.hide();
    this.geeseRightImage = createImg('https://cdn1.imggmi.com/uploads/2018/10/5/7317b96072ef3c842c8ebe01f6fda56c-full.png');
    this.geeseRightImage.hide();
    this.geeseLeftImage = createImg('https://cdn1.imggmi.com/uploads/2018/10/5/1bd4fdd3512bf37eeac3e9d92d69398b-full.png');
    this.geeseLeftImage.hide();
    this.lionGrabImage = createImg('https://cdn1.imggmi.com/uploads/2018/10/5/c2ca838d8b85de1c3bf708b6888a59b4-full.png');
    this.lionGrabImage.hide();
    this.deadGeeseImage = createImg('https://cdn1.imggmi.com/uploads/2018/10/5/83316a2ec11ab84718688c030f3e88e5-full.png');
    this.deadGeeseImage.hide();
    this.lionLaughImage = createImg('https://cdn1.imggmi.com/uploads/2018/10/7/dffeeaf2f8670fdab45754702f47377c-full.png');
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
