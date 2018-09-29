class Timer {
  constructor(duration) {
    this.lastUpdate = Math.floor(Date.now() / 1000); // works in seconds.
    this.duration = duration;
  }

  isFinished() {
    let delta = Math.floor(Date.now() / 1000) - this.lastUpdate;
    if (delta >= this.duration) {
      return true;
    }
    return false;
  }

  reset() {
    this.lastUpdate = Math.floor(Date.now() / 1000);
  }
}
