import { validate } from './validation.js';

const processFile = () => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (!file) {
        displayFeedback('No file selected! Please retry.');
        return;
    }
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;
        const result = triggerRobotWalk(content);
        displayFeedback(`Max distance is ${result.toFixed(2)}`);
    };

    reader.readAsText(file);
}

const displayFeedback = (message) => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = `Message: ${message}`;
}

const triggerRobotWalk = (input) => {
    const lines = input.trim().split('\n');
    const header = lines[0].split(' ');
    const numberOfObstacles = parseInt(header[0]);
    const numberOfCommands = parseInt(header[1]);

    validate(numberOfObstacles, numberOfCommands, lines.length);

    const obstacles = [];
    for (let i = 1; i <= numberOfObstacles; i++) {
        obstacles.push(lines[i]);
    }

    let x = 0, y = 0;
    let direction = 0; 
    let maxDistance = 0;

    for (let i = numberOfObstacles + 1; i < lines.length; i++) {
        const command = lines[i];
        if (command === 'L') {
            direction = (direction - 1 + 4) % 4;
        } else if (command === 'R') {
            direction = (direction + 1) % 4;
        } else if (command.startsWith('M')) {
            const steps = parseInt(command.split(' ')[1]);
            for (let j = 0; j < steps; j++) {
                let newX = x, newY = y;
                switch (direction) {
                    case 0: newY++; break;
                    case 1: newX++; break;
                    case 2: newY--; break;
                    case 3: newX--; break;
                }
                if (!obstacles.includes(`${newX} ${newY}`)) {
                    x = newX;
                    y = newY;
                    maxDistance = Math.max(maxDistance, Math.sqrt(x*x + y*y));
                }
            }
        }
    }

    return maxDistance;
}

window.processFile = processFile;
