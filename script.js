// Select all elements with class 'cell' and store them in the 'cells' array
const cells = document.querySelectorAll('.cell');

// Select the elements with classes 'player1' and 'player2' and store them in 'player1' and 'player2' variables
const player1 = document.querySelector('.player1');
const player2 = document.querySelector('.player2');

// Select the element with class 'reset' and store it in the 'reset' variable
const reset = document.querySelector('.reset');

// Define variables
let user1 = "X";
let user2 = "0";
let playerTurn = user1; // Set the initial player's turn to user1
let winner = document.getElementById("winner");
let turnMusic = new Audio("click.mp3");
let gameOver = new Audio("win_sound.mp3");

// Set the text content of 'player1' and 'player2' to display the user symbols
player1.textContent = `Player 1: ${user1}`;
player2.textContent = `Player 2: ${user2}`;

// Function to start the game (add event listeners to cells)
const startGame = () => {
    cells.forEach(cell => {
        cell.addEventListener('click', handleClick);
    });
}

// Function to handle a cell click
const handleClick = (e) => {
    if (e.target.textContent === "") {
        e.target.textContent = playerTurn;
        turnMusic.play();

        if (checkWin()) {
            console.log(`${playerTurn} is Winner..!`);
            winner.innerHTML = `${playerTurn} is Winner..!`;
            document.getElementById("gif").style.width = "120px";
            disableCell();
            gameOver.play();
        } else if (checkTie()) {
            console.log("It's a tie.!");
            winner.innerHTML = `It's a Tie..!`;
            disableCell();
            gameOver.play();
        } else {
            turn();  // Call the function to change the player's turn
        }
    }
}

// Function to change the player's turn
const turn = () => {
    if (playerTurn === user1) {
        playerTurn = user2;
    } else {
        playerTurn = user1;
    }
}

// Function to check for a win
const checkWin = () => {
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < wins.length; i++) {
        const [position1, position2, position3] = wins[i];

        if (cells[position1].textContent !== "" && cells[position1].textContent === cells[position2].textContent && cells[position1].textContent === cells[position3].textContent) {
            return true; // There's a winner
        }
    }

    return false; // No winner yet
}

// Function to check for a tie
const checkTie = () => {
    let emptyCell = 0;
    cells.forEach(cell => {
        if (cell.textContent == "") {
            emptyCell++;
        }
    });

    return emptyCell === 0 && !checkWin(); // It's a tie if no empty cells and no winner
}

// Function to disable cells after a win or tie
const disableCell = () => {
    cells.forEach(cell => {
        cell.removeEventListener("click", handleClick);
        cell.classList.add("disable");
    })
}

// Add a click event listener to the 'reset' button to reload the page
reset.addEventListener("click", function () {
    location.reload();
});

// Call the function to start the game
startGame();
