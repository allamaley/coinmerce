

# Robot Walking App
The Robot walking app is a web application that allows you to simulate the movement of a robot based on a sequence of commands and obstacles. 

move N steps forward

turn 90 degrees to the left

turn 90 degrees to the right

## Features
Reads an input file containing the obstacle locations and the robot's movement commands.

Calculates the maximum distance the robot can travel without hitting obstacles.

The robot always starts its walks facing North.



## How to Use

Open the app in your web browser.

Click the "Choose File" button and select the input file.

The app will process the file and display the maximum distance

## Input File Format

```
<number_of_obstacles> < number_of_commands >
<obstacle 1 coordinates X Y>
<obstacle 2 coordinates>
...
<obstacle n coordinates>
<command 1>
<command 2>
...
<command m>
```
commands can be:
"L" - turn left 90 degrees
"R" - turn right 90 degrees
"M n" - move n steps forward