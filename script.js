const startBtn = document.getElementById("startBtn");
const submitBtn = document.getElementById("submitBtn");
const quizWord = document.getElementById("quizWord");
const resetBtn = document.getElementsByClassName("resetBtn");
const radioBtn = document.getElementsByClassName("radioButtons");
const buttonContainer = document.getElementsByClassName("buttonContainer");
const userNameField = document.getElementById("username");
const userNameContainer = document.getElementsByClassName("userNameContainer");
const charCount = document.getElementById("charCount");
const gameDefaultContainer = document.getElementById("gameDefaultContainer");
const gamePlayContainer = document.getElementById("gamePlayContainer");
const gameEndContainer = document.getElementById("gameEndContainer");
const score = document.getElementById("score");
const textTitle = document.getElementsByClassName("gameHeading");
const welcomeMessage = document.getElementsByClassName("welcomeUsername");
const scoreText = document.getElementById("scoreText");
const highScoreText = document.getElementById("highScoreText");
const clockText = document.getElementById("clockText");
const repeatBtn = document.getElementById("repeatBtn");
const savedHS = document.getElementById("savedHS");

//Global constants
let lastScore = 0;
let timerInterval;
const maxCharacters = 12;

/////////////////////////////////////FUNCTIONS/////////////////////

//Cosmetic change if username is too long
function userNameLength() {
  let inputLength = userNameField.value.length;
  counter = inputLength;
  if (counter > 12) {
    counter = maxCharacters - inputLength;
  }
  if (counter < 12) {
  }

  if (inputLength === 0) {
    charCount.style.color = "white";
  }

  charCount.textContent = `${counter}/${maxCharacters}`;
  userNameField.value = userNameField.value.replace(/\s/g, "");

  if (inputLength >= maxCharacters) {
    e.preventDefault();
  }
}

//This function triggers the game, adds scaling on the first quizWord and triggers the timer function every second
function triggerGame() {
  savedHS.style.visibility = "hidden";
  countdown = 20;
  lastScore = 0;
  gameEndContainer.style.visibility = "hidden";
  clockText.classList.remove("timeWarning");

  clockText.textContent = 20;
  clockText.style.color = "white";

  score.textContent = `Score: ${lastScore}`;
  startBtn.style.visibility = "hidden";
  gameDefaultContainer.style.visibility = "hidden";
  gamePlayContainer.style.visibility = "visible";
  quizWord.style.cursor = "default";
  void quizWord.offsetWidth;
  quizWord.classList.add("scaling");
  setBtnTexts();
  timerInterval = setInterval(updateTimer, 1000);
}

//Decrements the clock by one and stops at 0s.
function updateTimer() {
  clockText.textContent = countdown;
  if (countdown > 5) {
    clockText.style.color = "white";
  }
  countdown = countdown - 1;

  if (countdown < 5) {
    clockText.classList.add("timeWarning");
  }

  if (countdown < 0) {
    endOfRound();
    clearInterval(timerInterval);
    //clearInterval() method cancels setInterval() when timer reaches 0.
  }
}

//Returns a random colour word
function getRandColorText() {
  let colourArray = [
    "aqua",
    "black",
    "blue",
    "brown",
    "coral",
    "crimson",
    "cyan",
    "chocolate",
    "fuchsia",
    "tan",
    "gold",
    "gray",
    "green",
    "indigo",
    "lime",
    "magenta",
    "maroon",
    "navy",
    "olive",
    "orange",
    "orchid",
    "pink",
    "plum",
    "purple",
    "red",
    "salmon",
    "sienna",
    "teal",
    "tomato",
    "turquoise",
    "lavender",
    "violet",
    "wheat",
    "yellow",
  ];
  let word = colourArray[Math.floor(Math.random() * colourArray.length)];
  return word.toLowerCase();
}

