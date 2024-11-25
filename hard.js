let circle;
let score = 0;
let remaining = 30; 
let circleTimer = 0;
let timeBetweenCircles = 1000; 
let gameOver = false;
let lastCirclePosition = { x: 0, y: 0 }; 

function setup() {
  createCanvas(640, 360);
  textAlign(CENTER, CENTER);
  nextCircle();
}

function draw() {
  background(255);

  
  textSize(24);
  fill(0);
  text("Hard", width / 2, 30);
  
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
    let minDistance = 150; 

    
    let newX, newY, distToLast;
    do {
      newX = random(50, width - 50);
      newY = random(50, height - 50);
      distToLast = dist(newX, newY, lastCirclePosition.x, lastCirclePosition.y);
    } while (distToLast < minDistance);

    
    circle = { x: newX, y: newY, size: 25 }; 
    lastCirclePosition = { x: newX, y: newY };
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
