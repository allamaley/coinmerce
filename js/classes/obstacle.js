export class Obstacle {
    constructor(x, y, z, startTime, endTime) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    isActive(currentTime) {
        return currentTime >= this.startTime && currentTime <= this.endTime;
    }
}