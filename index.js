// Get necessary elements from DOM
const sentenceInput = document.getElementById("sentence-input");
const sentenceForm = document.getElementById("sentence-form");
const sentenceDisplay = document.getElementById("sentence-display");
const answerInput = document.getElementById("answer-input");
const answerForm = document.getElementById("answer-form");
const messageDisplay = document.getElementById("message-display");
const startButton = document.getElementById("start-btn");
const gameContainer = document.getElementById("game-container");
const configContainer = document.getElementById("config-container");
const submitButton = document.getElementById("submit-btn")

let originalSentence;
let sentenceWithHiddenWords;
let hiddenWordIndices;
let part;

function startGame() {
  // Get the original sentence from the input field
  originalSentence = sentenceInput.value;

  // Clear the input field
  sentenceInput.value = "";

  // Initialize the array of hidden word indices
  hiddenWordIndices = [Math.floor(Math.random() * originalSentence.split(" ").length)];

  // Hide the first word
  sentenceWithHiddenWords = hideWordsPartially(originalSentence, hiddenWordIndices);

  // Display the sentence with the hidden word
  sentenceDisplay.textContent = sentenceWithHiddenWords;

  gameContainer.classList.remove("hide");
  configContainer.classList.add("hide");
  answerInput.focus();
  // Show the sentence container and enable the submit button
//   document.getElementById("sentence-container").style.display = "block";
//   document.getElementById("input-field").focus();
//   document.getElementById("submit-button").disabled = false;

  part = 1;
}

function hideWordsFully(sentence, indices) {
  // Split the sentence into an array of words
  let words = sentence.split(" ");

  // Replace the words at the given indices with underscores
  for (let i = 0; i < indices.length; i++) {
    words[indices[i]] = "______";
  }

  // Join the words back into a sentence and return it
  return words.join(" ");
}

function hideWordsPartially(sentence, indices) {
  // Split the sentence into an array of words
  let words = sentence.split(" ");
  
  // Replace the words at the given indices with underscores
  for (let i = 0; i < indices.length; i++) {
    words[indices[i]] = "*".repeat(words[indices[i]].length);
  }
  
  // Join the words back into a sentence and return it
  return words.join(" ");
}

function cheat() {
  answerInput.value = originalSentence;
  checkAnswer();
}

function checkAnswer() {
  // Get the user's answer
  let userAnswer = answerInput.value;

  // Compare the user's answer to the original sentence
  if (userAnswer === originalSentence) {
    // If all words are now hidden, congratulate the user
    if (part === 2 || hiddenWordIndices.length === originalSentence.split(" ").length) {
      if (part === 1) {
        part = 2;
        partiallyHiddenSentence = sentenceWithHiddenWords;
        hiddenWordIndices = [];
      }
      else if (hiddenWordIndices.length === originalSentence.split(" ").length) {
        alert("Congratulations! You have memorized the sentence.");
        gameContainer.classList.add("hide");
        configContainer.classList.remove("hide");
        return;
      }
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * originalSentence.split(" ").length);
      } while (hiddenWordIndices.includes(newIndex));
      hiddenWordIndices.push(newIndex);
      sentenceWithHiddenWords = hideWordsFully(partiallyHiddenSentence, hiddenWordIndices);

    } else {
      // If the user is correct, add another hidden word
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * originalSentence.split(" ").length);
      } while (hiddenWordIndices.includes(newIndex));
      hiddenWordIndices.push(newIndex);
      sentenceWithHiddenWords = hideWordsPartially(originalSentence, hiddenWordIndices);


    }
    // Display the updated sentence with the hidden words
    sentenceDisplay.textContent = sentenceWithHiddenWords;
    answerInput.value = "";
    answerInput.focus();
} else {
    alert("Sorry, that is not correct. Please try again.");
  }
}
