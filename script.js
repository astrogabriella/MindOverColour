const startAndQuizWord = document.querySelector("#randColor");
const radioBtn = document.getElementsByClassName("radioButtons");
const buttonContainer = document.getElementsByClassName("buttonContainer");
let countdown= 20
//////////////////////////////////////////////////////////FUNCTIONS

//This function triggers the game
function triggerGame(){
    toggleVisibility()
    startAndQuizWord.style.cursor = "default";
     // Reset the animation
    void startAndQuizWord.offsetWidth; // Trigger a reflow to restart the animation
    startAndQuizWord.classList.add("scaling");
    setBtnTexts()
    startAndQuizWord.removeEventListener("click",triggerGame) //removes the ability to click on quiz word
    setInterval(updateTimer, 1000);
}

//This function makes the possible solutions visible to the user
function toggleVisibility(){
    for (let i = 0; i < buttonContainer.length; i++) {
        buttonContainer[i].style.visibility = "visible";
      }
      timerContainer.style.visibility = "visible";
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
    "aquamarine",
    "azure",
    "beige",
    "black",
    "blue",
    "brown",
    "chocolate",
    "coral",
    "cornSilk",
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
    "limeGreen",
    "magenta",
    "maroon",
    "midnightBlue",
    "navy",
    "olive",
    "orange",
    "orangeRed",
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
    "white",
    "yellow",
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
  setTextColor(answerArray[0])
  setTextContent(answerArray[1])

}

//This function is used to change the COLOUR of the quiz word
function setTextColor(color) {
    startAndQuizWord.style.color = color;
  }
  
function setTextContent(word) {
    startAndQuizWord.textContent = word;
  }
  

//End of each round
function endOfRound() {
  startAndQuizWord.textContent = "End of Round";
  for (let i = 0; i < buttonContainer.length; i++) {
    buttonContainer[i].style.visibility = "hidden";
  }
}





/////////////////////////////////////////////////////////////////////
//Add all event listeners
//Needs to show buttons, needs to change the colour and text content of "Start"
startAndQuizWord.addEventListener("click",triggerGame)


for (let i = 0; i < radioBtn.length; i++) {
  radioBtn[i].addEventListener("click", () => {
    startAndQuizWord.classList.remove("scaling"); // Reset the animation
    void startAndQuizWord.offsetWidth; // Trigger a re-flow to restart the animation
    startAndQuizWord.classList.add("scaling");
    setBtnTexts();
  });
}