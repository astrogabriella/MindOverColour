const startAndQuizWord = document.querySelector("#randColor");
const radioBtn = document.getElementsByClassName("radioButtons");
const buttonContainer = document.getElementsByClassName("buttonContainer");
const resetBtn = document.getElementById("resetBtn");
const rules = document.getElementById("rules");
const userNameField = document.getElementById("username");
const userNameContainer = document.getElementsByClassName("userNameContainer");
const charCount = document.getElementById("charCount");
const gameDefaultContainer = document.getElementsByClassName("gameDefaultContainer");
const score = document.getElementById("score");
const displayBox = document.getElementById("adjustPosition")
const textTitle = document.getElementsByClassName("textTitle")
const welcomeMessage = document.getElementsByClassName("welcomeUsername")
let countdown = 20;
let lastScore = 0;
const maxCharacters = 12;


//////////////////////////////////////////////////////////
//FUNCTIONS

//This function sets a character limit to the username field and removes the ability to use space characters
function userNameLength() {
  let inputLength = userNameField.value.length;
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

//This function triggers the game
//need to break this into different 
function triggerGame() {

  toggleVisibility();
  startAndQuizWord.style.cursor = "default";
  // Reset the animation
  void startAndQuizWord.offsetWidth; // Trigger a reflow to restart the animation
  startAndQuizWord.classList.add("scaling");
textTitle[0].style.visibility="visible"
textTitle[0].textContent= "Mind Over Colour"
  startAndQuizWord.style.borderRadius= "0px"
  startAndQuizWord.style.background= "transparent"
  startAndQuizWord.style.border= "0px"
  startAndQuizWord.style.boxShadow= "#614f85 0px 0px";
  gameDefaultContainer[0].style.gridTemplateRows = '13% 6% 38% 35% 12%';
  startAndQuizWord.style.fontSize= "150px"
  setBtnTexts();
  startAndQuizWord.removeEventListener("click", triggerGame); //removes the ability to click on quiz word
  setInterval(updateTimer, 1000);
  //The above updates the clock every second
  console.log("game triggered")
}

//THE TEXT DOES NOT ALWAYS FIT THE SPACE


//This function makes the possible solutions visible to the user
function toggleVisibility() {
  for (let i = 0; i < buttonContainer.length; i++) {
    buttonContainer[i].style.visibility = "visible";
  }
  timerContainer.style.visibility = "visible";
  score.style.visibility= "visible"
  rules.style.visibility= "hidden"
}

function updateTimer() {
  // Set the initial countdown time in seconds
  const timerContainer = document.getElementById("timerContainer");
  const clockText = document.getElementById("clockText");
  clockText.textContent = countdown;
  //access the div to store the timer and update its text to the countdown
  countdown = countdown - 1;
  //countdown --

  if (countdown < 5) {
    clockText.classList.add("endOfRound");
  }

  if (countdown < 0) {
    clearInterval(this);
    //clearInterval() method cancels setInterval() when timer reaches 0.
    clockText.textContent = "";
    startAndQuizWord.style.color = "white";
    endOfRound();
  }
}

//This function generates a random colour WORD
function getRandColorText() {
  let colourArray = [
    "aqua",
    "beige",
    "black",
    "blue",
    "brown",
    "chocolate",
    "coral",
    "crimson",
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
  return word.toLowerCase(); //This returns a randomly generated colour
}

//THIS FUNCTION IS TRIGGERED ON CLICKING THE START OF THE ANSWERS RADIO BUTTONS
function setBtnTexts() {
  let answerArray = [];
  let usedIndices = [];

  //Generates four words, checking if each word already exists in our generated answer array
  while (answerArray.length < 4) {
    let tempColor = getRandColorText();
    if (answerArray.includes(tempColor)) {
      continue;
    }
    answerArray.push(tempColor);
  }

  //Changes the order of answers
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

//This function is used to change the COLOUR of the quiz word
function setTextColor(color) {
  startAndQuizWord.style.color = color;
}

function setTextContent(word) {
  startAndQuizWord.textContent = word;
}


//For each button clicked per quiz word, add the correct store
function currentScore() {
  if (this.textContent === startAndQuizWord.textContent) {
    integerScore = parseInt(score.textContent);
    integerScore += 1;
    score.textContent = integerScore;
    lastScore = integerScore
  }
  
}


//End of each round
function endOfRound() {
   startAndQuizWord.textContent = "End of Round";
  for (let i = 0; i < buttonContainer.length; i++) {
    buttonContainer[i].style.visibility = "hidden";
  }
  
}

//This function saves names and highScores to local storage
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
};

/////////////////////////////////////////////////////////////////////
//Add all event listeners
userNameField.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {;
    saveToLS();
  }
});

//Needs to show buttons, needs to change the colour and text content of "Start"

for (let i = 0; i < radioBtn.length; i++) {
  // radioBtn[i].addEventListener("click",timeManipulation)
  radioBtn[i].addEventListener("click", currentScore);
  radioBtn[i].addEventListener("click", () => {
    startAndQuizWord.classList.remove("scaling"); // Reset the animation
    void startAndQuizWord.offsetWidth; // Trigger a re-flow to restart the animation
    startAndQuizWord.classList.add("scaling");
    setBtnTexts();
  });
}
   
window.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  if (localStorage.length > 0) {
    startAndQuizWord.style.visibility = "visible"
    const value = localStorage.getItem("username");
    textTitle[0].textContent= `Welcome back ${value}!`
    userNameContainer[0].remove();

  }
});


userNameField.addEventListener("input", userNameLength);
userNameField.addEventListener("keypress", (e)=>{
if (localStorage.length > 0 && e.key ==="Enter"){
startAndQuizWord.style.visibility = "visible"
console.log("entered username")
}})

startAndQuizWord.addEventListener("click", triggerGame);

resetBtn.addEventListener("click", clearData);