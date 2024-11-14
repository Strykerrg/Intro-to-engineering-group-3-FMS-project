let circle;
let score = 0;
let remaining = 30; 
let circleTimer = 0;
let timeBetweenCircles = 2000; 
let gameOver = false;

function setup() {
  createCanvas(640, 360);
  textAlign(CENTER, CENTER);
  nextCircle();
}

function draw() {
  background(255);

  
  textSize(24);
  fill(0);
  text("Easy", width / 2, 30);
  
  if (gameOver) {
    displayGameOver();
    return;
  }

  displayScore();
  displayRemaining();
  
  
  if (millis() - circleTimer > timeBetweenCircles) {
    nextCircle();
  }

  drawCircle();
}

function nextCircle() {
  if (remaining > 0) {
    // Create a new circle at a random position
    circle = {
      x: random(50, width - 50),
      y: random(50, height - 50),
      size: 40
    };
    circleTimer = millis(); 
    remaining--; 
  } else {
    gameOver = true; 
  }
}

function drawCircle() {
  if (circle) {
    fill(0, 0, 255);
    ellipse(circle.x, circle.y, circle.size);
  }
}

function mousePressed() {
  // Check if the mouse click is within the circle
  if (circle && dist(mouseX, mouseY, circle.x, circle.y) < circle.size / 2) {
    score++; 
    nextCircle(); 
  }
}

function displayScore() {
  fill(0);
  textSize(16);
  text(`Score: ${score}`, width / 4, 20);
}

function displayRemaining() {
  fill(0);
  textSize(16);
  text(`Remaining: ${remaining}`, (3 * width) / 4, 20);
}

function displayGameOver() {
  background(255);
  textSize(32);
  fill(0);
  text('Game Over', width / 2, height / 2 - 30);
  textSize(24);
  text(`Final Score: ${score}`, width / 2, height / 2 + 10);
}
