let boardWidth = 1000
let boardHeight = 500
let rectangleWidth = 15

let startingPositionX = boardWidth / 10
let startingPositionY = boardHeight / 2

let ballRadius = 10
const delta = 0.8

const backgroundColor = 220

const circle1Radius = 50
const circle2Radius = 100
const circle3Radius = 200
const circle4Radius = 300

let balls = []
let whiteBall

class Ball {
  constructor(pos, radius) {
    this.pos = pos
    this.radius = radius
    this.velocity = createVector(0,0)
  }
  
  show() {
    fill(255)
    ellipse(this.pos.x, this.pos.y, this.radius*2)
  }
  
  update(delta) {
    this.pos.add(p5.Vector.mult(this.velocity, delta))
    checkBounce()
    
    
    this.velocity.mult(0.98)
    if(this.velocity.mag() > .02) {
      this.velocity.setMag(this.velocity.mag()-0.02)
    }
    else {
      this.velocity = createVector();
    }
  }

  hit(power, rotation) {
    this.velocity.add(createVector(power * cos(rotation), power * sin(rotation)))
  }
  
  bounceX() {
    if (this.pos.x > boardWidth / 2) {
      this.velocity.x = -abs(this.velocity.x)
    } else {
      this.velocity.x = abs(this.velocity.x)
    }
  }

  bounceY() {
    if (this.pos.y > boardHeight / 2) {
      this.velocity.y = -abs(this.velocity.y)
    } else {
      this.velocity.y = abs(this.velocity.y)
    }
  }
}


function setup() {
  createCanvas(boardWidth, boardHeight);
  
  drawScoreCircles()
  
  whiteBall = new Ball(createVector(startingPositionX, startingPositionY), ballRadius)
  
  balls.push(whiteBall)
}

function drawScoreCircles() {
  circlePositionX = boardWidth * (8/10) 
  circlePositionY = boardHeight * (1/2) 
  fill(0, 255, 0)
  circle(circlePositionX, circlePositionY, circle4Radius)

  fill(0, 191, 255)
  circle(circlePositionX, circlePositionY, circle3Radius)

  fill(75, 0, 130)
  circle(circlePositionX, circlePositionY, circle2Radius)

  fill(148, 0, 211)
  circle(circlePositionX, circlePositionY, circle1Radius)
}

function draw() {
  background(backgroundColor);
  drawScoreCircles()
  
  drawBall()
  
  var dist = Math.sqrt(Math.pow((whiteBall.pos.x - mouseX), 2) + Math.pow((whiteBall.pos.y - mouseY), 2) )

  arrow(whiteBall.pos.x, whiteBall.pos.y,mouseX, mouseY);
			
  fill(255, 140/dist * 255, 0)
  
  rect(0, 0, rectangleWidth, boardHeight)
}

function drawBall() {
  let whiteBall = balls[0]
  
  whiteBall.show()
  whiteBall.update(delta)
  
  arrow(whiteBall.pos.x, whiteBall.pos.y, mouseX, mouseY);
}

function checkBounce() {
  balls.forEach(ball => {
    if (ball.pos.x <= rectangleWidth + ball.radius || ball.pos.x >= boardWidth - ball.radius) {
      ball.bounceX()
    }
    if (ball.pos.y <= ball.radius || ball.pos.y >= boardHeight - ball.radius) {
      ball.bounceY()
    }
  })
}

function mousePressed() {
  let vector = createVector(mouseX - whiteBall.pos.x, mouseY - whiteBall.pos.y)
  whiteBall.hit(vector.mag()/25, vector.heading())
}

function arrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  push();
  translate(x2, y2);
  var a = atan2(x1-x2, y2-y1);
  rotate(a);
  line(0, 0, -10, -10);
  line(0, 0, 10, -10);
  pop();
}

  