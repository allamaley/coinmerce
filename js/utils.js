export const displayFeedback = (message) => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerText = `Message: ${message}`;
};

export const isObstacleAt = (x, y, z, currentTime, obstacles) => {
  return obstacles.some(
    (obstacle) =>
      obstacle.x === x &&
      obstacle.y === y &&
      obstacle.z === z &&
      obstacle.isActive(currentTime)
  );
};

export const isRobotAt = (x, y, z, robots) => {
  return robots.some(
    (robot) => robot.x === x && robot.y === y && robot.z === z
  );
};
