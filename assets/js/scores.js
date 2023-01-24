// Get score from cookie, if exists
let score = document.cookie[document.cookie.length - 1]

// Update score text
let scoreText = document.querySelector('#highscores')
scoreText.innerText = 'Your last score was: ' + score
