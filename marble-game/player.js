class Player {
    constructor(name, ballColor) {
        this.name = name
        this.ballColor = ballColor
        this.balls = []
        this.score = 0
    }

    addNewBall() {
        let newBall = new Ball(createVector(STARTING_POSITION_X, STARTING_POSITION_Y), BALL_RADIUS, this.ballColor)
        this.balls.push(newBall)
    }
}