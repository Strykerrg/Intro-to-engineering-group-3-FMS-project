let circles = [];
let score = 0;
let targetColor;
let colors = ['red', 'blue', 'green', 'yellow'];
let gameOver = false;

function setup() {
  createCanvas(600, 400);

  // Set initial target color (randomly choose red or blue)
  targetColor = random(colors);

  // Create 60 circles with random positions and random colors
  for (let i = 0; i < 60; i++) {
    let x = random(width);
    let y = random(height);
    let color = random(colors);
    circles.push({ x, y, color, clicked: false });
  }
  
  // Display instructions
  textSize(16);
  fill(0);
  text('Click on the circles of the target color!', 10, height - 10);
}

function draw() {
  if (gameOver) {
    background(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    fill(0);
    text('Game Over!', width / 2, height / 2 - 40);
    textSize(24);
    text(`Final Score: ${score}`, width / 2, height / 2 + 20);
    return;
  }

  background(255);

  // Draw all circles (only those that are not clicked)
  for (let i = 0; i < circles.length; i++) {
    if (!circles[i].clicked) {
      fill(circles[i].color);
      noStroke();
      ellipse(circles[i].x, circles[i].y, 20, 20);
    }
  }

  // Display the target color
  textSize(24);
  fill(0);
  textAlign(CENTER);
  text(`Target: ${targetColor}`, width / 2, 30);
  
  // Display score
  textSize(18);
  text(`Score: ${score}`, width - 80, height - 30);
}

function mousePressed() {
  if (gameOver) return;

  // Check if the clicked position is inside a circle and the circle's color matches the target
  for (let i = 0; i < circles.length; i++) {
    if (circles[i].clicked) continue;  // Skip already clicked circles

    let d = dist(mouseX, mouseY, circles[i].x, circles[i].y);
    if (d < 20) {  // 10 is half the diameter of the circle
      if (circles[i].color === targetColor) {
        score++; // Correct color clicked
        circles[i].clicked = true; // Mark this circle as clicked
      } else {
        score--; // Incorrect color clicked
      }
    }
  }

  // Check if all circles of the target color have been clicked
  if (allTargetCirclesClicked()) {
    gameOver = true;  // End the game if all target color circles are clicked
  }
}

function allTargetCirclesClicked() {
  // Check if all circles of the target color have been clicked
  for (let i = 0; i < circles.length; i++) {
    if (circles[i].color === targetColor && !circles[i].clicked) {
      return false;  // If any target color circle is not clicked, return false
    }
  }
  return true;  // All target color circles have been clicked
}
