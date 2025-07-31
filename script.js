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
  for (let i = 0; i < boardSize; i++) {
    const boardSpace = document.createElement("div");
    boardSpace.classList.add("board-space");
    boardSpace.textContent = "";
    boardContainer.appendChild(boardSpace);

    boardSpace.addEventListener("click", function () {
      if (gameBoard.board[i] === null && !gameCheck()) {
        currentPlayer.playMarker(i);
        boardSpace.textContent = currentPlayer.marker;

        const result = gameCheck();
        const gameInterface = document.querySelector(".game-interface");
        if (result !== null && result.winner) {
          const winnerMessage = document.createElement("div");
          winnerMessage.classList.add("game-message");
          winnerMessage.textContent = `${currentPlayer.name} wins!`;
          if (gameInterface) {
            gameInterface.appendChild(winnerMessage);
          }
        } else if (result != null && result.tie) {
          const tieMessage = document.createElement("div");
          tieMessage.classList.add("game-message");
          tieMessage.textContent = "It's a tie!";
          if (gameInterface) {
            gameInterface.appendChild(tieMessage);
          }
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
    const gameInterface = document.createElement("div");
    gameInterface.classList.add("game-interface");
    document.body.appendChild(gameInterface);

    const startButton = document.createElement("button");
    startButton.classList.add("start-button");
    startButton.textContent = "Start New Game";
    gameInterface.appendChild(startButton);

    startButton.addEventListener("click", function () {
      gameBoard.reset();

      const oldBoard = document.querySelector(".board-container");
      if (oldBoard) {
        oldBoard.remove();
      }

      const oldMessage = document.querySelector(".game-message");
      if (oldMessage) {
        oldMessage.remove();
      }

      const nameInputHeader = document.createElement("h3");
      nameInputHeader.textContent = "Please Enter Your Names";
      gameInterface.appendChild(nameInputHeader);

      const formContainer = document.createElement("div");
      formContainer.classList.add("form-container");
      gameInterface.appendChild(formContainer);

      const playerSectionRow = document.createElement("div");
      playerSectionRow.classList.add("player-section-row");
      formContainer.appendChild(playerSectionRow);

      const playerOneSection = document.createElement("div");
      playerOneSection.classList.add("player-section");
      playerSectionRow.appendChild(playerOneSection);

      const playerOneLabel = document.createElement("label");
      playerOneLabel.classList.add("input-label");
      playerOneLabel.setAttribute("for", "playerOneInput");
      playerOneLabel.textContent = "'X' Player Name";
      playerOneSection.appendChild(playerOneLabel);

      const playerOneInput = document.createElement("input");
      playerOneInput.classList.add("player-input");
      playerOneInput.id = "playerOneInput";
      playerOneInput.type = "text";
      playerOneInput.name = "name";
      playerOneInput.required = true;
      playerOneInput.minLength = 10;
      playerOneInput.maxLength = 16;
      playerOneSection.appendChild(playerOneInput);

      const playerTwoSection = document.createElement("div");
      playerTwoSection.classList.add("player-section");
      playerSectionRow.appendChild(playerTwoSection);

      const playerTwoLabel = document.createElement("label");
      playerTwoLabel.classList.add("input-label");
      playerTwoLabel.setAttribute("for", "playerTwoInput");
      playerTwoLabel.textContent = "'O' Player Name";
      playerTwoSection.appendChild(playerTwoLabel);

      const playerTwoInput = document.createElement("input");
      playerTwoInput.classList.add("player-input");
      playerTwoInput.id = "playerTwoInput";
      playerTwoInput.type = "text";
      playerTwoInput.name = "name";
      playerTwoInput.required = true;
      playerTwoInput.minLength = 10;
      playerTwoInput.maxLength = 16;
      playerTwoSection.appendChild(playerTwoInput);

      const nameSubmit = document.createElement("input");
      nameSubmit.classList.add("submit-button");
      nameSubmit.type = "submit";
      formContainer.appendChild(nameSubmit);

      nameSubmit.addEventListener("click", function () {
        const playerOneName = playerOneInput.value;
        const playerTwoName = playerTwoInput.value;

        player1.name = playerOneName;
        player2.name = playerTwoName;

        nameInputHeader.remove();
        formContainer.remove();
        playerOneLabel.remove();
        playerOneInput.remove();
        playerTwoLabel.remove();
        playerTwoInput.remove();
        nameSubmit.remove();

        displayGameBoard();
      });
    });
  }
}

playGame();
