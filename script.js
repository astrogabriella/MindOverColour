const startBtn = document.getElementById("startBtn"); 
const quizWord = document.getElementById("quizWord");
const resetBtn = document.getElementsByClassName("resetBtn")
const radioBtn = document.getElementsByClassName("radioButtons");
const buttonContainer = document.getElementsByClassName("buttonContainer");
const userNameField = document.getElementById("username");
const userNameContainer = document.getElementsByClassName("userNameContainer");
const charCount = document.getElementById("charCount");
const gameDefaultContainer = document.getElementById("gameDefaultContainer");
const gamePlayContainer = document.getElementById("gamePlayContainer")
const gameEndContainer = document.getElementById("gameEndContainer")
const score = document.getElementById("score");
const textTitle = document.getElementsByClassName("textTitle1")
const welcomeMessage = document.getElementsByClassName("welcomeUsername")
const scoreText = document.getElementById("scoreText")
const highScoreText = document.getElementById("highScoreText")

//Global constants
let countdown = 20;
let lastScore = 0;

const maxCharacters = 12;


/////////////////////////////////////FUNCTIONS/////////////////////

//Cosmetic function that shows username character limit and removes the ability to use space characters
function userNameLength() {
  let inputLength = userNameField.value;
  counter = maxCharacters - inputLength;
  if (counter < 0) {
    userNameField.style.color = "red";
  }
  if (inputLength === 0) {
    userNameField.style.color = "black";
  }
  charCount.textContent = `${counter}/${maxCharacters}`;
  userNameField.value = userNameField.value.replace(/\s/g, "");

  if (inputLength >= maxCharacters) {
    e.preventDefault();
  }
}

//This function triggers the game, adds scaling on the first quizWord and triggers the timer function every second
function triggerGame() {
  gameDefaultContainer.style.visibility="hidden"
  gamePlayContainer.style.visibility="visible"
  quizWord.style.cursor = "default";
  void quizWord.offsetWidth; 
  quizWord.classList.add("scaling");
  setBtnTexts();
  setInterval(updateTimer, 1000);
}

//Decrements the clock by one, sets a time warning colour and stops at 0s.
function updateTimer() {
  const clockText = document.getElementById("clockText");
  clockText.textContent = countdown;
  countdown = countdown - 1;

  if (countdown < 5) {
    clockText.classList.add("timeWarning");
  }
  if (countdown < 0) {
    clearInterval(this);
    //clearInterval() method cancels setInterval() when timer reaches 0.
    endOfRound();
  }
}

//Returns a random colour word
function getRandColorText() {
  let colourArray = [
    "aqua",
    "beige",
    "black",
    "blue",
    "brown",
    "chocolate",
    "coral",
    "cyan",
    "fuchsia",
    "gold",
    "gray",
    "green",
    "honeydew",
    "indigo",
    "ivory",
    "khaki",
    "lavender",
    "lime",
    "maroon",
    "navy",
    "olive",
    "orchid",
    "pink",
    "plum",
    "purple",
    "red",
    "salmon",
    "silver",
    "skyBlue",
    "tan",
    "teal",
    "tomato",
    "turquoise",
    "violet",
    "wheat",
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
  }
  setTextColor(answerArray[0]);
  setTextContent(answerArray[1]);
}




//Change the colour of the quizWord
function setTextColor(color) {
  quizWord.style.color = color;
}

//Sets the text content of quizWord
function setTextContent(word) {
  quizWord.textContent = word;
}



//For each button clicked per quiz word, check if the word matches the quiz word, then add a point to the score
function currentScore() {
  if (this.textContent === quizWord.textContent) {
    integerScore = parseInt(score.textContent);
    integerScore += 1;
    score.textContent = integerScore;
    lastScore = integerScore
  }
  
}


//End of each round toggle game state containers
function endOfRound() {
  gamePlayContainer.style.visibility="hidden"
  gameEndContainer.style.visibility="visible"
  scoreText.innerText= `Score: ${lastScore}`
}


//Saves names to storage
function saveToLS() {
  const key = "username";
  const value = userNameField.value;
  if (value) {
    localStorage.setItem(key, value);
    userNameField.style.visibility = "hidden";
    charCount.style.visibility = "hidden";
  }
  
}

//Clears data when reset stats is clicked
const clearData = () => {
  localStorage.clear();
  location.reload();
  startBtn.style.visibility="hidden"
  
};




////////////////////////////////EVENT LISTENERS/////////////////////////////////////


//When the user presses enter, save their username
userNameField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    saveToLS();
  }
});


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
    startBtn.style.visibility = "visible"
    const value = localStorage.getItem("username");
    textTitle[0].textContent= `Welcome back ${value}!`
    userNameContainer[0].remove();
  }
});

//Checks the length of username
userNameField.addEventListener("input", userNameLength);

//If a username is entered, show the start button

userNameField.addEventListener("keypress", (e)=>{
if (localStorage.length > 0 && e.key ==="Enter"){
  startBtn.style.visibility = "visible"
}})

//Trigger the game on clicking start
startBtn.addEventListener("click", triggerGame);

//For each reset button, clear data when it is clicked
for (let i=0; i<resetBtn.length;i++){
resetBtn[i].addEventListener("click", clearData);
}
