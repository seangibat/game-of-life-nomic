var GameOfLife = require('./gameOfLife.js');
var readline = require('readline');
var iterations;
var lineNumber = 0;
var board = [];

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

rl.on('line', function(line){

  if (line === "EOF") {
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
  else if (lineNumber === 0) {
    iterations = parseInt(line, 10);
  } 
  else if (lineNumber > 1) {
    board[lineNumber-2] = line.split(" ").map(function(c){ return parseInt(c, 10) });
  }

  lineNumber++;
});