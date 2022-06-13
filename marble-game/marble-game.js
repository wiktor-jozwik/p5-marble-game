let board
let electroBallsNumber = 0

function setup() {
    createCanvas(BOARD_WIDTH, BOARD_HEIGHT);

    board = new Board(BOARD_WIDTH, BOARD_HEIGHT)
    board.init()
}

function draw() {
    if (!board.checkIfEndGame()) {
        background(BACKGROUND_COLOR);
        board.calculateScore()
        board.printScore()

        board.drawScoreCircles()
        board.drawBalls()

        board.addNewBall()
        board.drawPowerRectangle()

        board.checkForElectro()

        board.checkForCollision()
    } else {
        background(BACKGROUND_COLOR);

        board.showWinner()
    }
}

function resetGame() {
    board.resetGame()
}

function mouseClicked() {
    board.playerMove()
}
  