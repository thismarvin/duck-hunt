class HUD {
    constructor() {
        this.totalAmmo = 3;
        this.currentAmmo = this.totalAmmo;
        this.shotsFired = 0;
        this.hits = 0;

        this.score = 0;
        this.round = 1;
        this.ducksPerRound = 10;
        this.progress = [];
        for (let i = 0; i < this.ducksPerRound; i++) {
            this.progress[i] = " ";
        }
        this.progressIndex = 0;

        this.timeLeft = 1000 * 5;
    }

    reset() {
        this.totalAmmo = 3;
        this.currentAmmo = this.totalAmmo;
        this.shotsFired = 0;
        this.hits = 0;

        this.score = 0;
        this.round = 1;
        this.ducksPerRound = 10;
        this.progress = [];
        for (let i = 0; i < this.ducksPerRound; i++) {
            this.progress[i] = " ";
        }
        this.progressIndex = 0;

        this.timeLeft = 1000 * 5;
    }

    shoot() {
        if (this.currentAmmo > 0) {
            this.currentAmmo--;
            this.shotsFired++;
        }

    }

    gooseWasHit(result) {
        if (result) {
            this.hits++;
            this.progress[this.progressIndex] = "HIT";
        } else {
            this.progress[this.progressIndex] = "MISS";
        }
        this.progressIndex++;
    }

    update() {
        this.show();
    }

    show() {
        for (let i = 0; i < this.progress.length; i++) {
            switch (this.progress[i]) {
                case "HIT":
                    fill(255, 0, 77);
                    rect(i * 8, 8, 7, 7);
                    break;
                case "MISS":
                    fill(255);
                    rect(i * 8, 8, 7, 7);
                    break;
                case " ":
                    fill(255);
                    rect(i * 8, 8, 7, 7);
                    break;
            }
        }
    }
}