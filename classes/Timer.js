class Timer {
  constructor(duration) {
    this.lastUpdate = Date.now()
    this.duration = duration;
  }

  isFinished() {
    let delta = Math.floor(Date.now()) - this.lastUpdate;
    if (delta >= this.duration) {
      return true;
    }
    return false;
  }

  reset() {
    this.lastUpdate = Math.floor(Date.now());
  }
}
