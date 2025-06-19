let userScore = 0;
let computerScore = 0;
let mode = 'cpu';
let player1Choice = '';
let player2Choice = '';

function setMode(selectedMode) {
  mode = selectedMode;
  resetGame();
  document.getElementById('player2-label').textContent = mode === 'cpu' ? 'Computer' : 'Player 2';
  document.getElementById('player2-buttons').classList.toggle('hidden', mode === 'cpu');
}

function choose(choice, player) {
  if (player === 1) {
    player1Choice = choice;
    document.getElementById('user-choice').textContent = `Player 1: ${choice}`;
    if (mode === 'cpu') {
      startCountdown(() => {
        const cpuChoice = ['rock', 'paper', 'scissors'][Math.floor(Math.random() * 3)];
        player2Choice = cpuChoice;
        document.getElementById('computer-choice').textContent = `Computer: ${cpuChoice}`;
        declareWinner();
      });
    }
  } else {
    player2Choice = choice;
    document.getElementById('computer-choice').textContent = `Player 2: ${choice}`;
    startCountdown(declareWinner);
  }
}

function startCountdown(callback) {
  const countdown = document.getElementById('countdown');
  let count = 3;
  countdown.textContent = count;
  countdown.style.display = 'block';

  const timer = setInterval(() => {
    count--;
    if (count > 0) {
      countdown.textContent = count;
    } else {
      clearInterval(timer);
      countdown.style.display = 'none';
      callback();
    }
  }, 800);
}

function declareWinner() {
  const result = getWinner(player1Choice, player2Choice);
  document.getElementById('winner').textContent = `Winner: ${result}`;
  if (result === 'Player 1 Wins!') {
    userScore++;
    document.getElementById('user-score').textContent = userScore;
  } else if (result === 'Player 2 Wins!') {
    computerScore++;
    document.getElementById('computer-score').textContent = computerScore;
  }
}

function getWinner(p1, p2) {
  if (p1 === p2) return "It's a Tie!";
  if (
    (p1 === 'rock' && p2 === 'scissors') ||
    (p1 === 'paper' && p2 === 'rock') ||
    (p1 === 'scissors' && p2 === 'paper')
  ) {
    return 'Player 1 Wins!';
  }
  return 'Player 2 Wins!';
}

function resetGame() {
  userScore = 0;
  computerScore = 0;
  player1Choice = '';
  player2Choice = '';
  document.getElementById('user-score').textContent = '0';
  document.getElementById('computer-score').textContent = '0';
  document.getElementById('user-choice').textContent = 'Player 1: -';
  document.getElementById('computer-choice').textContent = 'Player 2: -';
  document.getElementById('winner').textContent = 'Winner: -';
}