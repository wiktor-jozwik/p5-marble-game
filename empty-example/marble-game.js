let boardWidth = 1000
let boardHeight = 500
let powerRectangleWidth = 15

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


function setup() {
  createCanvas(boardWidth, boardHeight);
  
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
  
  rect(0, 0, powerRectangleWidth, boardHeight)
}

function drawBall() {
  let whiteBall = balls[0]
  
  whiteBall.show()
  whiteBall.update(delta)
  
  arrow(whiteBall.pos.x, whiteBall.pos.y, mouseX, mouseY);
}

function checkBounce() {
  balls.forEach(ball => {
    if (ball.pos.x <= powerRectangleWidth + ball.radius || ball.pos.x >= boardWidth - ball.radius) {
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

  