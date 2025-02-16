const words = [
  "JAVASCRIPT",
  "HTML",
  "CSS",
  "COMPUTER",
  "PROGRAMMING",
  "DEVELOPER",
  "BROWSER",
  "REACT",
  "JAVA",
];
let selectedWord = "";
let correctLetters = [];
let wrongGuesses = 0;
const maxWrong = 6;

const wordDisplay = document.querySelector(".word-display");
const keyboard = document.querySelector(".keyboard");
const message = document.querySelector(".message");
const hangman = document.querySelector(".hangman");
const restartBtn = document.querySelector(".restart-btn");

// Initialize game
function initGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
  correctLetters = [];
  wrongGuesses = 0;
  message.textContent = "";
  hangman.textContent = "🚶";
  createKeyboard();
  displayWord();
}

// Create keyboard buttons
function createKeyboard() {
  keyboard.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement("button");
    button.className = "key";
    button.textContent = letter;
    button.dataset.letter = letter;
    button.addEventListener("click", () => handleGuess(letter));
    keyboard.appendChild(button);
  }
}

// Display current word state
function displayWord() {
  wordDisplay.innerHTML = selectedWord
    .split("")
    .map(
      (letter) => `
              <span>${correctLetters.includes(letter) ? letter : "_"}</span>
          `
    )
    .join("");

  // Check win condition
  if (!wordDisplay.textContent.includes("_")) {
    message.textContent = "You Won! 🎉";
    disableKeyboard();
  }
}

// Handle letter guess
function handleGuess(letter) {
  if (correctLetters.includes(letter) || wrongGuesses >= maxWrong) return;

  const button = document.querySelector(`button[data-letter="${letter}"]`);
  button.disabled = true;

  if (selectedWord.includes(letter)) {
    correctLetters.push(letter);
    displayWord();
  } else {
    wrongGuesses++;
    updateHangman();
  }

  checkLose();
}

// Update hangman display
function updateHangman() {
  const parts = ["😟", "💀", "🩹", "🩸", "🩻", "☠️"];
  hangman.textContent = parts.slice(0, wrongGuesses).join("");
}

// Check lose condition
function checkLose() {
  if (wrongGuesses === maxWrong) {
    message.textContent = `You Lost! The word was: ${selectedWord}`;
    disableKeyboard();
  }
}

// Disable keyboard
function disableKeyboard() {
  document.querySelectorAll(".key").forEach((button) => {
    button.disabled = true;
  });
}

// Event listeners
document.addEventListener("keydown", (e) => {
  const letter = e.key.toUpperCase();
  if (/^[A-Z]$/.test(letter)) {
    handleGuess(letter);
  }
});

restartBtn.addEventListener("click", initGame);

// Start the game
initGame();
