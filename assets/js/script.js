const homePageDiv = document.getElementById("start-page");
const gamePageDiv = document.getElementById("start-game-div");
const scorePageDiv = document.getElementById("final-score-div");
const startGameBtn = document.getElementById("start-game-btn");
const checkScoreBtn = document.getElementById("check-score-btn")
const restartBtn = document.getElementById("restart");

/**
 * This function will hide the home screen and
 * display the initial game screen
 */
function startNewGame() {
    homePageDiv.style.display = "none";
    gamePageDiv.style.display = "block";

}

/**
 * This function will hide the game screen and
 * display the final score screen
 */
function checkScore() {
    gamePageDiv.style.display = "none";
    scorePageDiv.style.display = "block"
}

/**
 * This function will hide the game screen and
 * display the home screen
 */
function restartGame() {
    scorePageDiv.style.display = "none";
    homePageDiv.style.display = "block";
}

startGameBtn.addEventListener("click", startNewGame);
checkScoreBtn.addEventListener("click", checkScore);
restartBtn.addEventListener("click", restartGame);