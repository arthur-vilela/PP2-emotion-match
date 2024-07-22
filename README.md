# Tests
function startNewGame() {
    homePageDiv.style.display = "none";
    gamePageDiv.style.display = "block";

    const selectedEmotions = getRandomEmotions(emotions, 4);
    const correctEmotionIndex = Math.floor(Math.random() * 4);
    const correctEmotion = selectedEmotions[correctEmotionIndex];

    console.log("Selected Emotions:", selectedEmotions);
    console.log("Correct Emotion Index:", correctEmotionIndex);
    console.log("Correct Emotion:", correctEmotion);

    By running the game multiple times and observing the console output on Chrome Devtools, I verified that the correct emotion appears in a random position each time. The correctEmotionIndex will vary between 0 and 3, ensuring the correct emotion's image is displayed in a different position for each game round.

# Credits
https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object Logic to obtain random emotions from the emotion object was adapted from this answer