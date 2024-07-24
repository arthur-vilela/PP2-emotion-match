# Table of contents
1. UX Design
2. Features
3. Technologies used
4. Testing
5. Bugs
6. Validator testing
7. Deployment
8. Credits
9. Acknowledgements

# UX Design

# Features

## Features left to implement
Add variations of images depending of user cultural background

# Technologies used

# Testing
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

# Bugs
When inspecting the deployed website and visualizing it on mobile resolutions, the top of the home page div touch the top and bottom of the screen, not showing the padding nor scrolling all the way for some reason yet unkown. When opening the page on a mobile device, the website looks as it should.

![screenshot of game home page without showing top padding](docs/bug-top-padding.png)

Final score didn't update, keeping the placeholder text at the end of game.

![screenshot of final score screen with placeholder text instead of score](docs/bug-final-score.png)

Chrome Devtools indicated the problem in the JavaScript:

![screenshot of error shown in Devtools console](docs/bug-final-score-devtools.png)

```
document.getElementById("final-scre").value = `Fi...
```

instead of 

```
document.getElementById("final-score").textContent = `Fi
```
- The same emotion could appear in subsequent rounds, since the emotions are selected randomly. To fix this, I:
    - added an array to store the correctly guessed emotions;
    - modified the `getRandomEmotions` function to exclude these emotions from the selection pool;
    - updated the `checkAnswer` function to add the correct emotion the the array when guessed correcly.


# Validator testing

# Deployment

# Credits
https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object Logic to obtain random emotions from the emotion object was adapted from this answer

https://www.w3schools.com/jsref/jsref_foreach.asp Explanation and examples of the "forEach" method were taken from this tutorial from W3Schools

Emotions were taken from the "Wheel of emotions" developed by psychologist Robert Plutchik

https://www.6seconds.org/2022/03/13/plutchik-wheel-emotions/

Change message 
of final score from "final score" to "Correct answers"

# Acknowledgements