export const displayFeedback = (message) => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = `Message: ${message}`;
}

export const isObstacleAt = (x, y, currentTime, obstacles) => {
    return obstacles.some(obstacle => 
        obstacle.x === x && obstacle.y === y && obstacle.isActive(currentTime)
    );
}
export const isRobotAt = (x, y, robots) => {
    return robots.some(robot => robot.x === x && robot.y === y);
}