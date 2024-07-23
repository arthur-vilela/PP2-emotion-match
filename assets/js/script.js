const homePageDiv = document.getElementById("start-page");
const gamePageDiv = document.getElementById("start-game-div");
const scorePageDiv = document.getElementById("final-score-div");
const startGameBtn = document.getElementById("start-game-btn");
const checkScoreBtn = document.getElementById("check-score-btn");
const restartBtn = document.getElementById("restart");
const instructionsBtn = document.getElementById("instructions");

const emotionDisplay = document.getElementById("emotion");
const images = document.querySelectorAll("#images img");

let emotions = {
    Grief: 'path to grief.jpg',
    Amazement: 'path to amazement.jpg',
    Terror: 'path to terror.jpg',
    Admiration: 'path to admiration.jpg',
    Ecstasy: 'path to ecstasy.jpg',
    Vigilance: 'path to vigilance.jpg',
    Rage: 'path to rage.jpg',
    Loathing: 'path to loathing.jpg',
    Sadness: 'path to sadness.jpg',
    Surprise: 'path to surprise.jpg',
    Fear: 'path to fear.jpg',
    Trust: 'path to trust.jpg',
    Joy: 'path to joy.jpg',
    Anticipation: 'path  o/anticipation.jpg',
    Anger: 'path to anger.jpg',
    Disgust: 'path to disgust.jpg'
};

let currentRound = 0;
const totalRounds = 5;
let score = 0;
let wrongAnswers = 0;

/**
 * Function to get random emotions from the emotions object
 */
function getRandomEmotions(emotions, count) {
    const keys = Object.keys(emotions);
    const randomKeys = [];

    // Loop to select random emotion keys
    while (randomKeys.length < count) {
        const randomIndex = Math.floor(Math.random() * keys.length);
        const randomKey = keys[randomIndex];
        if (!randomKeys.includes(randomKey)) {
            randomKeys.push(randomKey);
        }
    }

    return randomKeys;
}

/**
 * Function to start a new game
 */
function startNewGame() {
    homePageDiv.style.display = "none"; //hide the home screen and display the initial game screen
    gamePageDiv.style.display = "block";

    currentRound = 0; //Initial game stats
    score = 0;
    wrongAnswers = 0;

    nextRound(); // Start the first round
}

/**
 * Function to setup next round
 */
function nextRound() {
if (currentRound >= totalRounds) { // Check if it has been already five rounds
    showFinalScore();
    return;
}

    const selectedEmotions = getRandomEmotions(emotions, 4); // Select four random emotions
    const correctEmotionIndex = Math.floor(Math.random() * 4); // Select a random index for the correct answer
    const correctEmotion = selectedEmotions[correctEmotionIndex];

    console.log("Selected Emotions:", selectedEmotions); // Log selected and correct emotion for debuging
    console.log("Correct Emotion Index:", correctEmotionIndex);
    console.log("Correct Emotion:", correctEmotion);

    emotionDisplay.textContent = correctEmotion; // Display the correct emotion name in HTML

    images.forEach((img, index) => {
        img.src = emotions[selectedEmotions[index]]; //assigns the src and alt attributes of each image element based on the randomly selected emotions.
        img.alt = selectedEmotions[index];
        img.onclick = () => checkAnswer(selectedEmotions[index], correctEmotion);
    });

    currentRound++; // Increase round counter
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

    nextRound(); // Move to next round
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
 * This function hides the score page and start a new game
 */
function restartGame() {
    scorePageDiv.style.display = "none";// Hide the score page and start a new game
    startNewGame(); // Call function startNewGame to restart the game without returning to the initial page
}

function backToInstructions() {
    scorePageDiv.style.display = "none";
    homePageDiv.style.display = "block";

}
startGameBtn.addEventListener("click", startNewGame);
checkScoreBtn.addEventListener("click", checkScore);
restartBtn.addEventListener("click", restartGame);
instructionsBtn.addEventListener("click", backToInstructions);
