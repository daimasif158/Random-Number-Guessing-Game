// ============================================================
// RANDOM NUMBER GUESSING GAME (1 to 10)
// JavaScript Logic with Beginner-Friendly Comments
// ============================================================

// ------------------------------------------------------------
// 1. VARIABLES (Game State Variables)
// ------------------------------------------------------------
// secret_number: Yeh computer ka chupa hua random number store karega
let secretNumber;

// attempts: Yeh user ki guesses (attempts) count karega
let attempts = 0;


// ------------------------------------------------------------
// 2. DOM ELEMENTS SELECTION
// document.getElementById() use karke hum HTML elements ko target karte hain
// ------------------------------------------------------------
const guessInput = document.getElementById("user-guess");       // Input field
const guessButton = document.getElementById("guess-btn");       // "Guess" button
const playAgainButton = document.getElementById("play-again-btn"); // "Play Again" button
const messageDisplay = document.getElementById("message");     // Status message paragraph
const attemptsCountDisplay = document.getElementById("attempts-count"); // Attempts counter display


// ------------------------------------------------------------
// 3. FUNCTION: Generate Random Number (1 se 10)
// Math.random() 0 aur 1 ke darmiyan decimal number deta hai (e.g. 0.45)
// Math.random() * 10 se 0 se 9.999 tak ban jata hai
// Math.floor() decimal ko round down kar deta hai (0 se 9)
// + 1 karne se range 1 se 10 ban jati hai
// ------------------------------------------------------------
function generateRandomNumber() {
  return Math.floor(Math.random() * 10) + 1;
}


// ------------------------------------------------------------
// 4. FUNCTION: Check User's Guess
// Yeh function tab run hoga jab user "Guess" button click karega
// ------------------------------------------------------------
function checkGuess() {
  // Input field se value le kar number mein convert kar rahe hain
  const userGuess = parseInt(guessInput.value);

  // Validation: Check karein agar input khali hai ya 1 se 10 se bahar hai
  if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
    messageDisplay.textContent = "Please enter a valid number between 1 and 10!";
    messageDisplay.className = "message error";
    guessInput.value = "";
    guessInput.focus();
    return; // Function ko yahin rokh dein
  }

  // Har guess par attempts count barhayein
  attempts++;
  attemptsCountDisplay.textContent = attempts;

  // Comparison using if-else statements:
  // 1. Agar user ka number secret number se chhota ho
  if (userGuess < secretNumber) {
    messageDisplay.textContent = "Too Low!";
    messageDisplay.className = "message too-low";
    guessInput.value = "";
    guessInput.focus();
  }
  // 2. Agar user ka number secret number se bara ho
  else if (userGuess > secretNumber) {
    messageDisplay.textContent = "Too High!";
    messageDisplay.className = "message too-high";
    guessInput.value = "";
    guessInput.focus();
  }
  // 3. Agar user ka number correct ho (Correct Guess)
  else {
    messageDisplay.textContent = "Correct! You Won!";
    messageDisplay.className = "message correct";

    // Game jeetne ke baad input aur guess button disable kar dein
    guessInput.disabled = true;
    guessButton.disabled = true;

    // "Play Again" button ko show karein
    playAgainButton.classList.remove("hidden");
    playAgainButton.focus();
  }
}


// ------------------------------------------------------------
// 5. FUNCTION: Reset / Start Game
// Yeh function naye game ke liye sab kuch reset karta hai
// ------------------------------------------------------------
function initGame() {
  // Naya random number generate karein
  secretNumber = generateRandomNumber();

  // Attempts ko wapas 0 karein
  attempts = 0;
  attemptsCountDisplay.textContent = attempts;

  // Message ko reset karein
  messageDisplay.textContent = "Enter your guess and click Guess!";
  messageDisplay.className = "message";

  // Input field ko clear aur enable karein
  guessInput.value = "";
  guessInput.disabled = false;

  // Guess button ko enable karein
  guessButton.disabled = false;

  // Play Again button ko chupa dein
  playAgainButton.classList.add("hidden");

  // Input box par focus karein taake user foran type kar sake
  guessInput.focus();

  // (Optional debug log - developer console mein check karne ke liye)
  console.log("Secret Number (Debug):", secretNumber);
}


// ------------------------------------------------------------
// 6. EVENT LISTENERS
// User interactions (clicks, key presses) ko listen karte hain
// ------------------------------------------------------------

// 1. Guess button par click hone par checkGuess() call ho
guessButton.addEventListener("click", checkGuess);

// 2. Play Again button par click hone par initGame() call ho
playAgainButton.addEventListener("click", initGame);

// 3. Input box mein "Enter" key press karne par bhi guess submit ho
guessInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    // Agar Guess button disabled nahi hai to guess check karein
    if (!guessButton.disabled) {
      checkGuess();
    }
  }
});


// ------------------------------------------------------------
// 7. INITIALIZE THE GAME
// Page load hone par game start ho jaye
// ------------------------------------------------------------
initGame();
