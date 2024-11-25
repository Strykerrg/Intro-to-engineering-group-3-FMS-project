let circle;
let score = 0;
let remaining = 30; // Total dots for the Medium level
let circleTimer = 0;
let timeBetweenCircles = 1800; // Circle stays for 1.8 seconds for slower speed
let gameOver = false;

function setup() {
  createCanvas(640, 360);
  textAlign(CENTER, CENTER);
  nextCircle();
}

function draw() {
  background(255);

  // Display the Medium level label at the top middle
  textSize(24);
  fill(0);
  text("Medium", width / 2, 30);
  
  if (gameOver) {
    displayGameOver();
    return;
  }

  displayScore();
  displayRemaining();
  
  // Check if it's time for a new circle
  if (millis() - circleTimer > timeBetweenCircles) {
    nextCircle();
  }

  drawCircle();
}

function nextCircle() {
  if (remaining > 0) {
    // Create a new circle at a random position with a smaller size
    circle = {
      x: random(50, width - 50),
      y: random(50, height - 50),
      size: 30 // Smaller circle size for Medium level
    };
    circleTimer = millis(); // Reset the timer for the new circle
    remaining--; // Decrease the remaining circles count
  } else {
    gameOver = true; // End the game when there are no circles left
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
    score++; // Increase score
    nextCircle(); // Spawn the next circle
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
