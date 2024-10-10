export class Obstacle {
    constructor(x, y, startTime, endTime) {
        this.x = x;
        this.y = y;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    isActive(currentTime) {
        return currentTime >= this.startTime && currentTime <= this.endTime;
    }
}