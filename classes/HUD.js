class HUD {
    constructor() {
        this.totalAmmo = 3;
        this.currentAmmo = this.totalAmmo;
        this.shotsFired = 0;
        this.hits = 0;
        this.score = 0;
        this.round = 1;
        this.gooseWorth = 10;
        this.headShotMultiplier = 3;
        this.ducksPerRound = 10;
        this.progress = [];
        for (let i = 0; i < this.ducksPerRound; i++) {
            this.progress[i] = " ";
        }
        this.progressIndex = 0;
        this.timeLeft = 1000 * 5; // not sure how im going to implement this yet

        this.redGooseSprites = [];
        this.scoreText = new Text(256 * 2, 3 * 2, "0000");
    }

    reset() {
        this.totalAmmo = 3;
        this.currentAmmo = this.totalAmmo;
        this.shotsFired = 0;
        this.hits = 0;
        this.score = 0;
        this.round = 1;
        this.headShotMultiplier = 3;
        this.gooseWorth = 10;
        this.ducksPerRound = 10;
        this.progress = [];
        for (let i = 0; i < this.ducksPerRound; i++) {
            this.progress[i] = " ";
        }
        this.progressIndex = 0;
        this.timeLeft = 1000 * 5;
        this.redGooseSprites = [];
        this.scoreText = new Text(256 * 2, 3 * 2, "0000");
    }

    reload() {
        this.currentAmmo = this.totalAmmo;
    }

    ammoAvailable() {
        return this.currentAmmo > 0;
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
            this.redGooseSprites.push(new Sprite(202 + this.progressIndex * 32, 312, 32, 32, getRedGooseImage()));

            if (result === "Body was shot") {
                this.incrementScore(this.gooseWorth * this.round);
            }
            else if (result === "Head was shot") {
                this.incrementScore(this.gooseWorth * this.round * this.headShotMultiplier);
            }
            this.progressIndex = this.progressIndex + 1 < this.ducksPerRound ? ++this.progressIndex : this.progressIndex;
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
        if (this.currentAmmo <= 0) {
            this.progress[this.progressIndex] = "MISS";
            this.progressIndex = this.progressIndex + 1 < this.ducksPerRound ? ++this.progressIndex : this.progressIndex;
            //this.currentAmmo = this.totalAmmo;
            // you need to call the goose to fly away!
        }
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

        //  Blackouts bullets in HUD that were already shot .
        for (let i = this.totalAmmo - this.currentAmmo - 1; i >= 0; i--) {
            fill(0);
            rect(158 - i * 16, 312, 16, 28);
        }

        this.scoreText.show();
    }
}
