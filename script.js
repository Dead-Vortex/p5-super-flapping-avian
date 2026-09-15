//preview: python -m http.server

let myBall;

function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  background(30);
  avian = new Avian(15, 0.8, -20, 60);
}

function draw() {
  background(30)
  avian.physicsTick(); // Check for keyboard input and update physics
  avian.display();    // Draw the ball
}

class Avian {
  constructor(jumpHeight, gravity, terminalVelocity, radius) {
    this.pos = createVector(radius, height / 2);
    this.vel = 0;
    this.jumpHeight = jumpHeight;
    this.r = radius;
    this.terminalVelocity = terminalVelocity;
    this.gravity = gravity;
    this.isJumping = false
  }

  // Method to check keyboard input and apply forces
  physicsTick() {
    this.vel -= this.gravity;
    if(keyIsDown(UP_ARROW) || keyIsDown(32) || mouseIsPressed) {
      if(!this.isJumping) {
        this.vel = this.jumpHeight;
        this.isJumping = true;
      }
    } else {
      this.isJumping = false
    }
    if(this.vel < this.terminalVelocity) this.vel = this.terminalVelocity;
    this.pos.y -= this.vel

    if(this.pos.y < this.r / 2) {
      this.pos.y = this.r / 2;
      this.vel = 0;
    }

    //console.log(this.pos);
  }

  // The "Force" pattern: Force adds to Acceleration
  // applyForce(force) {
  //   this.acc.add(force);
  // }

  // update() {
  //   // 1. Acceleration changes Velocity
  //   this.vel.add(this.acc);
    
  //   // 2. Limit the speed so it doesn't go infinite
  //   this.vel.limit(this.topSpeed);
    
  //   // 3. Velocity changes Position
  //   this.pos.add(this.vel);
    
  //   // 4. Apply friction (velocity decay)
  //   this.vel.mult(this.friction);
    
  //   // 5. Reset acceleration for the next frame
  //   this.acc.mult(0);
  // }

  display() {
    fill(255, 150, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}
