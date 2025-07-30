const gameBoard = {
  board: Array(9).fill(null),
  reset: function () {
    // Resets the game board by filling the board with null values
    this.board.fill(null);
  },
};

const player1 = {
  name: "X Player",
  marker: "X",
  playMarker: function (boardIndex) {
    // Check if the chosen index has not been taken
    if (gameBoard.board[boardIndex] === null) {
      // Place the X player's marker on the board
      gameBoard.board[boardIndex] = this.marker;
    }
  },
};

const player2 = {
  name: "O Player",
  marker: "O",
  playMarker: function (boardIndex) {
    // Check if the chosen index has not been taken
    if (gameBoard.board[boardIndex] === null) {
      // Place the O player's marker on the board
      gameBoard.board[boardIndex] = this.marker;
    }
  },
};

function gameCheck() {
  const board = gameBoard.board;
  const winPatterns = [
    // rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonals
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winPatterns.length; i++) {
    let pattern = winPatterns[i];
    let a = pattern[0];
    let b = pattern[1];
    let c = pattern[2];

    if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], pattern: pattern };
    }
  }

  // If there is no winner, returns tie
  let allFilled = true;
  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      allFilled = false;
      break;
    }
  }
  if (allFilled) {
    return { tie: true };
  }

  // Game is still not over
  return null;
}

let currentPlayer = player1;

function displayGameBoard() {
  const boardContainer = document.createElement("div");
  boardContainer.classList.add("board-container");
  document.body.appendChild(boardContainer);

  const boardSize = 9;
  for (let i = 0; i <= boardSize; i++) {
    const boardSpace = document.createElement("div");
    boardSpace.classList.add("board-space");
    boardSpace.textContent = "";
    boardContainer.appendChild(boardSpace);

    boardSpace.addEventListener("click", function () {
      if (gameBoard.board[i] === null && !gameCheck()) {
        currentPlayer.playMarker(i);
        boardSpace.textContent = currentPlayer.marker;

        const result = gameCheck();
        if (result !== null && result.winner) {
          alert(`Player ${currentPlayer.marker} wins!`);
        } else if (result != null && result.tie) {
          alert("It's a tie!");
        } else {
          if (currentPlayer === player1) {
            currentPlayer = player2;
          } else {
            currentPlayer = player1;
          }
        }
      }
    });
  }
}

function playGame() {
  if (gameCheck() === null) {
    const startButton = document.createElement("button");
    startButton.classList.add("start-button");
    startButton.textContent = "Start New Game";
    document.body.appendChild(startButton);

    startButton.addEventListener("click", function () {
      gameBoard.reset();

      const oldBoard = document.querySelector(".board-container");
      if (oldBoard) {
        oldBoard.remove();
      }

      displayGameBoard();
    });
  }
}

playGame();
