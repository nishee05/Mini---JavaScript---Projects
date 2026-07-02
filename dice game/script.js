let currentPlayer = 1;
let totalScore1 = 0;
let totalScore2 = 0;
let currentScore1 = 0;
let currentScore2 = 0;
let player1Wins = 0;
let player2Wins = 0;

function generateRandomNumber() {
    if (totalScore1 >= 100 || totalScore2 >= 100) return;

    const randomNumber = Math.floor(Math.random() * 6) + 1;

    const button = document.getElementById('randomButton');
    button.innerHTML = '';
    const img = document.createElement('img');
    img.src = `./number${randomNumber}.png`;
    img.alt = `Image for number ${randomNumber}`;
    img.width = 80;
    img.height = 80;
    img.style.borderRadius = '15px';
    button.appendChild(img);

    if (currentPlayer === 1) {
        if (randomNumber === 1) {
            currentScore1 = 0;
            document.querySelector('.currentScore1').innerText = currentScore1;
            currentPlayer = 2;
        } else {
            currentScore1 += randomNumber;
            document.querySelector('.currentScore1').innerText = currentScore1;
        }
    } else {
        if (randomNumber === 1) {
            currentScore2 = 0;
            document.querySelector('.currentScore2').innerText = currentScore2;
            currentPlayer = 1;
        } else {
            currentScore2 += randomNumber;
            document.querySelector('.currentScore2').innerText = currentScore2;
        }
    }

    updatePlayerBoxColor();
}

function passToOther() {
    if (totalScore1 >= 100 || totalScore2 >= 100) return;

    if (currentPlayer === 1) {
        totalScore1 += currentScore1;
        document.querySelector('.totalScore1').innerText = totalScore1;
        if (totalScore1 >= 100) {
            player1Wins++;
            document.querySelector('.player1Wins').innerText = player1Wins;
            alert('Player 1 Wins!');
            reset(true);
            return;
        }

        currentScore1 = 0;
        document.querySelector('.currentScore1').innerText = currentScore1;
        currentPlayer = 2;
    } else {
        totalScore2 += currentScore2;
        document.querySelector('.totalScore2').innerText = totalScore2;
        if (totalScore2 >= 100) {
            player2Wins++;
            document.querySelector('.player2Wins').innerText = player2Wins;
            alert('Player 2 Wins!');
            reset(true);
            return;
        }

        currentScore2 = 0;
        document.querySelector('.currentScore2').innerText = currentScore2;
        currentPlayer = 1;
    }

    updatePlayerBoxColor();
}

function reset(keepWins = true) {
    totalScore1 = 0;
    totalScore2 = 0;
    currentScore1 = 0;
    currentScore2 = 0;
    currentPlayer = 1;

    document.querySelector('.totalScore1').innerText = totalScore1;
    document.querySelector('.totalScore2').innerText = totalScore2;
    document.querySelector('.currentScore1').innerText = currentScore1;
    document.querySelector('.currentScore2').innerText = currentScore2;

    if (!keepWins) {
        player1Wins = 0;
        player2Wins = 0;
    }

    document.querySelector('.player1Wins').innerText = player1Wins;
    document.querySelector('.player2Wins').innerText = player2Wins;

    updatePlayerBoxColor();
}

function updatePlayerBoxColor() {
    const player1Box = document.getElementById('player1Box');
    const player2Box = document.getElementById('player2Box');

    player1Box.classList.remove('active-player', 'inactive-player');
    player2Box.classList.remove('active-player', 'inactive-player');

    if (currentPlayer === 1) {
        player1Box.classList.add('active-player');
        player2Box.classList.add('inactive-player');
    } else {
        player2Box.classList.add('active-player');
        player1Box.classList.add('inactive-player');
    }
}