//Sets four unique colour words for the answers and sets the colour and text content of quizWord
function setBtnTexts() {
  let answerArray = [];
  let usedIndices = [];

  while (answerArray.length < 4) {
    let tempColor = getRandColorText();
    if (answerArray.includes(tempColor)) {
      continue;
    }
    answerArray.push(tempColor);
  }
  for (let i = 0; i < radioBtn.length; i++) {
    let randomIndex = Math.floor(Math.random() * answerArray.length);
    while (usedIndices.includes(randomIndex)) {
      randomIndex = Math.floor(Math.random() * answerArray.length);
    }
    usedIndices.push(randomIndex);
    radioBtn[i].textContent = answerArray[randomIndex];
    radioBtn[i].style.backgroundColor = answerArray[randomIndex];
  }
  setTextColor(answerArray[0]);

  setTextContent(answerArray[1]);
}

//Change the colours
function setTextColor(color) {
  quizWord.style.color = color;
}

//Sets the text content of quizWord
function setTextContent(word) {
  quizWord.textContent = word;
}

//For each button clicked per quiz word, check if the word matches the quiz word, then add a point to the score
function currentScore() {
  integerScore = lastScore;
  if (this.textContent === quizWord.textContent) {
    integerScore += 1;
    lastScore = integerScore;
    score.textContent = `Score: ${integerScore}`;
  } else {
    countdown += -1;
    if (countdown > 0) {
      clockText.textContent = countdown;
      clockText.style.color = "red";
    } else clockText.textContent = 0;
  }
}

//End of each round toggle game state containers
function endOfRound() {
  savedHS.style.visibility = "hidden";
  highScore();
  gamePlayContainer.style.visibility = "hidden";
  gameEndContainer.style.visibility = "visible";
  scoreText.innerText = `Score: ${lastScore}`;
}
// Update highscore
function highScore() {
  const storedScore = localStorage.getItem("highScore") || 0;
  if (lastScore > storedScore) {
    localStorage.setItem("highScore", lastScore);
    highScoreText.innerText = `HighScore: ${lastScore}`;
  } else highScoreText.innerText = `High Score: ${storedScore}`;
}

//Clears data when reset stats is clicked
const resetStats = () => {
  localStorage.clear();
  location.reload();
  startBtn.style.visibility = "hidden";
};

//Saves names to storage
function saveToLS() {
  const name = "username";
  const value = userNameField.value;
  if (value) {
    localStorage.setItem(name, value);
  }
}

//limits username length
function handleUsername(e) {
  if (userNameField.value.length > 0 && userNameField.value.length <= 12) {
    if (e.key === "Enter" || e.target.id == "submitBtn") {
      saveToLS();
      submitBtn.style.visibility = "hidden";
      userNameField.style.visibility = "hidden";
      charCount.style.visibility = "hidden";
      startBtn.style.visibility = "visible";
      submitBtn.style.visibility = "hidden";
    }
  }
  if (userNameField.value.length > 12) {
    if (e.key === "Enter" || e.target.id == "submitBtn") {
      console.log("username invalid");
    }
  }
}

////////////////////////////////EVENT LISTENERS/////////////////////////////////////

//Checks the length of username
userNameField.addEventListener("input", userNameLength);

//Save data when user clicks on submit and has a valid input
submitBtn.addEventListener("click", handleUsername);

//Save data when user presses enter and has a valid input
userNameField.addEventListener("keypress", handleUsername);

//Add to score when the correct radio button is clicked and trigger the scaling animation of quizWord
for (let i = 0; i < radioBtn.length; i++) {
  radioBtn[i].addEventListener("click", currentScore);
  radioBtn[i].addEventListener("click", () => {
    quizWord.classList.remove("scaling");
    void quizWord.offsetWidth;
    quizWord.classList.add("scaling");
    setBtnTexts();
  });
}

//When page is refreshed, welcome user back if a username exists in local storage
window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  if (localStorage.length > 0) {
    startBtn.style.visibility = "visible";
    savedHS.style.visibility = "visible";
    let userStats = localStorage.getItem("highScore") || 0;
    savedHS.innerText = `High Score: ${userStats}`;

    const value = localStorage.getItem("username");
    textTitle[0].textContent = `Welcome back ${value}!`;
    userNameContainer[0].remove();
  }
});

//Trigger the game on clicking start
startBtn.addEventListener("click", triggerGame);

//For each reset button, clear data when it is clicked
for (let i = 0; i < resetBtn.length; i++) {
  resetBtn[i].addEventListener("click", resetStats);
}
//Triggers game on clicking try again at the end of the round
repeatBtn.addEventListener("click", () => {
  triggerGame();
});
