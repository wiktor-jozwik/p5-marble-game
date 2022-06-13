class Board {
    CIRCLE_POSITION_FACTOR_X = 75 / 100
    CIRCLE_POSITION_FACTOR_Y = 1 / 2
    constructor(width, height) {
        this.width = width
        this.height = height
        this.players = []
        this.currentPlayerIndex = 0
        this.scoreCircles = []
        this.canAddNewBall = false
        // Variable to prevent colliding the same ball few times just in few next frames
        // its cleared every time when ball bounce or next ball is colliding
        this.collidingBalls = []
    }

    init() {
        this.players = [new Player(PLAYER_1.name, PLAYER_1.color), new Player(PLAYER_2.name, PLAYER_2.color)]
        this.players[this.currentPlayerIndex].addNewBall()
        this.initScoreCircles()
    }

    initScoreCircles() {
        let circlePositionX = this.width * this.CIRCLE_POSITION_FACTOR_X
        let circlePositionY = this.height * this.CIRCLE_POSITION_FACTOR_Y

        CIRCLES_DATA.forEach(circleInfo => {
            this.scoreCircles.push(new ScoreCircle(circleInfo.radius, circleInfo.points, circlePositionX, circlePositionY, circleInfo.color))
        })
    }

    resetGame() {
        this.players = []
        this.scoreCircles = []
        this.currentPlayerIndex = 0
        this.init()
    }

    drawScoreCircles() {
        let circlePositionX = this.width * this.CIRCLE_POSITION_FACTOR_X
        let circlePositionY = this.height * this.CIRCLE_POSITION_FACTOR_Y
        const reversedCircles = [...this.scoreCircles].reverse()

        reversedCircles.forEach(scoreCircle => {
            const {r, g, b} = scoreCircle.color
            fill(r, g, b)
            circle(circlePositionX, circlePositionY, scoreCircle.radius * 2)
        })
    }

    drawBalls() {
        this.players.forEach(player => {
            player.balls.forEach(ball => {
                ball.show()
                ball.update(UPDATE_BALL_DELTA)
            })
        })
        let currentBall = this.getCurrentBall()
        if (currentBall && this.checkIfBallsNotMoving() && !this.canAddNewBall) {
            let mouse = createVector(mouseX - STARTING_POSITION_X, mouseY - STARTING_POSITION_Y)
            mouse.normalize()
            mouse.mult(50)
            this.displayArrow(currentBall.pos, mouse);
        }
    }

    checkIfBallsNotMoving() {
        let allBalls = []
        this.players.forEach(player => allBalls.push(...player.balls))
        for (const ball of allBalls) {
            if (ball.isMoving()) {
                return false
            }
        }
        return true
    }

    addNewBall() {
        if (this.canAddNewBall && this.checkIfBallsNotMoving()) {
            let currentPlayer = this.players[0].balls.length > this.players[1].balls.length ? this.players[1] : this.players[0]
            currentPlayer.addNewBall()

            this.canAddNewBall = false
        }
    }

    drawPowerRectangle() {
        if (this.checkIfBallsNotMoving()) {
            let currentBall = this.getCurrentBall()
            let dist = currentBall.distanceFromObject(createVector(mouseX, mouseY))
            fill(255, this.width / 5 / dist * 255, 0)

            let rectangleHeight = this.height - dist / (this.width / 550)
            rectangleHeight = rectangleHeight > 0 ? rectangleHeight : 0

            rect(0, rectangleHeight, POWER_RECTANGLE_WIDTH, BOARD_HEIGHT)
        }
    }

    playerMove() {
        if (this.checkIfBallsNotMoving()) {
            this.collidingBalls = []
            this.canAddNewBall = true
            let currentBall = this.getCurrentBall()

            let vector = createVector(mouseX - currentBall.pos.x, mouseY - currentBall.pos.y)
            currentBall.hit(vector.mag() / 25, vector.heading())

            if (this.currentPlayerIndex === 0) {
                this.currentPlayerIndex = 1
            } else {
                this.currentPlayerIndex = 0
            }
        }
    }

    checkForCollision() {
        let allBalls = []
        this.players.forEach(player => allBalls.push(...player.balls))

        for (const ball1 of allBalls) {
            for (const ball2 of allBalls) {
                if (ball1 !== ball2) {
                    if (!this.searchIfBallsAmongColliding(ball1, ball2) && ball1.pos.dist(ball2.pos) <= ball1.radius * 2) {
                        this.collidingBalls = []
                        this.collidingBalls.push([ball1, ball2])

                        ball1.collide(ball2)
                    }
                }
                let bounced1 = ball1.checkBounce()
                let bounced2 = ball2.checkBounce()
                if (bounced1) {
                    this.removeBallFromColliding(ball1)
                }
                if (bounced2) {
                    this.removeBallFromColliding(ball2)
                }
            }
        }
    }

    checkForElectro() {
        let allBalls = []
        this.players.forEach(player => allBalls.push(...player.balls))

        allBalls = allBalls.filter(ball => !ball.isInStartingPostion()).sort(() => (Math.random() > 0.5) ? 1 : -1)
        let force = createVector(0, 0)

        for (const ball1 of allBalls) {
            for (const ball2 of allBalls) {
                if (ball1 !== ball2) {
                    if (!this.searchIfBallsAmongColliding(ball1, ball2) && ball1.pos.dist(ball2.pos) <= ball1.radius * 2) {
                        this.collidingBalls = []
                        this.collidingBalls.push([ball1, ball2])

                        ball1.collide(ball2)
                    }
                    let bounced1 = ball1.checkBounce()
                    let bounced2 = ball2.checkBounce()
                    if (bounced1) {
                        this.removeBallFromColliding(ball1)
                    }
                    if (bounced2) {
                        this.removeBallFromColliding(ball2)
                    }

                    
                    if (ball1.q === 0 || ball2.q === 0) {
                        continue
                    }
                    force.add(eForce(ball1.q, ball1.pos, ball2.q, ball2.pos))

                    if (force.mag() > E_FORCE_MARGIN) {
                        ball1.velocity.add(force.copy().div(100));

                        ball2.velocity.sub(force.copy().div(100))
                    }
                }
            }
        }
    }

    searchIfBallsAmongColliding(ball1, ball2) {
        return (this.collidingBalls.filter(balls => balls.includes(ball1) && balls.includes(ball2))).length > 0
    }

    removeBallFromColliding(ball) {
        this.collidingBalls = this.collidingBalls.filter(balls => !balls.includes(ball))
    }

    getCurrentBall() {
        let balls = this.players[this.currentPlayerIndex].balls
        return balls[balls.length - 1]
    }

    calculateScore() {
        this.players.forEach(player => {
            let score = 0
            player.balls.forEach(ball => {
                if (!ball.isMoving() && !ball.isInStartingPostion()) {
                    for (const circle of this.scoreCircles) {
                        if (circle.checkIfBallInside(ball)) {
                            score += circle.points
                            break
                        }
                    }
                    player.score = score
                }
            })
        })
    }

    printScore() {
        let i = 1
        this.players.forEach(player => {
            i += 1
            textSize(20)
            fill(0, 0, 0)
            text(`${player.name} score: ${player.score}`, 35, 25 * i)
        })
    }

    checkIfEndGame() {
        let ballsCount = 0
        this.players.forEach(player => {
            ballsCount += player.balls.length
        })

        if (ballsCount > MAX_MOVES * 2) {
            this.canAddNewBall = false
            return true
        }
        return false
    }

    showWinner() {
        this.calculateScore()
        const winner = this.getWinner()
        let winningMessage
        if (winner) {
            winningMessage = `${winner.name} has won with ${winner.score} points`
        } else {
            winningMessage = `It's a tie, both players have got ${this.players[0].score} points`
        }

        textSize(20)
        fill(0, 0, 0)
        text(winningMessage, this.width / 2.5, this.height / 2)
    }

    getWinner() {
        let winner
        if (this.players[0].score > this.players[1].score) {
            winner = this.players[0]
        } else if (this.players[0].score < this.players[1].score) {
            winner = this.players[1]
        }
        return winner
    }


    displayArrow(base, vec) {
        push();
        stroke(0);
        strokeWeight(3);
        fill(0);
        translate(base.x, base.y);
        line(0, 0, vec.x, vec.y);
        rotate(vec.heading());
        let arrowSize = 7;
        translate(vec.mag() - arrowSize, 0);
        triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
        pop();
    }
}