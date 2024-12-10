// Questions and answers
const quiz = [
  { question: "I am an odd number. Take away one letter and I become even. What number am I?", answer: "7", congrats: "Correct! Let's try a harder one." },
  { question: "22, 21, 23, 22, 24, 23, …", answer: "25", congrats: "That's right! Next question coming up." },
  { question: "I’m a giant who rests, where the winds often roam, Shrouded in clouds, far from the world’s home. \n My name’s tied to a number, a challenge like few, \, I sure hope this number can be given by you. Hint: (27.98811877,86.9249751)", answer: "8848", congrats: "You're doing great! Here's the final question." },
  { question: "Eight of my pets aren’t dogs, five aren’t rabbits, and seven aren’t cats. How many pets do I have?", answer: "15", congrats: "You're doing great! Here's the final question." },
];

let currentQuestionIndex = 0;

// Select DOM elements
const questionElement = document.getElementById('question');
const answerBox = document.getElementById('answer-box');
const submitButton = document.getElementById('submit-answer');

// Function to type out a question
function typeQuestion(text, callback, speed = 80, deleteSpeed = 50) {
  const clearText = () => {
      let currentText = questionElement.textContent;
      const deleteInterval = setInterval(() => {
          if (currentText.length > 0) {
              currentText = currentText.slice(0, -1); // Remove one character
              questionElement.textContent = currentText;
          } else {
              clearInterval(deleteInterval);
              typeNewText(); // Start typing the new text after deletion
          }
      }, deleteSpeed); // Speed of deleting
  };

  const typeNewText = () => {
      let i = 0;
      const typeInterval = setInterval(() => {
          questionElement.textContent += text[i];
          i++;
          if (i >= text.length) {
              clearInterval(typeInterval);
              enableInput(); // Re-enable input once typing is finished
              if (callback) callback(); // Call the callback when typing is finished
          }
      }, speed); // Speed of typing
  };

  disableInput(); // Disable input before starting the typing animation
  clearText(); // Start the backspace animation
}

// Functions to disable and enable the input elements
function disableInput() {
  answerBox.disabled = true;
  submitButton.disabled = true;
}

function enableInput() {
  answerBox.disabled = false;
  submitButton.disabled = false;
}
function loadQuestion() {
  if (currentQuestionIndex < quiz.length) {
      typeQuestion(quiz[currentQuestionIndex].question);
      answerBox.value = ""; // Clear the input box
      answerBox.style.display = "block";
      submitButton.style.display = "block";
  } else {
      typeQuestion("Congratulations! You've completed the quiz.", null, 100);
      answerBox.style.display = "none";
      submitButton.style.display = "none";
  }
}

function checkAnswer() {
  const userAnswer = answerBox.value.trim();
  const feedbackElement = document.getElementById('feedback');

  if (userAnswer.toLowerCase() === quiz[currentQuestionIndex].answer.toLowerCase()) {
      feedbackElement.style.display = "none"; // Hide feedback if correct
      typeQuestion(quiz[currentQuestionIndex].congrats, () => {
          setTimeout(() => {
              currentQuestionIndex++;
              typeQuestion(quiz[currentQuestionIndex]?.question || "Quiz Complete!");
          }, 2000); // 2-second delay after congrats
      });
  } else {
      feedbackElement.textContent = "Incorrect! Try again.";
      feedbackElement.style.display = "block"; // Show feedback if wrong
  }
}
// Event listener for the submit button
submitButton.addEventListener('click', checkAnswer);


answerBox.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
      checkAnswer();
  }
});


// Load the first question
loadQuestion();