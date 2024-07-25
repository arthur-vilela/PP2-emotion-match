const homePageDiv = document.getElementById("start-page");
const gamePageDiv = document.getElementById("start-game-div");
const scorePageDiv = document.getElementById("final-score-div");
const startGameBtn = document.getElementById("start-game-btn");
const restartBtn = document.getElementById("restart");
const instructionsBtn = document.getElementById("instructions");

const emotionDisplay = document.getElementById("emotion");
const images = document.querySelectorAll("#images img");
const timerDisplay = document.getElementById("timer");

let emotions = {
    Grief: 'assets/images/grief.webp',
    Amazement: 'assets/images/amazement.webp',
    Pensiveness: 'assets/images/pensiveness.webp',
    Admiration: 'assets/images/admiration.webp',
    Loneliness: 'assets/images/loneliness.webp',
    Serenity: 'assets/images/serenity.webp',
    Rage: 'assets/images/rage.webp',
    Loathing: 'assets/images/loathing.webp',
    Sadness: 'assets/images/sadness.webp',
    Surprise: 'assets/images/surprise.webp',
    Fear: 'assets/images/fear.webp',
    Trust: 'assets/images/trust.webp',
    Joy: 'assets/images/joy.webp',
    Boredom: 'assets/images/boredom.webp',
    Anger: 'assets/images/anger.webp',
    Disgust: 'assets/images/disgust.webp'
};

// Global initial variables
let currentRound = 0; // Track the current round
const totalRounds = 6; // Total number of rounds
let score = 0; // Track correct answers
let wrongAnswers = 0; // Track incorrect answers
let correctGuesses = []; // Array to store the correctly guessed emotions
let timer; // Variable to hole timer intervalo
let remainingTime; // Variable to keep track of remaing time

/**
 * Function to get random emotions from the emotions object
 */
function getRandomEmotions(emotions, count) {
    const keys = Object.keys(emotions);
    const availableKeys = keys.filter(key => !correctGuesses.includes(key)); // Filter out emotions that are in the 'correct guesses' array
    const randomKeys = [];

    // Loop to select random emotion keys
    while (randomKeys.length < count) {
        const randomIndex = Math.floor(Math.random() * availableKeys.length);
        const randomKey = availableKeys[randomIndex];
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
    homePageDiv.style.display = "none"; // Hide the home screen and display the initial game screen
    gamePageDiv.style.display = "block";

    currentRound = 0; // Initial game stats
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

    emotionDisplay.textContent = correctEmotion; // Display the correct emotion name in HTML
    remainingTime = 10; // Reset timer every round
    timerDisplay.textContent = remainingTime;

    images.forEach((img, index) => {
        img.src = emotions[selectedEmotions[index]]; // Assign the src and alt attributes of each image element based on the randomly selected emotions.
        img.alt = selectedEmotions[index];
        img.onclick = () => checkAnswer(img, selectedEmotions[index], correctEmotion);
        img.classList.remove("correct", "incorrect"); // Remove shadow-box
    });

    currentRound++; // Increase round counter

    clearInterval(timer); // Clear any existing time left on timer
    timer = setInterval(updateTimer, 1000); // Start the countdown
}

/*
* Fcuntion to update time
*/
function updateTimer(){
    remainingTime--;
    timerDisplay.textContent = remainingTime;
    if (remainingTime <= 0){
        clearInterval(timer);
        nextRound();
    }  
}
/**
 * Function to check the selected answer
 */
function checkAnswer(img, selectedEmotion, correctEmotion) {
    if (selectedEmotion === correctEmotion) {
        img.classList.add("correct"); // Add green border for correct answer
        score += remainingTime; // Increase score by remaining time
        correctGuesses.push(correctEmotion); // Add the correct emotion to the array
    } else {
        img.classList.add("incorrect");
        wrongAnswers++; // Increase wrong answer counter, and don't forget to change the alert for a more positive one
    }

    /* Wait for 0.7 second before moving to the next round
    * so the user can see the shadow-box */
    setTimeout(() => {
        nextRound(); // Move to next round
    }, 700);
}

/**
 * This function will hide the game screen and
 * display the final score screen
 */
function showFinalScore() {
    gamePageDiv.style.display = "none";
    scorePageDiv.style.display = "flex";

    // Display the final score on HTML
    document.getElementById("final-score").textContent = `${score}`
    document.getElementById("wrong-answers").textContent= ` Incorrect answers: ${wrongAnswers}`;
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
restartBtn.addEventListener("click", restartGame);
instructionsBtn.addEventListener("click", backToInstructions);