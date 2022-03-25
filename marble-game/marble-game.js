let boardWidth = 1200
let boardHeight = 600
let powerRectangleWidth = 15

let startingPositionX = boardWidth / 10
let startingPositionY = boardHeight / 2

let ballRadius = 10
const delta = 0.8

const backgroundColor = 240

const MAX_MOVES = 20

let canAddNewBall
let gameOver = false

let board


function setup() {
  let canvas = createCanvas(boardWidth, boardHeight);
  canvas.mouseClicked(playerMove)

  board = new Board(boardWidth, boardHeight)
  board.init()

  let resetButton = createButton("Reset game");
  resetButton.addClass('reset-button')
  resetButton.mouseClicked(resetGame);
}


function draw() {
  if (!gameOver) {
    background(backgroundColor);
    board.calculateScore()
    board.printScore()

    board.drawScoreCircles()

    board.drawBalls()
  
    if (canAddNewBall) {
      board.addNewBall()
    }
    
    board.drawPowerRectangle()
  
    board.collisionCheck()
    
    board.checkIfEndGame()  
  } 
  else {
    background(backgroundColor);

    board.printWinner()
  }
}

function resetGame() {
  board.resetGame()
}

function playerMove() {
  board.playerMove()
}
  