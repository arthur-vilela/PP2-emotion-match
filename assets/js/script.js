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
    Grief: 'assets/images/grief.webp',
    Amazement: 'assets/images/amazement.webp',
    Terror: 'assets/images/terror.webp',
    Admiration: 'assets/images/admiration.webp',
    Ecstasy: 'assets/images/ecstasy.webp',
    Vigilance: 'assets/images/vigilance.webp',
    Rage: 'assets/images/rage.webp',
    Loathing: 'assets/images/loathing.webp',
    Sadness: 'assets/images/sadness.webp',
    Surprise: 'assets/images/surprise.webp',
    Fear: 'assets/images/fear.webp',
    Trust: 'assets/images/trust.webp',
    Joy: 'assets/images/joy.webp',
    Anticipation: 'assets/images/anticipation.webp',
    Anger: 'assets/images/anger.webp',
    Disgust: 'assets/images/disgust.webp'
};

// Global initial variables
let currentRound = 0; // Track the current round
const totalRounds = 6; // Total number of rounds
let score = 0; // Track corect answers
let wrongAnswers = 0; // Track incorrect answers
let correctGuesses = []; // Array to store the correctly guessed emotions

/**
 * Function to get random emotions from the emotions object
 */
function getRandomEmotions(emotions, count) {
    const keys = Object.keys(emotions);
    const availableKeys = keys.filter(key => !correctGuesses.include(key)); // Filter out emotions that are also in the 'correct guesses' array
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
    correctGuesses = []; // Reset correct guesses

    nextRound(); // Start the first round
}

/**
 * Function to setup next round
 */
function nextRound() {
    if (currentRound >= totalRounds) { // Check if it has already been six rounds
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

/**
 * Function to check the selected answer
 */
function checkAnswer(selectedEmotion, correctEmotion) {
    if (selectedEmotion === correctEmotion) {
        alert('Correct!');
        score++ // Increase correct answer score
    } else {
        alert('Incorrect!');
        wrongAnswers++; // Increase wrong answer counter, and don't forget to change the alert for a more positive one
    }

    nextRound(); // Move to next round
}

/**
 * This function will hide the game screen and
 * display the final score screen
 */
function showFinalScore() {
    gamePageDiv.style.display = "none";
    scorePageDiv.style.display = "block";

    // Display the final score on HTML
    document.getElementById("final-score").textContent = `Final score: ${score} | Incorrect answers: ${wrongAnswers}`;
}

/**
 * This function hides the score page and start a new game
 */
function restartGame() {
    scorePageDiv.style.display = "none"; // Hide the score page and start a new game
    startNewGame(); // Call function startNewGame to restart the game without returning to the initial page
}

/**
 * This function returns to the home page with instructions
 */
function backToInstructions() {
    scorePageDiv.style.display = "none";
    homePageDiv.style.display = "block";

}

// Event listeners for buttons
startGameBtn.addEventListener("click", startNewGame);
checkScoreBtn.addEventListener("click", showFinalScore);
restartBtn.addEventListener("click", restartGame);
instructionsBtn.addEventListener("click", backToInstructions);