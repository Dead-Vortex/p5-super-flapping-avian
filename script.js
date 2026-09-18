//preview: python -m http.server

let avian;
let tubes = [];
let scrollSpeed = 5;
let tubeFrequency = 120;
let score = 0;

function setup() {
  createCanvas(windowWidth-100, windowHeight-100);
  background(30);
  avian = new Avian(15, 0.8, -20, 60);
  createTube();
}

function draw() {
  background(30)
  avian.physicsTick(); // Check for keyboard input and update physics
  avian.display();    // Draw the avian

  for(let i = 0; i < tubes.length; i++) {
    tubes[i].pos.x -= scrollSpeed;
    tubes[i].display();
    if((tubes[i].pos.x < avian.pos.x && tubes[i].pos.x > 0) && (avian.pos.y < tubes[i].gapLocation || avian.pos.y > tubes[i].gapLocation + tubes[i].gapSize) || avian.pos.y > height) {
      // console.log("death")
      scrollSpeed = 0;
    }
    if(tubes[i].pos.x < -60) {
      score++;
      tubes[i].pos.x = Infinity;
      // console.log(tubes);
    }
  }

  if(frameCount % Math.round(tubeFrequency) == 0) {
    createTube();

    if(Math.random() < 0.2) {
      tubeFrequency-= 1;
    }
    if(Math.random() < 0.2 && scrollSpeed != 0) {
      scrollSpeed+= 0.1;
    }

    // console.log(newGapSize);
    // console.log(newGapLocation);
  }

  // debug display
  fill(255, 255, 255);
  //text("DEBUG\nAvian Y: " + avian.pos.y + "\nScroll Speed: " + scrollSpeed + "\nScore: " + score, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(20);
  text(score, width / 2, 50)
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
    if((keyIsDown(UP_ARROW) || keyIsDown(32) || mouseIsPressed)) {
      if(!this.isJumping) {
        this.vel = this.jumpHeight;
        this.isJumping = true;
      }
      if(scrollSpeed == 0) {
        this.restart();
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

  restart() {
    this.pos.y = height / 4 + this.jumpHeight;
    tubes = [];
    scrollSpeed = 5;
    tubeFrequency = 120;
    // createTube();
    score = 0
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

function createTube() {
    let newGapSize = random(200, 400);
    let newGapLocation = random(100, height - newGapSize - 100);
    tubes.push(new Tube(100, newGapSize, newGapLocation));
}