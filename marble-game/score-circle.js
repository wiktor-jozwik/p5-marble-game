

class ScoreCircle {
    constructor(radius, points, x, y, color) {
        this.radius = radius
        this.points = points
        this.x = x
        this.y = y
        this.color = color
    }

    checkIfBallInside(ballX, ballY, ballRadius) {
        let distance = Math.sqrt((ballX - this.x)**2 + (ballY - this.y)**2)
        if (distance > (this.radius + ballRadius)) {
            return false
        } 
        return true
    }
}