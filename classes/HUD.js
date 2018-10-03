class HUD {
    constructor() {
        this.totalAmmo = 3;
        this.ducksPerRound = 10;
        this.flashTimer = new Timer(500);
        this.flash = false;

        this.waitForNextGooseQueue = false;
        this.currentAmmo = this.totalAmmo;
        this.shotsFired = 0;
        this.hits = 0;
        this.score = 0;
        this.round = 1;
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
        this.waitForNextGooseQueue = false;
        this.currentAmmo = this.totalAmmo;
        this.shotsFired = 0;
        this.hits = 0;
        this.score = 0;
        this.round = 1;
        this.gooseWorth = 10;
        this.headShotMultiplier = 3;
        this.progress = [];
        for (let i = 0; i < this.ducksPerRound; i++) {
            this.progress[i] = " ";
        }
        this.progressIndex = 0;
        this.redGooseSprites = [];
        this.scoreText = new Text(256 * 2, 3 * 2, "0000");
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
            this.progress[this.progressIndex] = "HIT";
            this.redGooseSprites.push(new Sprite(101 * 2 + this.progressIndex * 32, 156 * 2, 32, 32, getRedGooseImage()));
            this.progressIndex++;
            this.waitForNextGooseQueue = true;
            if (result === "Body was shot") {
                this.incrementScore(this.gooseWorth * this.round);
            }
            else if (result === "Head was shot") {
                this.incrementScore(this.gooseWorth * this.round * this.headShotMultiplier);
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
        this.round++;
        this.roundText = new Text(4 * 2, 157 * 2, "R" + this.round);
        this.progress = [];
        for (let i = 0; i < this.ducksPerRound; i++) {
            this.progress[i] = " ";
        }
        this.progressIndex = 0;
        this.redGooseSprites = [];
        // these can increase the higher the round
        this.headShotMultiplier = 3;
        this.gooseWorth = 10;
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

        // Flashes current goose index.
        if (this.flashTimer.isFinished()) {
            this.flash = !this.flash;
            this.flashTimer.reset();
        }
        if (this.flash) {
            fill(0);
            rect(101 * 2 + this.progressIndex * 16 * 2, 156 * 2, 16 * 2, 16 * 2);
        }

        //  Blackouts bullets in HUD that were already shot .
        for (let i = this.totalAmmo - this.currentAmmo - 1; i >= 0; i--) {
            fill(0);
            rect(158 - i * 16, 312, 16, 28);
        }

        // Draws score
        this.scoreText.show();
        this.roundText.show();
    }
}
