//preview: python -m http.server

let avian;
let tubes = [];
let scrollSpeed = 5;
let tubeFrequency = 120;

function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  background(30);
  avian = new Avian(15, 0.8, -20, 60);
  tubes.push(new Tube(100, random(250, 400), random(100, height - 500)));
}

function draw() {
  background(30)
  avian.physicsTick(); // Check for keyboard input and update physics
  avian.display();    // Draw the avian

  for(let tube of tubes) {
    tube.pos.x -= scrollSpeed;
    tube.display();
    if((tube.pos.x < avian.pos.x && tube.pos.x > 0) && (avian.pos.y < tube.gapLocation || avian.pos.y > tube.gapLocation + tube.gapSize) || avian.pos.y > height) {
      console.log("death")
      scrollSpeed = 0;
    }
  }

  if(frameCount % tubeFrequency == 0) {
    let newGapSize = random(200, 400);
    let newGapLocation = random(100, height - newGapSize - 100);
    tubes.push(new Tube(100, newGapSize, newGapLocation));

    if(Math.random() > 0.1) {
      tubeFrequency--;
    }
    if(Math.random() > 0.1) {
      scrollSpeed+= 0.1;
    }

    // console.log(newGapSize);
    // console.log(newGapLocation);
  }



  if(tubes[0].pos.x < 0) {
    // delete object from array
  }

  // debug display
  fill(255, 255, 255);
  text("DEBUG\nAvian Y: " + avian.pos.y + "\nScroll Speed: " + scrollSpeed, 0, 0);
}

class Avian {
  constructor(jumpHeight, gravity, terminalVelocity, radius) {
    this.pos = createVector(radius, height / 4);
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

  display() {
    fill(255, 150, 0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, this.r);
  }
}

class Tube {
  constructor(tubeWidth, gapSize, gapLocation) {
    this.pos = createVector(width, 0);
    this.width = tubeWidth;
    this.gapSize = gapSize;
    this.gapLocation = gapLocation;
  }

  display() {
    fill(0, 255, 0);
    rect(this.pos.x, 0, this.width, this.gapLocation);
    rect(this.pos.x, this.gapLocation + this.gapSize, this.width, this.gapLocation + this.gapSize);
  }
}