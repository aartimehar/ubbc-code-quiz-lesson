const questions = [
  {
    question: 'Inside which HTML element do we put the JavaScript?',
    choices: ['<Javascript>', '<script>', '<scripting>', '<js>'],
    answer: '<script>'
  },
  {
    question: 'What surrounds a string?',
    choices: ['quotation', 'curly-brackets', 'parentheses', 'Square-Brackets'],
    answer: 'quotation'
  },
  {
    question: 'Why do we write functions?',
    choices: [
      'Make our code easier to understand',
      'Avoid writing repeated code',
      'make our code reuseable',
      'All of these'
    ],
    answer: 'All of these'
  },
  {
    question: 'Do functions in JavaScript necessarily return a value?',
    choices: [
      'It is Manadatory',
      'Not necessary',
      'Few Functions return values by default',
      'Some functions do not return any value'
    ],
    answer: 'Not necessary'
  },
  {
    question:
      'Will the following JavaScript code work?  var tensquared = (function(x) {return x*x;}(10));',
    choices: [
      'Yes,Perfectly',
      'Error',
      'Exception will be thrown',
      'Memory Leak'
    ],
    answer: 'Yes,Perfectly'
  }
]

let currentQuestion = 0
let score = 0
let questionTitle = document.querySelector('#question-title')
let timer = document.querySelector('#time')
let secondsLeft = 60

function onStartQuiz () {
  // Set timer to 60 seconds and start routine to reduce by 1 every second
  timer.innerText = secondsLeft
  setInterval(() => onTick(timer), 1000)

  // Hide current quiz elements
  let startScreen = document.querySelector('#start-screen')
  startScreen.style.display = 'none'

  // Show first question
  let questionScreen = document.querySelector('#questions')
  questionScreen.style.display = 'block'

  updateQuestions()
}

function onAnswerSelected (answer) {
  // Check if answer selected is correct
  let correctAnswer = questions[currentQuestion].answer

  if (answer.value === correctAnswer) {
    score++
    currentQuestion++
    // Move on to next question, or if we are out of questions, show score screen
    updateQuestions()
  } else {
    // Reduce timer by 10 seconds
    secondsLeft -= 10
    timer.innerText = secondsLeft

    currentQuestion++
    // Move on to next question, or if we are out of questions, show score screen
    updateQuestions()
    // Move on to next question, or if we are out of questions, show score screen
  }
}

function updateQuestions () {
  // Check if we have reached the end of questions
  if (currentQuestion === 5) {
    // Save score of user as cookie
    document.cookie = `score=${score}`

    // Navigate to highscore page
    window.location.href = '/highscores.html'
  }

  // Change question title and choices to next question
  questionTitle.innerText = questions[currentQuestion].question

  for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
    // Update labels text
    let choiceLabel = document.querySelector(`#q${i}label`)
    choiceLabel.innerText = questions[currentQuestion].choices[i]

    // Update the value of radio input
    let choice = document.querySelector(`#q${i}choice`)
    choice.setAttribute('value', questions[currentQuestion].choices[i])
  }
}

function onTick (timer) {
  secondsLeft--
  timer.innerText = secondsLeft

  if (secondsLeft < 1) {
    // Time is up, show highscore screen
    currentQuestion = 5
    updateQuestions()
  }
}
