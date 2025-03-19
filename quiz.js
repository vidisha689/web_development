const questions = [
  {
    question: "What is the largest planet in our solar system?",

    answers: [

      { text: "Earth", correct: false },

      { text: "Saturn", correct: false },

      { text: "Jupiter", correct: true },

      { text: "Neptune", correct: false }

    ]

  },

  {

    question: "Who wrote 'Romeo and Julite'?",

    answers: [

      { text: "William Shakespeare", correct: true },

      { text: "Charles Dickens", correct: false },

      { text: "William Wordsworth ", correct: false },

      { text: "Jane Austen", correct: false }

    ]

  },

  {

    question: "Which element has the chemical symbol 'O'?",

    answers: [

        { text: "Gold", correct: false },

        { text: "Oxygen", correct: true },

        { text: "Osmium", correct: false },

        { text: "Ozone", correct: false },

    ]

  }

];
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const finalScoreElement = document.getElementById("final-score");
const resultContainer = document.getElementById("result-container");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerText = "Next";
  resultContainer.classList.add("hidden");
  scoreElement.textContent = score;
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(answer.correct));
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(correct) {
  if (correct) {
    score++;
  }
  scoreElement.textContent = score; // Update score after each question
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
});

function endQuiz() {
  resultContainer.classList.remove("hidden");
  finalScoreElement.textContent = score; // Ensure final score is shown correctly
  nextButton.innerText = "Restart";
  nextButton.addEventListener("click", startQuiz);
}

document.getElementById("restart-btn").addEventListener("click", startQuiz);

startQuiz();

