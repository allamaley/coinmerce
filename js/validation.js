export const validate = (numberOfObstacles, numberOfCommands, linesAmount) => {
    if (isNaN(numberOfObstacles) || isNaN(numberOfCommands)) {
        displayFeedback('header not properly formatted');
        throw new Error('header not properly formatted');
    }
    if (numberOfObstacles < 1 || numberOfObstacles > 10) {
        displayFeedback('obstacles count must be between 1 and 10');
        throw new Error('obstacles count must be between 1 and 10');
    }
    if (numberOfCommands < 1 || numberOfCommands > 10000) {
        displayFeedback('command amunt must be between 1 and 10000');
        throw new Error('command amunt be between 1 and 10000');
    }
    const actualAmountofCommands = linesAmount - (numberOfObstacles + 1);
    if (actualAmountofCommands !== numberOfCommands) {
        displayFeedback('actual commands amount is more or less than given in the head');
        throw new Error('actual commands amount is more or less than given in the head');
    }
}