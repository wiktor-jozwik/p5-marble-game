let boardWidth = 1000
let boardHeight = 500
let powerRectangleWidth = 15

let startingPositionX = boardWidth / 10
let startingPositionY = boardHeight / 2

let ballRadius = 10
const delta = 0.8

const backgroundColor = 220

let board


function setup() {
    createCanvas(boardWidth, boardHeight);
    board = new Board(boardWidth, boardHeight)

  board.init()
}


function draw() {
  background(backgroundColor);

  board.drawScoreCircles()

  board.drawBalls()
  
  board.drawPowerRectangle()

  board.collisionCheck()

  board.calculateScore()

  board.printScore()
}

function mousePressed() {
    board.mousePressed()
}


  