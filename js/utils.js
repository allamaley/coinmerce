export const displayFeedback = (message) => {
    const resultDiv = document.getElementById('result');
    resultDiv.innerText = `Message: ${message}`;
}