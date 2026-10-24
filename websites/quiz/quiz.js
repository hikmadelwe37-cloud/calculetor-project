// 1. Array of question objects
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyperlink and Text Markup Language",
    ],
    correct: 0, // Index of the correct answer
  },
  {
    question: "Which language runs in a web browser?",
    answers: ["Java", "C++", "JavaScript"],
    correct: 2,
  },
  {
    question: "What symbol is used for comments in JavaScript?",
    answers: ["<!-- -->", "//", "/* */"],
    correct: 1,
  },
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

// 2. Function to load and display the current question
function showQuestion() {
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;

  // Update button text dynamically
  const buttons = answerButtonsElement.getElementsByClassName("btn");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].textContent = currentQuestion.answers[i];
  }
}

// 3. Function to handle user clicks
function selectAnswer(selectedIndex) {
  let currentQuestion = questions[currentQuestionIndex];

  // Check if the answer is correct
  if (selectedIndex === currentQuestion.correct) {
    score++;
  }

  currentQuestionIndex++;

  // Check if there are more questions, otherwise show final score
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// 4. Function to display the final score
function showScore() {
  const quizContainer = document.getElementById("quiz");
  quizContainer.innerHTML = `
        <h2>Quiz Completed!</h2>
        <p>Your Score: ${score} out of ${questions.length}</p>
        <button class="btn" onclick="location.reload()">Restart Quiz</button>
    `;
}

// Run the quiz for the first time
showQuestion();
