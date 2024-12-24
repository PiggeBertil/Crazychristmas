// Questions and answers
const quiz = [
  {
    question: "Well, well, well... look who decided to check in! I, the Grinch, have taken your precious Christmas gift. Why, you ask? Because Christmas cheer makes me *cringe*! But I’m feeling generous (must be something I ate), so I’ve hidden your gift in a very special place. If you think you’re clever enough to find it, you’ll have to prove it by answering my riddles. Think you’ve got what it takes to outsmart me, the great Grinch? (continue).",
    answer: "continue",
    congrats: "Let’s see if you can even get started!"
  },
  {
    question: "Ugh, numbers... so boring! But I’ll humor you. 1, 1, 2, 3, 5, 8… blah, blah. Tell me which comes next if you’re so smart! Or just give up and let me keep the gift.",
    answer: "13",
    congrats: "Hmph! Lucky guess, smarty-pants. Don’t get too confident—this is far from over!"
  },
  {
    question: "Oh, so you think you're clever? Try this on for size! I’m a giant who never moves, where the winds howl and the clouds cling like clingy Whos. My name is tied to a number, a challenge as cold as my icy heart. Think you can figure it out? Ha! You’ll never get it! Hint: (27.98811877, 86.9249751).",
    answer: "8848",
    congrats: "What?! You actually got it? Bah! Fine, you’re smarter than I thought. Does not say a lot though!"
  },
  {
    question: "Gah, fine, you passed the last one, but this one will stump you for sure! I’ve got pets. Lots of pets. But I won’t make it easy for you. Eight of them aren’t dogs, five aren’t rabbits, and seven aren’t cats. So, smarty-pants, how many pets do I have? Do the math, or just give up and let me keep your gift!",
    answer: "10",
    congrats: "What?! You solved it? This is infuriating! Fine, you’re still in the game… for now."
  },
  {
    question: "Hmph, you’ve made it farther than I expected. Fine! Here’s a little reward for your trouble. The answer you need is hiding under your chair the one you used to sit on right over there. Don’t make me regret being this generous!",
    answer: "600",
    congrats: "Ugh, you found it? Remember that number. Let's call it y!"
  },
  {
    question: "Oh, you think you’re worldly now? Fine, riddle me this: An island so fair in the Baltic Sea, where medieval walls hide secrets from me. Stones that stand on coastal sand—what’s the name of this treasure in Sweden’s land? Surely you’ll mess this one up!",
    answer: "Gotland",
    congrats: "Hmph, so you know a thing or two about the north. Don’t get cocky, ‘Mr. Worldwide’—I’ve got tougher tricks up my sleeve!"
  },
  {
    question: "Alright, let’s see if you know your stuff about the Land of Smiles. This country is home to golden temples, bustling floating markets, and an ancient city where elephants once roamed free. Oh, and it’s shaped like an elephant’s head—how fitting! Name this tropical treasure.",
    answer: "Thailand",
    congrats: "Hmph, so you know Thailand. Big deal! Let’s see how far that knowledge gets you!"
  },
  {
    question: "Well, well, well... look who clawed their way to the end! Fine, I’ll give you one last choice. Just pick the right one—it shouldn’t be too hard for a so-called genius like you. Or will it? Heh heh heh!",
    answer: "89",
    congrats: "How How How! You actually did it?! Bah, don’t expect me to be happy about it! Remember x = 89"
  },
  {
    question: "All right here is the last hint! (🐕*y - ⛰️)*(🐕/5 + 🐕/5) - x https://www.rapidtables.com/convert/number/decimal-to-binary.html",
    answer: "Got it!",
    congrats: "How How How! You actually did it?! Bah, don’t expect me to be happy about it!"
  }


];

let currentQuestionIndex = 0;

// Select DOM elements
const questionElement = document.getElementById('question');
const answerBox = document.getElementById('answer-box');
const submitButton = document.getElementById('submit-answer');


// Load the background music
const backgroundMusic = new Audio('carol-of-the-bells-christmas-piano-music-233788.mp3');

// Set music options
backgroundMusic.loop = true; // Enable looping
backgroundMusic.volume = 0.5; // Set a comfortable volume (0.0 to 1.0)

// Play the music when the page loads
window.addEventListener('load', () => {
    backgroundMusic.play().catch(error => {
        console.log("Background music requires user interaction to start. Enable sound manually.");
    });
});



// Function to type out a question
function typeQuestion(text, callback, speed = 80, deleteSpeed = 30) {
  const typingSound = new Audio('28298_typing-cherry-mx-blue-switches-30614.mp3'); // Load the sound file

  const clearText = () => {
      let currentText = questionElement.textContent;
      const deleteInterval = setInterval(() => {
          if (currentText.length > 0) {
              currentText = currentText.slice(0, -1); // Remove one character
              questionElement.textContent = currentText;
          } else {
              clearInterval(deleteInterval);
              startTyping(); // Start typing the new text after deletion
          }
      }, deleteSpeed); // Speed of deleting
  };

  const startTyping = () => {
      typingSound.currentTime = 0; // Reset sound to start
      typingSound.play(); // Play the sound

      let i = 0;
      const typeInterval = setInterval(() => {
          questionElement.textContent += text[i];
          i++;
          if (i >= text.length) {
              clearInterval(typeInterval);
              typingSound.pause(); // Stop the sound if still playing
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

// Load the wrong answer sound
const wrongAnswerSound = new Audio('Voicy_(THE GRINCH LAUGHING - Sound Effect).mp3');

// Function to check the answer
function checkAnswer() {
    const userAnswer = answerBox.value.trim();
    if (userAnswer.toLowerCase() === quiz[currentQuestionIndex].answer.toLowerCase()) {
            typeQuestion(quiz[currentQuestionIndex].congrats, () => {
                setTimeout(() => {
                    currentQuestionIndex++;
                    loadQuestion();
                }, 2000); // Delay before showing the next question
            });
        } else {
            // Play the wrong answer sound
            wrongAnswerSound.currentTime = 0;
            wrongAnswerSound.play();
        
            // Add visual feedback
            answerBox.classList.add('wrong');
            setTimeout(() => {
                answerBox.classList.remove('wrong');
            }, 500); // Remove the class after the animation ends
        
            alert("Incorrect! Try again.");
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