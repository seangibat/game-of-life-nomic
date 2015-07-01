var GameOfLife = function(settings){
  this.board = settings.board;
  this.iterations = settings.iterations;
  this.width = settings.board.length;
  this.height = settings.board.length ? settings.board[0].length : 0;
};

GameOfLife.prototype.iterate = function(){
  var that = this;
  this.board = this.board.map(function(row, rowIndex){
    return row.map(function(piece, colIndex){
      var neighbors = that.numLivingNeighbors(rowIndex, colIndex);

      if (piece) {
        if (neighbors < 2 || neighbors > 3) return 0;
        else return 1;
      } 

      if (!piece) {
        if (neighbors === 3) return 1;
        else return 0;
      }
    });
  });
};

GameOfLife.prototype.numLivingNeighbors = function(row, col){
  var count = 0;
  var leftNeighborCol = (col - 1 >= 0) ? (col - 1) : (this.width - 1);
  var rightNeighborCol = (col + 1 < this.width) ? (col + 1) : 0;
  var topNeighborRow = (row - 1 >= 0) ? (row - 1) : (this.height - 1);
  var bottomNeighborRow = (row + 1 < this.height) ? (row + 1) : 0;

  if (this.board[topNeighborRow][col] === 1) count++;
  if (this.board[bottomNeighborRow][col] === 1) count++;
  if (this.board[row][leftNeighborCol] === 1) count++;
  if (this.board[row][rightNeighborCol] === 1) count++;
  if (this.board[topNeighborRow][leftNeighborCol] === 1) count++;
  if (this.board[topNeighborRow][rightNeighborCol] === 1) count++;
  if (this.board[bottomNeighborRow][leftNeighborCol] === 1) count++;
  if (this.board[bottomNeighborRow][rightNeighborCol] === 1) count++;

  return count;
};

GameOfLife.prototype.runGame = function(){
  for (var i = 0; i < this.iterations; i++){
    this.iterate();
  }
};

GameOfLife.prototype.printBoard = function(){
  this.board.forEach(function(row){
    console.log(row.join(" "));
  });
};

module.exports = GameOfLife;