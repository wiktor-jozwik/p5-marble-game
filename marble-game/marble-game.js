let boardWidth = 1000
let boardHeight = 500
let powerRectangleWidth = 15

let startingPositionX = boardWidth / 10
let startingPositionY = boardHeight / 2

let ballRadius = 10
const delta = 0.8

const backgroundColor = 240

const MAX_MOVES = 2

let canAddNewBall
let gameOver = false

let board


function setup() {
  createCanvas(boardWidth, boardHeight);
  board = new Board(boardWidth, boardHeight)

  board.init()
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

function mousePressed() {
  board.mousePressed()
}


  