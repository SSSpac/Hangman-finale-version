// letters  
const letters = "abcdefghijklmnopqrstuvwxyz";

// Getting the array from letters 
let lettersArray = Array.from(letters);

// Selecting the letter container 
let lettersContainer = document.querySelector(".letters");

// Generating the letters 
lettersArray.forEach(letter => {
    let span = document.createElement("span");
    let theLetter = document.createTextNode(letter);
    span.appendChild(theLetter);
    span.className = 'letter-box';
    lettersContainer.appendChild(span);
});

// Object of words and a category 
const words =  {
    movies: ["Avatar", "Toy story", "The god father", "Inception", "Men in Black", "Parasite"],
    sports: ["Swimming", "Tennis", "Surfing", "Boxing", "Hockey", "Gymnastics"]
};

// Get random properties 
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];

let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

// Set the info for the category 
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select letters guess elements
let lettersGuessContainer = document.querySelector(".letters-guess");

// Converting the chosen word to an array 
let lettersAndSpace = Array.from(randomValueValue);
console.log(lettersAndSpace);

// Create the spans depending on the word 
lettersAndSpace.forEach(letter => {
    let emptySpan = document.createElement("span");
    if (letter === '') {
        emptySpan.className = 'with-space';
        emptySpan.innerHTML = ' '; // Placeholder for spaces
    } else {
        emptySpan.innerHTML = '_'; // Placeholder for guessed letters
    }
    lettersGuessContainer.appendChild(emptySpan);
});

// Selecting the guessed spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// setting the wrong attempts

let wrongAttempts = 0;
let theDraw = document.querySelector(".hangman-draw");

// setting the statue

let theStatus = false;

// Handling the click on letters 
document.addEventListener("click", (e) => {
    let theStatus = false;
    if (e.target.className === 'letter-box') {
        e.target.classList.add("clicked");

        let theClickedLetter = e.target.innerHTML.toLowerCase();

        let theChosenWord = randomValueValue.toLowerCase();

        // The chosen word
        theChosenWord.split('').forEach((wordLetter, Wordindex) => {
            if (theClickedLetter === wordLetter) {
                //the correct statos
                theStatus= true;
                // The loop on the spans
                guessSpans.forEach((span, spanIndex) => {
                    if (Wordindex === spanIndex) {
                        
                        span.innerHTML = theClickedLetter;
                    }
                });
            
            }
        });

        //outside the loop 
    if (theStatus !== true) {
        wrongAttempts++;
        // adding the wrong class 
        theDraw.classList.add(`wrong-${wrongAttempts}`);
    }

    }
});
