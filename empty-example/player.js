class Player {
    constructor(name, ballColor) {
        this.name = name
        this.ballColor = ballColor
        this.balls = []
        this.score = 0
    }


    addNewBall() {
        let newBall = new Ball(createVector(startingPositionX, startingPositionY), ballRadius, this.ballColor)
        this.balls.push(newBall)
    }
}