class Ball {
    constructor(pos, radius, color, q=0, randomizeFriction=true) {
        this.pos = pos
        this.radius = radius
        this.color = color
        this.q = q
        this.randomizeFriciton = randomizeFriction;
        this.velocity = createVector(0, 0)
    }

    show() {
        if (this.color) {
            fill(this.color.r, this.color.g, this.color.b)
        }
        ellipse(this.pos.x, this.pos.y, this.radius * 2)

        if (this.q) {
            fill(0, 0, 0)
            ellipse(this.pos.x, this.pos.y, 5)
        }
    }

    update(delta) {
        this.pos.add(p5.Vector.mult(this.velocity, delta))

        let friction = BASE_FRICTION_COEFFICIENT

        if (this.randomizeFriciton) {
            friction = 0.95 + Math.random() * 0.045
        }

        this.velocity.mult(friction)
        if (this.velocity.mag() > .02) {
            this.velocity.setMag(this.velocity.mag() - 0.02)
        } else {
            this.velocity = createVector();
        }
    }

    hit(power, rotation) {
        this.velocity.add(createVector(power * cos(rotation), power * sin(rotation)))
    }

    polar(radius, angle) {
        return createVector(radius * cos(angle), radius * sin(angle));
    }

    collide(ball) {
        let angle = this.pos.copy().sub(ball.pos).heading();

        this.pos = ball.pos.copy().add(this.polar(this.radius * 2, angle));

        let a1 = this.velocity.heading() - angle;
        let a2 = ball.velocity.heading() - angle;

        let v1 = this.polar(this.velocity.mag() * cos(a1), angle);
        let v2 = this.polar(ball.velocity.mag() * cos(a2), angle);

        this.velocity.sub(v1).add(v2);
        ball.velocity.sub(v2).add(v1);
    }

    checkBounce() {
        if (this.pos.x <= this.radius || this.pos.x >= BOARD_WIDTH - this.radius) {
            this.bounceX()
            return true
        }
        if (this.pos.y <= this.radius || this.pos.y >= BOARD_HEIGHT - this.radius) {
            this.bounceY()
            return true
        }
        return false
    }

    bounceX() {
        if (this.pos.x > BOARD_WIDTH / 2) {
            this.velocity.x = -abs(this.velocity.x)
        } else {
            this.velocity.x = abs(this.velocity.x)
        }
    }

    bounceY() {
        if (this.pos.y > BOARD_HEIGHT / 2) {
            this.velocity.y = -abs(this.velocity.y)
        } else {
            this.velocity.y = abs(this.velocity.y)
        }
    }

    distanceFromObject(vector) {
        return Math.sqrt(Math.pow((this.pos.x - vector.x), 2) + Math.pow((this.pos.y - vector.y), 2))
    }

    isMoving() {
        return this.velocity.x > 0.7 || this.velocity.y > 0.7
    }

    isInStartingPostion() {
        return this.pos.x === STARTING_POSITION_X && this.pos.y === STARTING_POSITION_Y
    }
}

function eForce(q1, pos1, q2, pos2){
    let K = 9 * Math.pow(10,9); //K = 9*10**9 Nm**2/C**2
    let dist = pos1.dist(pos2)
    let v = p5.Vector.sub(pos1,pos2);
    return v.copy().normalize().mult((K*q1*q2) / (dist*dist));
}