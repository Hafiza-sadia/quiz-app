const startButton = document.querySelector('.start');
const nextButton = document.querySelector('.next');
const questionContainer = document.querySelector('.question-con');
const answerButtons = document.querySelector('.answer-button');
const scoreDisplay = document.getElementById('right-answer');

const questions = [
  {
    question: 'What is the capital of Pakistan?',
    answers: [
      { text: 'Karachi', correct: false },
      { text: 'Islamabad', correct: true },
      { text: 'Lahore', correct: false },
      { text: 'Quetta', correct: false }
    ]
  },
  {
    question: 'HTML stands for?',
    answers: [
      { text: 'Hyper Text Makeup Language', correct: false },
      { text: 'Hyper Text Markup Language', correct: true },
      { text: 'Home Tool Markup Language', correct: false },
      { text: 'Hyperlinks and Text Markup Language', correct: false }
    ]
  },
  {
    question: 'CSS is used for?',
    answers: [
      { text: 'Styling web pages', correct: true },
      { text: 'Server management', correct: false },
      { text: 'Database design', correct: false },
      { text: 'Programming logic', correct: false }
    ]
  }
];

let currentQuestionIndex = 0;
let score = 0;

startButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startQuiz() {
  startButton.style.display = 'none';
  currentQuestionIndex = 0;
  score = 0;
  scoreDisplay.textContent = '';
  questionContainer.style.display = 'block';
  nextButton.style.display = 'none';
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionContainer.querySelector('h2')?.remove();
  const qElement = document.createElement('h2');
  qElement.textContent = question.question;
  qElement.style.marginBottom = '15px';
  questionContainer.prepend(qElement);

  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) button.dataset.correct = answer.correct;
    button.addEventListener('click', selectAnswer);
    answerButtons.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === 'true';
  if (correct) score++;

  setStatusClass(selectedButton, correct);
  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === 'true');
  });

  if (questions.length > currentQuestionIndex + 1) {
    nextButton.style.display = 'inline-block';
  } else {
    startButton.innerText = 'Restart';
    startButton.style.display = 'inline-block';
    scoreDisplay.textContent = `Your Score: ${score}/${questions.length}`;
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  element.classList.add(correct ? 'correct' : 'wrong');
}

function clearStatusClass(element) {
  element.classList.remove('correct', 'wrong');
}
