//  first create an object of wards and categoriess
const words = {
    movies: ["Avatar", "Toy Story", "The Godfather", "Inception", "Parasite"],
    sports: ["Swimming", "Tennis", "Surfing", "Boxing", "Hockey"]
};

// Get random category and word
let allKeys = Object.keys(words);
let randomCategory = allKeys[Math.floor(Math.random() * allKeys.length)];
let randomWord = words[randomCategory][Math.floor(Math.random() * words[randomCategory].length)].toLowerCase();

// Display categorys information
document.querySelector(".game-info .category span").innerHTML = randomCategory;

// Prepare game board
let guessedWordArray = randomWord.split("").map(letter => (letter === " " ? " " : "_"));
let wrongAttempts = 0;
const maxWrongAttempts = 8;

// Function to display the current guessed word
function displayGuessedWord() {
    let display = guessedWordArray.map(letter => (letter === " " ? " " : letter)).join(" ");
    document.querySelector(".letters-guess").innerHTML = display;
}

// Display initial word state
displayGuessedWord();

// Main game loop
while (wrongAttempts < maxWrongAttempts && guessedWordArray.includes("_")) {
    let guess = prompt(`Guess a letter (Category: ${randomCategory}):\n${guessedWordArray.join(" ")}`);
    
    if (!guess || guess.length !== 1 || !/^[a-z]$/i.test(guess)) {
        alert("Please enter a valid single letter.");
        continue;
    }

    guess = guess.toLowerCase();
    if (randomWord.includes(guess)) {
        // if the rigt Correct guess
        randomWord.split("").forEach((letter, index) => {
            if (letter === guess) {
                guessedWordArray[index] = guess;
            }
        });
        alert("Correct guess!");
    } else {
        // Wrong guess
        wrongAttempts++;
        alert(`Wrong guess! Attempts left: ${maxWrongAttempts - wrongAttempts}`);
        document.querySelector(".hangman-draw").classList.add(`wrong-${wrongAttempts}`);
    }

    displayGuessedWord();
}

// if the Game over
if (guessedWordArray.includes("_")) {
    alert(`Game Over :(  The word was: ${randomWord}`);
} else {
    alert(`Congrato lations! You guessed the word: ${randomWord}`);
}

// end game message
let popup = document.createElement("div");
popup.className = "popup";
popup.innerText = guessedWordArray.includes("_")
    ? `Game Over:(  The word was: ${randomWord}`
    : `Congratolations! You guessed the word: ${randomWord}`;
document.body.appendChild(popup);
