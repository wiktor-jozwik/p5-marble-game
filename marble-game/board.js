
const circlesInfo = [
  {
    radius: 150,
    points: 4,
    color: {
      r: 0,
      g: 255,
      b: 0,
    }
  },
  {
    radius: 100,
    points: 6,
    color: {
      r: 0,
      g: 191,
      b: 255,
    }
  },
  {
    radius: 50,
    points: 12,
    color: {
      r: 75,
      g: 0,
      b: 130,
    }
  },
  {
    radius: 25,
    points: 20,
    color: {
      r: 148,
      g: 0,
      b: 211,
    }
  },
]

const player1 = {
  name: "Blue",
  color: {
    r: 0,
    g: 0,
    b: 255
  }
}

const player2 = {
  name: "Red",
  color: {
    r: 255,
    g: 0,
    b: 0
  }
}


class Board {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.players = []
    this.currentPlayerIndex = 0
    this.scoreCircles = []
  }

  init() {
    this.players = [new Player(player1.name, player1.color), new Player(player2.name, player2.color)]
    this.players[this.currentPlayerIndex].addNewBall()
    this.initScoreCircles()
  }

  initScoreCircles() {
    let circlePositionX = this.width * (8/10) 
    let circlePositionY = this.height * (1/2)

    circlesInfo.forEach(circleInfo => {
      this.scoreCircles.push(new ScoreCircle(circleInfo.radius, circleInfo.points, circlePositionX, circlePositionY, circleInfo.color))
    })
  }

  drawScoreCircles() {
    let circlePositionX = this.width * (8/10) 
    let circlePositionY = this.height * (1/2)
    this.scoreCircles.forEach(scoreCircle => {
      const {r, g, b} = scoreCircle.color
      fill(r, g, b)
      circle(circlePositionX, circlePositionY, scoreCircle.radius*2)
    })
  }

  drawBalls() {
    this.players.forEach(player => {
      player.balls.forEach(ball => {
          ball.show()
          ball.update(delta)
          ball.checkBounce()
      })
  })
    let currentBall = this.getCurrentBall()
    if (currentBall && this.checkIfBallsNotMoving()) {
      this.arrow(currentBall.pos.x, currentBall.pos.y, mouseX, mouseY);
    }
  }

  checkIfBallsNotMoving() {
    let allBalls = []
    allBalls.push(...this.players[0].balls)
    allBalls.push(...this.players[1].balls)
    for (const ball of allBalls) {
      if (ball.isMoving()) {
        return false
      }
    }
    return true
  }

  addNewBall() {
    if (this.checkIfBallsNotMoving()) {
      let currentPlayer = this.players[0].balls.length > this.players[1].balls.length ? this.players[1] : this.players[0]
      currentPlayer.addNewBall()
  
      canAddNewBall = false
    }
  }

  drawPowerRectangle() {
    let currentBall = this.getCurrentBall()
    if (currentBall) {
      var dist = Math.sqrt(Math.pow((currentBall.pos.x - mouseX), 2) + Math.pow((currentBall.pos.y - mouseY), 2) )
  
      fill(255, 140/dist * 255, 0)
    
      rect(0, 0, powerRectangleWidth, boardHeight)
    }
  }

  mousePressed() {
    if (this.checkIfBallsNotMoving()) {
      canAddNewBall = true
      let currentBall = this.getCurrentBall()
  
      let vector = createVector(mouseX - currentBall.pos.x, mouseY - currentBall.pos.y)
      currentBall.hit(vector.mag()/25, vector.heading())
  
    if (this.currentPlayerIndex === 0) {
      this.currentPlayerIndex = 1
    } else {
      this.currentPlayerIndex = 0
    }
  }
}

collisionCheck() {
  let allBalls = []
  allBalls.push(...this.players[0].balls)
  allBalls.push(...this.players[1].balls)

    for (const ball1 of allBalls) {
      for (const ball2 of allBalls) {
        if (ball1 !== ball2) {
          if(ball1.pos.dist(ball2.pos) <= ball1.radius * 2) {
            ball1.collide(ball2)
          }
      }
    }
  }
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
          this.scoreCircles.forEach(circle => {
            if (circle.checkIfBallInside(ball.pos.x, ball.pos.y, ball.radius)) {
              score += circle.points
            }
          })
          if (score) {
            player.score = score
          }
        }
      })
    })
  }

  printScore() {
    let i = 1
    this.players.forEach(player => {
      i += 1
      textSize(20)
      fill(0,0,0)
      text(`${player.name} score: ${player.score}`, 35, 25 * i)
    })
  }

  checkIfEndGame() {
    let ballsCount = 0
    this.players.forEach(player => {
      ballsCount += player.balls.length
    })

    if (ballsCount > MAX_MOVES*2){
      canAddNewBall = false
      gameOver = true
    }
  }

  printWinner() {
    const winner = this.getWinner()
    let winningMessage
    if (winner) {
      winningMessage = `${winner.name} has won with: ${winner.score}`
    } else {
      winningMessage = `It's a tie, both players have got ${this.players[0].score} points`
    }
    
    textSize(20)
    fill(0,0,0)
    text(winningMessage, this.width/3, this.height/2)
  }

  getWinner() {
    this.calculateScore()
    let winner
    if (this.players[0].score > this.players[1].score) {
      winner = this.players[0]
    } else if (this.players[0].score < this.players[1].score) {
      winner = this.players[1]
    }
    return winner
  }

  arrow(x1, y1, x2, y2) {
    line(x1, y1, x2, y2);
    push();
    translate(x2, y2);
    var a = atan2(x1-x2, y2-y1);
    rotate(a);
    line(0, 0, -10, -10);
    line(0, 0, 10, -10);
    pop();
  }
}