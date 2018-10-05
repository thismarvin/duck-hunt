class HUD {
    constructor() {
        this.totalAmmo = 3;
        this.ducksPerRound = 10;
        this.flashTimer = new Timer(500);
        this.flash = false;
        this.headShotPrompt = new Text(6, 6, "HEADSHOT");
        this.showHeadShotPrompt = false;
        this.flashCount = 0;
        this.totalFlashes = 3;
        this.flashTimerText = new Timer(500);
        this.textFlash = false;
        this.minimumKills = 6;
        this.toggledGameOver = false;

        this.waitForNextGooseQueue = false;
        this.currentAmmo = this.totalAmmo;
        this.shotsFired = 0;
        this.hits = 0;
        this.score = 0;
        this.round = 1;
        this.killsInRound = 0;
        this.gooseWorth = 10;
        this.headShotMultiplier = 3;
        this.progress = [];
        for (let i = 0; i < this.ducksPerRound; i++) {
            this.progress[i] = " ";
        }
        this.progressIndex = 0;
        this.redGooseSprites = [];
        this.scoreText = new Text(256 * 2, 3 * 2, "0000");
        this.roundText = new Text(4 * 2, 157 * 2, "R" + this.round);
    }

    reset() {
        this.toggledGameOver = false;
        this.waitForNextGooseQueue = false;
        this.currentAmmo = this.totalAmmo;
        this.shotsFired = 0;
        this.hits = 0;
        this.score = 0;
        this.round = 1;
        this.killsInRound = 0;
        this.gooseWorth = 10;
        this.headShotMultiplier = 3;
        this.progress = [];
        for (let i = 0; i < this.ducksPerRound; i++) {
            this.progress[i] = " ";
        }
        this.progressIndex = 0;
        this.redGooseSprites = [];
        this.scoreText = new Text(256 * 2, 3 * 2, "0000");
        this.roundText = new Text(4 * 2, 157 * 2, "R" + this.round);
    }

    reload() {
        this.currentAmmo = this.totalAmmo;
        this.waitForNextGooseQueue = false;
    }

    ammoAvailable() {
        let result = this.currentAmmo > 0;
        if (this.waitForNextGooseQueue) {
            result = false;
        }
        return result;
    }

    shoot() {
        if (this.currentAmmo > 0) {
            this.currentAmmo--;
            this.shotsFired++;
        }
    }

    parseResultOfShot(result) {
        if (result === "Body was shot" || result === "Head was shot") {
            this.hits++;
            this.killsInRound++;
            this.progress[this.progressIndex] = "HIT";
            this.redGooseSprites.push(new Sprite(101 * 2 + this.progressIndex * 32, 156 * 2, 32, 32, getRedGooseImage()));
            this.progressIndex++;
            this.waitForNextGooseQueue = true;
            if (result === "Body was shot") {
                this.incrementScore(this.gooseWorth * this.round);
            }
            else if (result === "Head was shot") {
                this.incrementScore(this.gooseWorth * this.round * this.headShotMultiplier);
                this.showHeadShotPrompt = true;
                this.flashTimerText.reset();
            }
        }
    }

    incrementScore(amount) {
        this.score += amount;
        let buffer = this.score.toString();
        if (buffer.length < 4) {
            let leadingZeros = "";
            for (let i = 0; i < 4 - buffer.length; i++) {
                leadingZeros += "0";
            }
            buffer = leadingZeros + buffer;
        }
        this.scoreText.change(buffer);
    }

    roundLogic() {
        if (this.toggledGameOver)
            return;

        if (this.progressIndex < this.ducksPerRound && this.currentAmmo <= 0 && !this.waitForNextGooseQueue) {
            this.progress[this.progressIndex] = "MISS";
            this.progressIndex++;
            this.waitForNextGooseQueue = true;
            lastGooseCanFlyAway();
        }

        if (this.progressIndex >= this.ducksPerRound) {
            this.initializeNextRound();
        }
    }

    initializeNextRound() {
        if (this.killsInRound < this.minimumKills) {
            this.toggledGameOver = true;
            toggleGameOver();
            return;
        }
        this.round++;
        this.killsInRound = 0;
        this.roundText = new Text(4 * 2, 157 * 2, "R" + this.round);
        this.progress = [];
        for (let i = 0; i < this.ducksPerRound; i++) {
            this.progress[i] = " ";
        }
        this.progressIndex = 0;
        this.redGooseSprites = [];
        // these can increase the higher the round
        this.headShotMultiplier = 3 * this.round;
        this.gooseWorth = 10 * this.round;
    }

    update() {
        this.roundLogic();
        this.show();
    }

    show() {
        // Draws indicators of the goose shot during the current round
        this.redGooseSprites.forEach(sprite => {
            sprite.show();
        });

        if (this.showHeadShotPrompt) {
            if (this.flashTimerText.isFinished()) {
                this.textFlash = !this.textFlash;
                this.flashCount++;
                this.flashTimerText.reset();
            }
            if (this.flashCount > this.totalFlashes) {
                this.showHeadShotPrompt = false;
                this.flashCount = 0;
            }
        }

        // Flashes current goose index.
        if (this.flashTimer.isFinished()) {
            this.flash = !this.flash;
            this.flashTimer.reset();
        }
        if (this.flash) {
            fill(0);
            if (this.progressIndex < this.ducksPerRound) {
                rect(101 * 2 + this.progressIndex * 16 * 2, 156 * 2, 16 * 2, 16 * 2);
            }
        }

        //  Blackouts bullets in HUD that were already shot.
        for (let i = this.totalAmmo - this.currentAmmo - 1; i >= 0; i--) {
            fill(0);
            rect(158 - i * 16, 312, 16, 28);
        }

        // Draws score
        this.scoreText.show();
        this.roundText.show();
        if (this.showHeadShotPrompt && this.textFlash) {
            this.headShotPrompt.show();
        }
    }
}
