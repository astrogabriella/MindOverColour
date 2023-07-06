const colourWord = document.querySelector("#randColor")
const radioBtn = document.getElementsByClassName("radioButtons")
const buttonContainer = document.getElementsByClassName("buttonContainer")

function visibleBtn(){
    for (let i = 0; i < buttonContainer.length; i++){
        buttonContainer[i].style.visibility= "visible"
    }
    changeWord()
    randomColour()
    colourWord.removeEventListener("click",visibleBtn)
    colourWord.style.cursor = "default"
    buttonText()
    //when you click start, trigger the first set of answer changes
}

 function removeAnswer(){
    this.children[0].checked = false
 }

colourWord.addEventListener("click",visibleBtn)

let textColour = ""
function randomColour(){
    let rand = []
    for (let i=0;i<3;i++){
    let randNumber = Math.floor(Math.random()*256)
    rand.push(randNumber)
    }
    let colour = `rgb(${rand[0]},${rand[1]},${rand[2]})`
    return colourWord.style.color = colour

}


function changeWord(){
    let colourArray =  ["aliceBlue", "antiqueWhite", "aqua", "aquamarine", "azure", "beige", "bisque", "black", "blanchedAlmond", "blue", "blueViolet", "brown", "burlyWood", "cadetBlue", "chartreuse", "chocolate", "coral", "cornflowerBlue", "cornSilk", "crimson", "cyan", "fuchsia","ghostWhite", "gold", "goldenrod", "gray", "green", "greenYellow", "honeydew", "hotPink", "indigo", "ivory", "khaki", "lavender", "lavenderBlush", "lawnGreen", "lemonChiffon", "lime", "limeGreen", "linen", "magenta", "maroon", "midnightBlue", "mintCream", "mistyRose", "moccasin", "navajoWhite", "navy", "oldLace", "olive", "oliveDrab", "orange", "orangeRed", "orchid", "papayaWhip", "peachPuff", "peru", "pink", "plum", "powderBlue", "purple", "rebeccaPurple", "red", "rosyBrown", "royalBlue", "saddleBrown", "salmon", "sandyBrown", "seaGreen", "seashell", "sienna", "silver", "skyBlue", "slateGray", "snow", "springGreen", "steelBlue", "tan", "teal", "thistle", "tomato", "turquoise", "violet", "wheat", "white", "whiteSmoke", "yellow", "yellowGreen"]
    randomColour()

    //This function needs to avoid repeats
    let word = colourArray[Math.floor(Math.random()*colourArray.length)]
    colourArray= word

    return colourWord.textContent = word.toLowerCase() //pink
    
}


//This function creates an array of random colours including the currently selected colour, 
//And then randomises their position in the array 
//then assigns the text content of the labels to one of the colours.
function buttonText() {
    let answerArray = []
    let usedIndices = []
    for (let i = 0; i< radioBtn.length;i++ ){
    let answer = changeWord() //pink1 red2 blue3 pink4
    answerArray.push(answer)
    } 

    console.log(answerArray)

    for (let i = 0; i<radioBtn.length;i++){ 
        let randomIndex = Math.floor(Math.random()*answerArray.length)
        //Repeat 4 times, generate 4 random indices

   //as long as a usedIndices contains the random index, generate another index
        while(usedIndices.includes(randomIndex)){
            randomIndex = Math.floor(Math.random() * answerArray.length)
        }
    usedIndices.push(randomIndex)//push the used index
    radioBtn[i].textContent = answerArray[randomIndex]
    } 
    
}



for (let i = 0; i< radioBtn.length;i++ ){
   radioBtn[i].addEventListener("click",randomColour)
   radioBtn[i].addEventListener("click",changeWord)
//    radioBtn[i].addEventListener("mouseout",removeAnswer)
    radioBtn[i].addEventListener("mouseover", function() {
    this.style.cursor = "pointer"
  
 })
   radioBtn[i].addEventListener("click",buttonText)
}


//We need to generate the buttons instead of having them pre-stored 


