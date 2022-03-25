class Ball {
    constructor(pos, radius, color) {
      this.pos = pos
      this.radius = radius
      this.color = color
      this.velocity = createVector(0,0)
    }
    
    show() {
      if (this.color) {
          fill(this.color.r, this.color.g, this.color.b)
        }
      ellipse(this.pos.x, this.pos.y, this.radius*2)
    }
    
    update(delta) {
      this.pos.add(p5.Vector.mult(this.velocity, delta))
      
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

    polar(radius, angle){
      return createVector(radius*cos(angle), radius*sin(angle));
    }

    collide(ball) {
      console.log('collision')
      var a = this.pos.copy().sub(ball.pos).heading();
      this.pos = ball.pos.copy().add(this.polar(this.radius*2, a));
      var A1 = this.velocity.heading() - a;
      var A2 = ball.velocity.heading() - a;
      var V1 = this.polar(this.velocity.mag()*cos(A1), a);
      var V2 = this.polar(ball.velocity.mag()*cos(A2), a);
      this.velocity.sub(V1).add(V2);
      ball.velocity.sub(V2).add(V1);
    }

    checkBounce() {
      if (this.pos.x <= powerRectangleWidth + this.radius || this.pos.x >= boardWidth - this.radius) {
          this.bounceX()
        }
        if (this.pos.y <= this.radius || this.pos.y >= boardHeight - this.radius) {
          this.bounceY()
        }
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

    isMoving() {
      return this.velocity.x !== 0 || this.velocity.y !== 0
    }

    isInStartingPostion() {
      return this.pos.x === startingPositionX && this.pos.y === startingPositionY
    }
  }