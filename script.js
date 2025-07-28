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

console.log(gameBoard);
console.log(player1.playMarker(0));
console.log(player2.playMarker(5));
