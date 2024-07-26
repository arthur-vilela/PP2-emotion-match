/* Div containing each page of the game*/
const homePageDiv = document.getElementById("start-page");
const gamePageDiv = document.getElementById("start-game-div");
const scorePageDiv = document.getElementById("final-score-div");
/* Contants getting the buttons from HTML */
const startGameBtn = document.getElementById("start-game-btn");
const restartBtn = document.getElementById("restart");
const instructionsBtn = document.getElementById("instructions");

const emotionDisplay = document.getElementById("emotion");
const images = document.querySelectorAll("#images img");
const timerDisplay = document.getElementById("timer");

/* Object with available emotion and their source paths */
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

/* Object with emotion list and their alt texts */
let altTexts = {
    Grief: 'An old person with their head down, and both hands on their head',
    Amazement: 'Three people with a surprised expression, eyes wide open and mouth slightly agape',
    Pensiveness: 'A person looking distantly, with their hand on their chin',
    Admiration: 'A person looking up with a slight smile surrounded by forest',
    Loneliness: 'A person looking down, raised eyebrowns, closed arms, hands on elbows',
    Serenity: 'A person under open sky with a calm expression, eyes closed',
    Rage: 'A shirtless person, eyebrows furrowed, tense muscles and mouth open as if shouting',
    Loathing: 'A person with their head tilted front, furrowed eyebrowns, staring intensily',
    Sadness: 'A person wiping tears from their eyes, eyes downcast and trembling mouth',
    Surprise: 'A person with eyes  and mouth wide open',
    Fear: 'A person with crossed arms in front of their chest, eyes wide and mouth open as if gasping',
    Trust: 'A person with a slight smile, relaxed eyes, hugging closely someone else',
    Joy: 'A person smiling widely with eyes crinkled',
    Boredom: 'A person with their head tilted back, eyes slightly closed, little expressiveness',
    Anger: 'A person with frowning eyebrows, flared nostrils and mouth in a snarl',
    Disgust: 'A person with a shrugged arms, eyes sligthly closed, nose wrinkled and furrowed eyebrowns',
};

// Global initial variables
let currentRound = 0; // Track the current round
const totalRounds = 6; // Total number of rounds
let score = 0; // Track correct answers
let wrongAnswers = 0; // Track incorrect answers
let correctGuesses = []; // Array to store the correctly guessed emotions
let timer; // Variable to hole timer intervalo
let remainingTime; // Variable to keep track of remaing time

/*
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

/* Function to start a new game */
function startNewGame() {
    homePageDiv.style.display = "none"; // Hide the home screen and display the initial game screen
    gamePageDiv.style.display = "block";

    currentRound = 0; // Initial game stats
    score = 0;
    wrongAnswers = 0;
    correctGuesses = []; // Reset correct guesses

    nextRound(); // Start the first round
}

/* Function to setup next round */
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
        img.src = emotions[selectedEmotions[index]]; // Assign the src based on the randomly selected emotions.
        img.alt = altTexts[index]; // Assign alt text to each image element
        img.onclick = () => checkAnswer(img, selectedEmotions[index], correctEmotion);
        img.classList.remove("correct", "incorrect"); // Remove shadow-box
    });

    currentRound++; // Increase round counter

    clearInterval(timer); // Clear any existing time left on timer
    timer = setInterval(updateTimer, 1000); // Start the countdown
}

/*  Function to update time */
function updateTimer(){
    remainingTime--;
    timerDisplay.textContent = remainingTime;
    if (remainingTime <= 0){
        clearInterval(timer);
        nextRound();
    }  
}
/* Function to check the selected answer */
function checkAnswer(img, selectedEmotion, correctEmotion) {
    if (selectedEmotion === correctEmotion) {
        img.classList.add("correct"); // Add green shadow for correct answer
        score += remainingTime; // Increase score by remaining time
        correctGuesses.push(correctEmotion); // Add the correct emotion to the array
    } else {
        img.classList.add("incorrect");
        wrongAnswers++; // Increase wrong answer counter
    }

    /** 
    * Wait for 0.7 second before moving to the next round
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
    document.getElementById("final-score").textContent = `${score}`;
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