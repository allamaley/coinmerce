import { isObstacleAt, isRobotAt } from "../utils.js";

export class Robot {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.direction = 0;
    this.maxDistance = 0;
    this.startingPorisionX = x;
    this.startingPorisionY = y;
  }

  move(obstacles, otherRobots, currentTime) {
    let newX = this.x,
      newY = this.y;
    switch (this.direction) {
      case 0:
        newY++;
        break;
      case 1:
        newX++;
        break;
      case 2:
        newY--;
        break;
      case 3:
        newX--;
        break;
    }
    if (
      !isObstacleAt(newX, newY, currentTime, obstacles) &&
      !isRobotAt(newX, newY, otherRobots)
    ) {
      this.x = newX;
      this.y = newY;
      this.maxDistance = Math.max(
        this.maxDistance,
        Math.sqrt(
          (this.x - this.startingPorisionX) ** 2 +
            (this.y - this.startingPorisionY) ** 2
        )
      );
    }
  }

  rotateLeft() {
    this.direction = (this.direction - 1 + 4) % 4;
  }

  rotateRight() {
    this.direction = (this.direction + 1) % 4;
  }
}
