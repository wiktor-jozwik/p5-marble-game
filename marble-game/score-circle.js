class ScoreCircle {
    constructor(radius, points, x, y, color) {
        this.radius = radius
        this.points = points
        this.pos = createVector(x, y)
        this.color = color
    }

    checkIfBallInside(ball) {
        return ball.distanceFromObject(this.pos) <= (this.radius + BALL_RADIUS)
    }
}