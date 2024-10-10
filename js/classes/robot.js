import { isObstacleAt, isRobotAt } from "../utils.js";

export class Robot {
  constructor(id, x, y, z) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.z = z;
    this.direction = [0, 0, 1];
    this.maxDistance = 0;
    this.startingPorisionX = x;
    this.startingPorisionY = y;
    this.startingPorisionZ = z;
  }

  move(obstacles, otherRobots, currentTime, steps = 1) {
    let newX = this.x + this.direction[0] * steps;
    let newY = this.y + this.direction[1] * steps;
    let newZ = this.z + this.direction[2] * steps;
    if (
      !isObstacleAt(newX, newY, newZ, currentTime, obstacles) &&
      !isRobotAt(newX, newY, newZ, otherRobots)
    ) {
      this.x = newX;
      this.y = newY;
      this.z = newZ;
      this.maxDistance = Math.max(
        this.maxDistance,
        Math.sqrt(
          (this.x - this.startingPorisionX) ** 2 +
            (this.y - this.startingPorisionY) ** 2 +
            (this.z - this.startingPorisionZ) ** 2
        )
      );
    }
  }

  turn(yawDegrees) {
    const radians = (yawDegrees * Math.PI) / 180;
    const [dx, dy, dz] = this.direction;
    this.direction[0] = dx * Math.cos(radians) - dz * Math.sin(radians);
    this.direction[2] = dx * Math.sin(radians) + dz * Math.cos(radians);
  }
  
  pitch(pitchDegrees) {
    const radians = (pitchDegrees * Math.PI) / 180;
    const [dx, dy, dz] = this.direction;

    this.direction[1] = dy * Math.cos(radians) - dz * Math.sin(radians);
    this.direction[2] = dy * Math.sin(radians) + dz * Math.cos(radians);
  }

  roll(rollDegrees) {
    const radians = (rollDegrees * Math.PI) / 180;
    const [dx, dy, dz] = this.direction;

    this.direction[0] = dx * Math.cos(radians) - dy * Math.sin(radians);
    this.direction[1] = dx * Math.sin(radians) + dy * Math.cos(radians);
  }
}
