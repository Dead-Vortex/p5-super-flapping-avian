//preview: python -m http.server

let avian;
let tubes = [];

function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  background(30);
  avian = new Avian(15, 0.8, -20, 60);
  tubes.push(new Tube(100, 300, height / 3));
}

function draw() {
  background(30)
  avian.physicsTick(); // Check for keyboard input and update physics
  avian.display();    // Draw the ball

  tubes[0].display();
  if(tubes[0].pos.x < avian.pos.x && tubes[0].pos.x > 0) {
    console.log("the thing")
  }
  if(tubes[0].pos.x < 0) {
    // delete object from array
  }
  tubes[0].pos.x--;
  // for(let tube of tubes) {
  //   tube.display();
  // }
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

class Tube {
  constructor(tubeWidth, gapSize, gapLocation) {
    this.pos = createVector(width / 2, 0);
    this.width = tubeWidth;
    this.gapSize = gapSize;
    this.gapLocation = gapLocation;
    this.topRectHeight = height - this.gapLocation - (this.gapSize / 2);
    this.bottomRectHeight = height - this.gapLocation + (this.gapSize / 2);
  }

  display() {
    fill(0, 255, 0);
    rect(this.pos.x, 0, this.width, this.topRectHeight);
    rect(this.pos.x, this.bottomRectHeight, this.width, this.bottomRectHeight);
  }
}