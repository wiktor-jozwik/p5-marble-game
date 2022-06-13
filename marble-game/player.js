class Player {
    constructor(name, ballColor) {
        this.name = name
        this.ballColor = ballColor
        this.balls = []
        this.score = 0
    }

    addNewBall() {
        let q = 0
        if (electroBallsNumber <= MAX_ELECTRO_BALLS && Math.random() < Q_PROBABILITY) {
            q = Math.random() * MAX_Q
            electroBallsNumber++
        }
        let newBall = new Ball(createVector(STARTING_POSITION_X, STARTING_POSITION_Y), BALL_RADIUS, this.ballColor, q)
        this.balls.push(newBall)
    }
}