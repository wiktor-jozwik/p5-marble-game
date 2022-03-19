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