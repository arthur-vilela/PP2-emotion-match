const homePageDiv = document.getElementById("start-page");
const gamePageDiv = document.getElementById("start-game-div");
const scorePageDiv = document.getElementById("final-score-div");
const startGameBtn = document.getElementById("start-game-btn");
const checkScoreBtn = document.getElementById("check-score-btn");
const restartBtn = document.getElementById("restart");

const emotionDisplay = document.getElementById("emotion");
const images = document.querySelectorAll("#images img");

let emotions = {
    grief: 'path to grief.jpg',
    amazement: 'path to amazement.jpg',
    terror: 'path to terror.jpg',
    admiration: 'path to admiration.jpg',
    ecstasy: 'path to ecstasy.jpg',
    vigilance: 'path to vigilance.jpg',
    rage: 'path to rage.jpg',
    loathing: 'path to loathing.jpg',
    sadness: 'path to sadness.jpg',
    surprise: 'path to surprise.jpg',
    fear: 'path to fear.jpg',
    trust: 'path to trust.jpg',
    joy: 'path to joy.jpg',
    anticipation: 'path  o/anticipation.jpg',
    anger: 'path to anger.jpg',
    disgust: 'path to disgust.jpg'
};

function getRandomEmotions(emotions, count) {
    const keys = Object.keys(emotions);
    const randomKeys = [];

    while (randomKeys.length < count) {
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomKey = keys[randomIndex];
        if (!randomKeys.includes(randomKey)) {
            randomKeys.push(randomKey);
        }
    }

    return randomKeys;
}

function startNewGame() {
    homePageDiv.style.display = "none"; //hide the home screen and display the initial game screen
    gamePageDiv.style.display = "block";

    const selectedEmotions = getRandomEmotions(emotions, 4);
    const correctEmotionIndex = Math.floor(Math.random() * 4);
    const correctEmotion = selectedEmotions[correctEmotionIndex];

    emotionDisplay.textContent = correctEmotion;

    images.forEach((img, index) => {
        img.src = emotions[selectedEmotions[index]]; //assigns the src and alt attributes of each image element based on the randomly selected emotions.
        img.alt = selectedEmotions[index];
        img.onclick = () => checkAnswer(selectedEmotions[index], correctEmotion);
    });
}

function checkAnswer(selectedEmotion, correctEmotion) {
    if (selectedEmotion === correctEmotion) {
        alert('Correct!');
        // Still have to update score counter!
    } else {
        alert('Incorrect!');
        // Update wrong answer counter, and don't forget to change the alert for a more positive one
    }
    // add function to start a new round of images!
}

/**
 * This function will hide the game screen and
 * display the final score screen
 */
function checkScore() {
    gamePageDiv.style.display = "none";
    scorePageDiv.style.display = "block";
}

/**
 * This function will hide the final score screen and
 * display the home screen
 */
function restartGame() {
    scorePageDiv.style.display = "none";
    homePageDiv.style.display = "block";
}

startGameBtn.addEventListener("click", startNewGame);
checkScoreBtn.addEventListener("click", checkScore);
restartBtn.addEventListener("click", restartGame);
