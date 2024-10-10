import { displayFeedback, isObstacleAt } from "./utils.js";
import { Obstacle } from "./classes/obstacle.js";
import { Robot } from "./classes/robot.js";
import { validate } from "./validation.js";

const processFile = () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];

  if (!file) {
    displayFeedback("No file selected! Please retry.");
    return;
  }
  const reader = new FileReader();

  reader.onload = function (e) {
    const content = e.target.result;
    const result = triggerRobotWalk(content);
    displayFeedback(`Max distance is ${result}`);
  };

  reader.readAsText(file);
};

const triggerRobotWalk = (input) => {
  let currentTime = 0;
  const robots = [new Robot(1, 0, 0), new Robot(2, 5, 5)];
  const lines = input.trim().split("\n");
  const header = lines[0].split(" ");
  const numberOfObstacles = parseInt(header[0]);
  const numberOfCommands = parseInt(header[1]);

  validate(numberOfObstacles, numberOfCommands, lines.length);

  const obstacles = [];
  for (let i = 1; i <= numberOfObstacles; i++) {
    const formattedObstacleLine = lines[i].replace(/\r?\n|\r/g, "");

    const [x1, y1, t1, t2] = formattedObstacleLine.split(" ").map(Number);

    let newObstacle = new Obstacle(x1, y1, t1, t2);
    obstacles.push(newObstacle);
  }
  console.log({ obstacles });

  for (let robot of robots) {
    for (let i = numberOfObstacles + 1; i < lines.length; i++) {
      const command = lines[i];
      if (command.indexOf("L") >= 0) {
        robot.rotateLeft();
      } else if (command.indexOf("R") >= 0) {
        robot.rotateRight();
      } else if (command.startsWith("M")) {
        const steps = parseInt(command.split(" ")[1]);

        for (let j = 0; j < steps; j++) {
          robot.move(
            obstacles,
            robots.filter((r) => r.id !== robot.id),
            currentTime
          );
        }
      }
      currentTime++;
    }
  }
  return robots.map(
    ({ id, maxDistance }) => `for robot#${id} is ${maxDistance.toFixed(2)}`
  );
};

window.processFile = processFile;
