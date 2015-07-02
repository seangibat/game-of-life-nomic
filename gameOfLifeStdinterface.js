var GameOfLife = require('./gameOfLife.js');
var readline = require('readline');
var iterations;
var lineNumber = 0;
var height = Infinity;
var board = [];

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){
  lineNumber++;

  if (lineNumber === 1) {
    iterations = parseInt(line, 10);
  }
  else if (lineNumber === 2){
    height = parseInt(line.split(' ')[1], 10);
  }
  else if (lineNumber >= 3) {
    board[lineNumber-3] = line.split(" ").map(function(c){ return parseInt(c, 10) });

    if (lineNumber - 2 >= height) {

      rl.close();

      var game = new GameOfLife({
        board: board,
        iterations: iterations
      });

      if (process.argv[2] === "--watch") {
        var interval = parseInt(process.argv[3], 10);
        game.printBoard();

        var runner = setInterval(function(){
          game.iterate();
          game.printBoard();
          console.log("");
          if (!iterations--) clearInterval(runner);
        }, interval);

      } else {
        game.runGame();
        game.printBoard();
      }
    }
  }
});