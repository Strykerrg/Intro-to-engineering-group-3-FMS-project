/* Link this file to main executable file (Sketch.js) to get it executed */
let circles = [];
let currentMode = 'menu';
let difficulty = 'Easy';
let score = 0;
let remaining = 0;
let showPattern = false;
let userDrawing = false;
let pattern = [];
let timeBetweenCircles = 2000; // Default for Easy
let timeCircleStays = 2; // Duration in seconds for Easy
let circleTimer = 0;
let startTime = 0;
let duration = 60000; // Game duration (1 minute)
let circleIndex = 0;

function setup() {
  createCanvas(640, 360);
  textAlign(CENTER, CENTER);
}

function draw() {
  background(255);

  if (currentMode === 'menu') {
    showMenu();
  } else if (currentMode === 'reaction') {
    showReactionGame();
  }
}

function showMenu() {
  textSize(32);
  fill(0);
  text('Reaction + Hand-eye Coordination Trainer', width / 2, 50);

  drawButton('Easy', width / 2, 120, 'Easy');
  drawButton('Medium', width / 2, 180, 'Medium');
  drawButton('Hard', width / 2, 240, 'Hard');
}

function drawButton(label, x, y, mode) {
  if (mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 20 && mouseY < y + 20) {
    fill(200);
    if (mouseIsPressed) {
      if (['Easy', 'Medium', 'Hard'].includes(mode)) {
        difficulty = mode;
        currentMode = 'reaction';
        
        // Load a different JS file based on the mode
        loadScriptForMode(mode);
      }
    }
  } else {
    fill(255);
  }
  stroke(0);
  rect(x - 100, y - 20, 200, 40);
  fill(0);
  textSize(20);
  text(label, x, y);
function drawButton(label, x, y, mode) {
  if (mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 20 && mouseY < y + 20) {
    fill(200);
    if (mouseIsPressed) {
      if (['Easy', 'Medium', 'Hard'].includes(mode)) {
        difficulty = mode;
        currentMode = 'reaction';
        
        // Load a different JS file based on the mode
        loadScriptForMode(mode);
      }
    }
  } else {
    fill(255);
  }
  stroke(0);
  rect(x - 100, y - 20, 200, 40);
  fill(0);
  textSize(20);
  text(label, x, y);
}

function loadScriptForMode(mode) {
  let scriptName;
  switch (mode) {
    case 'Easy':
      scriptName = 'easy.js';
      break;
    case 'Medium':
      scriptName = 'medium.js';
      break;
    case 'Hard':
      scriptName = 'hard.js';
      break;
    default:
      return;
  }

  const script = document.createElement('script');
  script.src = scriptName;
  script.onload = () => console.log(`${scriptName} loaded.`);
  document.head.appendChild(script);
}
}


/*function setupGame() {
  score = 0;
  remaining = 30; // Total dots for each level
  timeBetweenCircles = difficulty === 'Easy' ? 2000 : difficulty === 'Medium' ? 1500 : 1000;
  timeCircleStays = difficulty === 'Easy' ? 2 : difficulty === 'Medium' ? 1.5 : 1;
  circleIndex = 0;
  circleTimer = millis();
}

function showReactionGame() {
  fill(0);
  textSize(16);
  text(`Score: ${score}`, width / 4, 20);
  text(`Difficulty: ${difficulty}`, width / 2, 20);
  text(`Remaining: ${remaining}`, (3 * width) / 4, 20);

  if (remaining > 0) {
    if (millis() - circleTimer > timeBetweenCircles) {
      nextCircle();
    }

    drawCircle();
  } else {
    textSize(32);
    fill(0);
    text('Game Over', width / 2, height / 2);
  }
}

function nextCircle() {
  circleTimer = millis();
  circles = [{ x: random(50, width - 50), y: random(50, height - 50)}];
  remaining--;
}

function drawCircle() {
  for (let i = 0; i < circles.length; i++) {
    fill(0, 0, 255);
    ellipse(circles[i].x, circles[i].y, 40);
  }
}

function mousePressed() {
  for (let i = 0; i < circles.length; i++) {
    if (dist(mouseX, mouseY, circles[i].x, circles[i].y) < 20) {
      score++;
      nextCircle();
    }
  }
}*/