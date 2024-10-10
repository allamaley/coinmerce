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
  const robots = [new Robot(1, 0, 0, 0)];
  const lines = input.trim().split("\n");
  const header = lines[0].split(" ");
  const numberOfObstacles = parseInt(header[0]);
  const numberOfCommands = parseInt(header[1]);

  validate(numberOfObstacles, numberOfCommands, lines.length);

  const obstacles = [];
  for (let i = 1; i <= numberOfObstacles; i++) {
    const formattedObstacleLine = lines[i].replace(/\r?\n|\r/g, "");

    const [x, y, z, t1, t2] = formattedObstacleLine.split(" ").map(Number);

    let newObstacle = new Obstacle(x, y, z, t1, t2);
    obstacles.push(newObstacle);
  }
  console.log({ obstacles });

  for (let robot of robots) {
    for (let i = numberOfObstacles + 1; i < lines.length; i++) {
      const command = lines[i];

      const [action, value] = command.split(" ");
      const angle = parseInt(value);

      switch (action) {
        case "L":
          robot.turn(-angle);
          break;
        case "R":
          robot.turn(angle);
          break;
        case "U":
          robot.pitch(angle);
          break;
        case "D":
          robot.pitch(-angle);
          break;
        case "RL":
          robot.roll(-angle);
          break;
        case "RR":
          robot.roll(angle);
          break;
        case "M":
          robot.move(
            obstacles,
            robots.filter((r) => r.id !== robot.id),
            currentTime,
            value
          );
          break;
        default:
          console.error(`Unknown command: ${command}`);
      }
      currentTime++;
    }
  }
  return robots.map(
    ({ id, maxDistance }) => `for robot#${id} is ${maxDistance.toFixed(2)}`
  );
};

window.processFile = processFile;
