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

        this.redDuck =  loadImage('assets/redDuck.png');
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

        this.progressIndex = this.progressIndex + 1 < this.ducksPerRound ? ++this.progressIndex : this.progressIndex;
    }

    update() {
        this.show();
    }

    show() {
        for (let i = 0; i < this.progress.length; i++) {
            switch (this.progress[i]) {
                case "HIT":
                    fill(255, 0, 77);
                    image(this.redDuck, 202 + i * 32, 312);
                    break;
                case "MISS":

                    break;
            }
        }

        for (let i = this.totalAmmo - this.currentAmmo - 1; i >= 0; i--){
            fill(0);
            rect(158 - i * 16 ,312,16,28);
        }

    }
}