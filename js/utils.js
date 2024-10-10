export const displayFeedback = (message) => {
  const resultDiv = document.getElementById("result");
  resultDiv.innerText = `Message: ${message}`;
};

export const isObstacleAt = (x, y, currentTime, obstacles) => {
  return obstacles.some(
    (obstacle) =>
        checkForMatch(obstacles, `${x} ${y}` ) && isActive(currentTime, obstacle)
  );
};

function checkForMatch(arr, searchString) {
    return arr.some(element => {
      let parts = element.split(' ');
      return `${parts[0]} ${parts[1]}` === searchString;
    });
  }

const isActive = (currentTime, obstacle) => {
    console.log(currentTime >= parseInt(obstacle.split(" ")[2]) &&
    currentTime <= parseInt(obstacle.split(" ")[3]))
  return (
    currentTime >= parseInt(obstacle.split(" ")[2]) &&
    currentTime <= parseInt(obstacle.split(" ")[3])
  );
};
