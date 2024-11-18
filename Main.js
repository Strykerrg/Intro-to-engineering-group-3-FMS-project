let page = "Home";
//TRAIL VAR
let trail = [];
let trailMax = 10;
//VOLUME BAR VAR
let volbar = 395;
let volume;
//BRIGHTNESS BAR VAR
let brightnessBar = 395;
let Brightness = 1;

//IMG
let Bg;
let img1;
let img2;
let img3;
let aimLabImg;
let patternDragImg;
let colorClickerImg;
let backArrow;

//BG MUSIC
//let bgMusic;

//AIM LAB
let ALx = 110;
let ALy = 220;
let ALlen = 70;
let ALwid = 70;
let ALt = 20;
//PATTERN DRAG
let PDx = 290;
let PDy = 220;
let PDlen = 70;
let PDwid = 70;
//COLOR CLICKER
let CCx = 470;
let CCy = 220;
let CClen = 70;
let CCwid = 70;
//SETTINGS
let STx = 30;
let STy = 20;
let STlen = 100;
let STwid = 100;
//HELP
let HPx = 150;
let HPy = 36;
let HPlen = 70;
let HPwid = 70;  
//EXIT
let ETx = 540;
let ETy = 36;
let ETlen = 70;
let ETwid = 70;
//BACK ARROW
let BAx = 30;
let BAy = 260;
let BAlen = 70;
let BAwid = 70;

function setup() {
  createCanvas(640, 360);
}

function preload() {
  img1 = loadImage("images/gearIcon.png");
  img2 = loadImage("images/helpIcon.png");
  img3 = loadImage("images/exitIcon.png");
  aimLabImg = loadImage("images/aimLabIcon.png");
  patternDragImg = loadImage("images/patternDragIcon.png");
  colorClickerImg = loadImage("images/colorClickerIcon.png");
  Bg = loadImage("images/BG.jpg");
  //bgMusic = loadSound("images/Bgmusic.mp3");
  backArrow  = loadImage("images/backArrow.png");
}

function gameName() {
  textSize(30);
  fill("purple");
  stroke("purple");
  strokeWeight(1);
  text("Reflex Arcade" , 240 , 40);
}

function draw() {  
  //Mouse Trail
  stroke("black");
  strokeWeight(3);
  trail.push({x : mouseX , y : mouseY});
  
  if (page == "Home") {
    homePage();
  }
  else if (page == "Settings") {
    settingsPage();
  }
  else if (page == "aimLabMenu") {
    aimLabMenu();
  }
  else if (page == "aimLabEasy" ||page == "aimLabMedium" ||page == "aimLabHard") {
    aimLab(difficulty);
  }
  else if (page === "reaction") {
    showReactionGame();
  }
  else if (page == "patternDragMenu") {
    patternDragMenu();
  }
  else if (page == "patternDragEasy" ||page == "patternDragMedium" ||page == "patternDragHard") {
    patternDrag();
  }
  else if (page == "colorClickerMenu") {
    colorClickerMenu();
  }

  //TRAIL
  stroke("white");
  strokeWeight(2);
  fill("black");
  if (trail.length > trailMax) {
    trail.shift();
  }
  for (let i = 0; i < trail.length; i++) {
    stroke("white");
    let pos = trail[i];
    circle(pos.x , pos.y , map(i , 0 , trail.length , 5 , 20));
  }

  //Boarder
  stroke("gold");
  strokeWeight(5);
  noFill();
  rect(0 , 0 , 640 , 360);

  adjustBrightness(Brightness);
}

function homePage() {
  //Basic Background elements
  background(Bg);
  textAlign(LEFT , LEFT);
    
  //text alt
  stroke("black");
  strokeWeight(1);
  fill("black");
  textSize(20);
  
  //HOVER
  homeHover();

  //Images loading [Top Line]
  image(img1 , STx , STy , STlen , STwid);
  image(img3 , ETx , ETy , ETlen , ETwid);
  
  //Images loading [bottom Line]
  image(aimLabImg , ALx , ALy , ALlen , ALwid);
  image(patternDragImg , PDx , PDy , PDlen , PDwid);
  image(colorClickerImg , CCx , CCy , CClen , CCwid);
  
  //Text
  text("AIM LAB" , 106 , 320);
  text("PATTERN DRAG" , 245 , 320);
  text("COLOR CLICKER" , 430 , 320);
  
  //GAME NAME
  gameName();
}

function settingsPage() {
  //Basic Background elements
  background(Bg);
  textAlign(LEFT , LEFT);
  
  //Volume Bar
  fill("black");
  stroke("black");
  strokeWeight(1);
  text("Volume:" , 120 , 173);
  
  noFill();
  strokeWeight(4);
  stroke("Black");
  rect(240 , 160 , 160 , 10 , 5);
  
  fill("black");
  stroke("black");
  volume = map(volbar , 245 , 395 , 0 , 1);
  circle(volbar , 165 , 20);
  //bgMusic.setVolume(volume);
  
  //Brightness
  fill("black");
  stroke("black");
  strokeWeight(1);
  text("Brightness:" , 79 , 213);
  
  noFill();
  strokeWeight(4);
  stroke("Black");
  rect(240 , 200 , 160 , 10 , 5);
  
  fill("black");
  stroke("black");
  Brightness = map(brightnessBar , 245 , 395 , 0 , 1);
  circle(brightnessBar , 205 , 20);
  
  //HOVER
  settingsHover();

  //Images loading [Top Line]
  image(img1 , STx , STy , STlen , STwid);
  image(img3 , ETx , ETy , ETlen , ETwid); 
  image(backArrow , BAx , BAy, BAlen , BAwid);
  
  //GAME NAME
  gameName();
}

function mousePressed() { //this function starts as soon as mouse is pressed
  //VOL ADJUST
  if ((page == "Settings") && (mouseX > 240 && mouseX < 400) && (mouseY > 155 && mouseY < 175)) {
    volbar = mouseX;
  }
  //EXIT EXECUTION
  if (((page == "Home") || (page == "Settings")) && (mouseX > 535 && mouseX <615) && (mouseY > 31 && mouseY < 111)) {
    noLoop();
    select('canvas').remove();
    //bgMusic.stop();
  }
  //BRIGHTNESS ADJUST
  if ((page == "Settings") && ((mouseX > 240 && mouseX < 400) && (mouseY > 195 && mouseY < 215))) {
    brightnessBar = mouseX;
  }
  //Mouse Press Aim Lab
  if (page == "aimLabEasy" || page == "aimLabMedium" || page == "aimLabHard") {
    clickCircle();
  }
  //mouse Press Pattern Drag
  if (page == "patternDragEasy" || page == "patternDragMedium" || page == "patternDragHard") {
    patternDragMousePressed();
  }
}

function mouseClicked() { //this function starts when mouse is released
  //AIM LAB ICON
  if (page == "Home" && ((mouseX > 105 && mouseX < 185) && (mouseY > 215 && mouseY < 295))) {
    page = "aimLabMenu";
  }
  //PATTERN DRAG ICON
  if (page == "Home" && (mouseX > 285 && mouseX < 365) && (mouseY > 215 && mouseY < 295)) {
    page = "patternDragMenu";
  }
  //COLOR CLICKER ICON
  if (page == "Home" && (mouseX > 465 && mouseX < 545) && (mouseY > 215 && mouseY < 295)) {
    page = "colorClickerMenu";
  }
}

function settingsHover() {
  //SETTINGS
  if ((mouseX > 25 && mouseX < 115) && (mouseY > 15 && mouseY < 105)) {
    STx = 25;
    STy = 15;
    STlen = 110;
    STwid = 110;
  }
  else {
    STx = 30;
    STy = 20;
    STlen = 100;
    STwid = 100;
  }
  //EXIT
  if ((mouseX > 535 && mouseX < 615) && (mouseY > 31 && mouseY < 111)) {
    ETx = 535;
    ETy = 31;
    ETlen = 80;
    ETwid = 80;
  }
  else {
    ETx = 540;
    ETy = 36;
    ETlen = 70;
    ETwid = 70;
  }
  //BACK
  if ((mouseX > 25 && mouseX < 105) && (mouseY > 255 && mouseY < 335)) {
    BAx = 25;
    BAy = 255;
    BAlen = 80;
    BAwid = 80;
    if (mouseIsPressed) {
      page = "Home";
    }
  }
  else {
    BAx = 30;
    BAy = 260;
    BAlen = 70;
    BAwid = 70;
  }
}

function homeHover() {
  //AIM LAB
  if ((mouseX > 105 && mouseX < 185) && (mouseY > 215 && mouseY < 295)) {
    ALx = 105;
    ALy = 215;
    ALlen = 80;
    ALwid = 80;
  }
  else {
    ALx = 110;
    ALy = 220;
    ALlen = 70;
    ALwid = 70;
  }
  //PATTERN DRAG
  if ((mouseX > 285 && mouseX < 365) && (mouseY > 215 && mouseY < 295)) {
    PDx = 285;
    PDy = 215;
    PDlen = 80;
    PDwid = 80;
  }
  else {
    PDx = 290;
    PDy = 220;
    PDlen = 70;
    PDwid = 70;
  }
  //COLOR CLICKER
  if ((mouseX > 465 && mouseX < 545) && (mouseY > 215 && mouseY < 295)) {
    CCx = 465;
    CCy = 215;
    CClen = 80;
    CCwid = 80;
  }
  else {
    CCx = 470;
    CCy = 220;
    CClen = 70;
    CCwid = 70;
  }
  //SETTINGS
  if ((mouseX > 25 && mouseX < 115) && (mouseY > 15 && mouseY < 105)) {
    STx = 25;
    STy = 15;
    STlen = 110;
    STwid = 110;
    if (mouseIsPressed) {
      page = "Settings";
    }
  }
  else {
    STx = 30;
    STy = 20;
    STlen = 100;
    STwid = 100;
  }
  //EXIT
  if ((mouseX > 535 && mouseX < 615) && (mouseY > 31 && mouseY < 111)) {
    ETx = 535;
    ETy = 31;
    ETlen = 80;
    ETwid = 80;
  }
  else {
    ETx = 540;
    ETy = 36;
    ETlen = 70;
    ETwid = 70;
  }
}

function adjustBrightness(factor) {
  loadPixels();  
  for (let i = 0; i < pixels.length; i += 4) {
    pixels[i] = pixels[i] * factor;
    pixels[i + 1] = pixels[i + 1] * factor;
    pixels[i + 2] = pixels[i + 2] * factor;
  }  
  updatePixels();
}

//EXERCISES ___________________________________________________________________________________________________________________________
//Common Variables
let score = 0;

//Common Functions
function displayScore() {
  fill(0);
  strokeWeight(1);
  stroke("black");
  textSize(16);
  text(`Score: ${score}`, width / 4, 20);
}

function displayRemaining() {
  fill(0);
  strokeWeight(1);
  stroke("black");
  textSize(16);
  text(`Remaining: ${remaining}`, (3 * width) / 4, 20);
}

function displayGameOver(gameMode) {
  background(Bg);
  textSize(32);
  stroke("black");
  strokeWeight(1);
  fill(0);
  text('Game Over', width / 2, height / 2 - 30);
  textSize(24);
  text(`Final Score: ${score}`, width / 2, height / 2 + 10);
  text('Press Enter To Continue' , width / 2 , height / 2 + 100);
  noFill();
  rect(width / 2 - 150 , height / 2 + 75 , 300 , 50 , 5 , 5 , 5 , 5);
  if (keyCode == ENTER && keyIsPressed) {
    page = gameMode;
  }
}

//AIM LAB CODE ------------------------------------------------------------------------------------------------------------------------
//GAME VARIABLES
let circleClick;
let remaining; 
let circleTimer;
let timeBetweenCircles; 
let gameOver;
let circleSize;
let difficulty;

//AIM LAB MENU ______________________________________________

function aimLabMenu() {
  background(Bg);
  adjustBrightness(Brightness);
  strokeWeight(1);
  textSize(32);
  textAlign(CENTER , CENTER);
  fill(0);
  text('Reaction + Hand-eye Coordination Trainer', width / 2, 50);

  difficultyChooseAL('Easy', width / 2, 120, "aimLabEasy");
  difficultyChooseAL('Medium', width / 2, 180, "aimLabMedium");
  difficultyChooseAL('Hard', width / 2, 240, "aimLabHard");
  image(backArrow , BAx , BAy, BAlen , BAwid);
  if ((mouseX > 25 && mouseX < 105) && (mouseY > 255 && mouseY < 335)) {
    BAx = 25;
    BAy = 255;
    BAlen = 80;
    BAwid = 80;
    if (mouseIsPressed) {
      page = "Home";
    }
  }
  else {
    BAx = 30;
    BAy = 260;
    BAlen = 70;
    BAwid = 70;
  }
}

function difficultyChooseAL(label, x, y, mode) {
  if (mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 20 && mouseY < y + 20) {
    fill(200);
    if (mouseIsPressed) {
      page = mode;
      score = 0;
      remaining = 30; 
      circleTimer = 0;
      gameOver = false;
      switch(page) {
        case "aimLabEasy":
          timeBetweenCircles = 2000;
          circleSize = 40;
          score = 0;
          difficulty = "Easy";
          nextCircle();
          break;
        case "aimLabMedium":
          timeBetweenCircles = 1800;
          circleSize = 30;
          difficulty = "Medium";
          nextCircle();
          break;
        case "aimLabHard":
          timeBetweenCircles = 1000;
          circleSize = 25;
          difficulty = "Hard";
          nextCircle();
          break;
        default:
          return;
      }
    }
  } else {
    fill(255);
  }
  stroke(0);
  rect(x - 100, y - 20, 200, 40 , 5 , 5 , 5 , 5);
  fill(0);
  textSize(20);
  text(label, x, y);
}

//AIM LAB GAME ______________________________________________

function aimLab(model) {
    background(Bg);
    strokeWeight(1);
    
    textSize(24);
    fill(0);
    text(model , width / 2, 30);
    
    if (gameOver) {
      displayGameOver("aimLabMenu");
      return;
    }
  
    displayScore();
    displayRemaining();
    
    
    if (millis() - circleTimer > timeBetweenCircles) {
      score--;
      nextCircle();
    }
  
    drawCircle();
    if (keyCode == ESCAPE && keyIsPressed) {
      page = "aimLabMenu";
    }
}
  
function nextCircle() {
    if (remaining > 0) {
      // Create a new circle at a random position
      circleClick = {
        x: random(50, width - 50),
        y: random(50, height - 50),
        size: circleSize
      };
      circleTimer = millis(); 
      remaining--; 
    } else {
      gameOver = true; 
    }
}
  
function drawCircle() {
    if (circleClick) {
      fill(0, 0, 255);
      ellipse(circleClick.x, circleClick.y, circleClick.size);
    }
}
  
function clickCircle() {
  if (circleClick && dist(mouseX, mouseY, circleClick.x, circleClick.y) < circleClick.size / 2) {
    score++; 
    nextCircle();
  }
  else {
    score--;
    nextCircle();
  }
}

//PATTERN DRAG CODE -------------------------------------------------------------------------------------------------------------------
//PATTERN DRAG VARIABLES
let dots = [];
let pattern = [];
let userPattern = [];
let showPattern = true;
let timer;
let drawTimer;
let PDTimer;
let PDSteps;
let first = true;
let patternStep;
let outcomeColor = "yellow";

//PATTERN DRAG MENU _________________________________________
function patternDragMenu() {
  background(Bg);
  strokeWeight(1);
  textSize(32);
  textAlign(CENTER , CENTER);
  fill(0);
  text('Pattern Drag', width / 2, 50);

  clearInterval(drawTimer);
  difficultyChoosePD('Easy', width / 2, 120, "patternDragEasy");
  difficultyChoosePD('Medium', width / 2, 180, "patternDragMedium");
  difficultyChoosePD('Hard', width / 2, 240, "patternDragHard");
  image(backArrow , BAx , BAy, BAlen , BAwid);
  if ((mouseX > 25 && mouseX < 105) && (mouseY > 255 && mouseY < 335)) {
    BAx = 25;
    BAy = 255;
    BAlen = 80;
    BAwid = 80;
    if (mouseIsPressed) {
      page = "Home";
    }
  }
  else {
    BAx = 30;
    BAy = 260;
    BAlen = 70;
    BAwid = 70;
  }
}

function difficultyChoosePD(label, x, y, mode) {
    if (mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 20 && mouseY < y + 20) {
        fill(200);
        if (mouseIsPressed) {
          page = mode;
          score = 0;
          remaining = 15; 
          gameOver = false;
          for (let i = 0; i < 6; i++) {
            let x = (i % 3) * 100 + 200;
            let y = floor(i / 3) * 100 + 150;
            dots.push(createVector(x, y));
          }
          drawTimer = setInterval(updateTimer, 1000);
          switch(page) {
            case "patternDragEasy":
              difficulty = "Easy";
              resetGame(15 , 3);
              PDTimer = 15;
              PDSteps = 3;
              break;
            case "patternDragMedium":
              difficulty = "Medium";
              resetGame(10 , 4);
              PDTimer = 10;
              PDSteps = 4;
              break;
            case "patternDragHard":
              difficulty = "Hard";
              resetGame(7 , 5);
              PDTimer = 7;
              PDSteps = 5;              
              break;
            default:
              return;
          }
        }
    } else {
        fill(255);
      }
    stroke(0);
    rect(x - 100, y - 20, 200, 40 , 5 , 5 , 5 , 5);
    fill(0);
    textSize(20);
    text(label, x, y);
}

//PATTERN DRAG GAME _________________________________________

function patternDrag() {
  strokeWeight(1);
  background(Bg);
  drawDots();
  if (remaining == 0) {
    gameOver = true;
  }

  if (showPattern) {
    drawPattern();
  }
  else {
    drawUserPattern();
  }
  if (gameOver) {
    displayGameOver("patternDragMenu");
  }
  displayScore();
  displayRemaining();
  if (keyCode == ESCAPE && keyIsPressed) {
    page = "patternDragMenu";
  }

  //NOTE
  textStyle(ITALIC);
  text('Avoid hovering over uncounted dots in the pattern,\n' + 
         'as it may connect to them and alter the design.' , width / 2 , height / 2 - 100);
  textStyle(NORMAL);
}

function generatePattern() {
    let availableDots = [0, 1, 2, 3, 4, 5];
    let startDotIndex = floor(random(0, availableDots.length));
    let currentDot = availableDots[startDotIndex];
    availableDots.splice(startDotIndex, 1); // Remove the used dot
  
    // Create 'patternStep' connected segments
    for (let i = 0; i < patternStep; i++) {
      let nextDotIndex = floor(random(0, availableDots.length));
      pattern.push(currentDot); // Add current dot to pattern
      currentDot = availableDots[nextDotIndex]; // Move to the next dot
      availableDots.splice(nextDotIndex, 1); // Remove the used dot
    }
    pattern.push(currentDot); // Add the last dot to complete the pattern
    remaining--;
}
  
function drawDots() {
  for (let dot of dots) {
    fill(0);
    ellipse(dot.x, dot.y, 20, 20);
  }
  // Draw starting indicator
  if (pattern.length > 0) {
    fill(255, 0, 0); // Red color for the start indicator
    ellipse(dots[pattern[0]].x, dots[pattern[0]].y, 30, 30); // Larger dot for start
  }
}
  
function drawPattern(checkedColor = color(153, 235, 255)) {
  stroke(0, 0, 255);
  strokeWeight(4);
  let blueReduc = 255;
  let greenIncrem = 0;
  let xDifference;
  let yDifference;
  let angle;
  let x1;
  let y1;
  let x2;
  let y2;
  for (let i = 0; i < pattern.length - 1; i++) {
    xDifference = (dots[pattern[i + 1]].x - dots[pattern[i]].x);
    yDifference = (dots[pattern[i + 1]].y - dots[pattern[i]].y);
    angle = atan2(yDifference , xDifference);
    x1 = dots[pattern[i]].x + 12 * cos(angle);
    y1 = dots[pattern[i]].y + 12 * sin(angle);
    x2 = dots[pattern[i + 1]].x - 10 * cos(angle);
    y2 = dots[pattern[i + 1]].y - 10 * sin(angle);
    line(x1 , y1 , x2 , y2);
    stroke("White");
    strokeWeight(1);
    fill("white");
    text(i + 1 , dots[pattern[i + 1]].x , dots[pattern[i + 1]].y);
    fill(checkedColor);

    let arrowX1 = x2 - 20 * cos(angle + PI / 6);
    let arrowY1 = y2 - 20 * sin(angle + PI / 6);
    let arrowX2 = x2 - 20 * cos(angle - PI / 6);
    let arrowY2 = y2 - 20 * sin(angle - PI / 6);
    stroke("white");
    strokeWeight(1);
    triangle(arrowX1 , arrowY1 , arrowX2 , arrowY2 , x2 , y2);
    strokeWeight(4);
    blueReduc -= (255 / PDSteps);
    greenIncrem += (255 / PDSteps);
    stroke(0, greenIncrem, blueReduc);
  }
}
  
function patternDragMousePressed() {
  if (!gameOver && !showPattern) {
    userPattern = [];
  }
}
 
function mouseDragged() {
  if (!gameOver && !showPattern) {
    let closestDot = findClosestDot(mouseX, mouseY);
    if (closestDot !== -1 && !userPattern.includes(closestDot)) {
      userPattern.push(closestDot);
    }
  }
}
  
function mouseReleased() {
  if (!gameOver && !showPattern) {
    checkUserPattern();
  }
}
  
function findClosestDot(x, y) {
  let closestIndex = -1;
  let closestDistance = 30;
  for (let i = 0; i < dots.length; i++) {
    let d = dist(x, y, dots[i].x, dots[i].y);
    if (d < closestDistance) {
      closestDistance = d;
      closestIndex = i;
    }
  }
  return closestIndex;
}
  
function checkUserPattern() {
  let interval;
  showPattern = false;
  let correct = true;
  if (userPattern.length === pattern.length) {
    for (let i = 0; i < pattern.length; i++) {
      if (userPattern[i] !== pattern[i]) {
        score--;
        correct = false;
        outcomeColor = color(255 , 0 , 0);
        break;
      }
    }
    if (correct) {
      outcomeColor = color(0 , 255 , 0);
      score++;
    }
  } 
  else {
    score--;
    outcomeColor = color(255 , 0 , 0);
  }
  setTimeout(() => {
    resetGame(PDTimer , PDSteps);
    outcomeColor = "yellow";
  }, 1000);
}
  
function drawUserPattern() {
  stroke(0, 0, 255);
  strokeWeight(4);
  let blueReduc = 255;
  let greenIncrem = 0;
  for (let i = 0; i < userPattern.length - 1; i++) {
    line(dots[userPattern[i]].x, dots[userPattern[i]].y, 
         dots[userPattern[i + 1]].x, dots[userPattern[i + 1]].y);
    let xDifference = (dots[userPattern[i + 1]].x - dots[userPattern[i]].x);
    let yDifference = (dots[userPattern[i + 1]].y - dots[userPattern[i]].y);
    let angle = atan2(yDifference , xDifference);
    let arrowX1 = dots[userPattern[i + 1]].x - 20 * cos(angle + PI / 6);
    let arrowY1 = dots[userPattern[i + 1]].y - 20 * sin(angle + PI / 6);
    let arrowX2 = dots[userPattern[i + 1]].x - 20 * cos(angle - PI / 6);
    let arrowY2 = dots[userPattern[i + 1]].y - 20 * sin(angle - PI / 6);
    stroke("white");
    fill(outcomeColor);
    strokeWeight(1);
    triangle(arrowX1 , arrowY1 , arrowX2 , arrowY2 , dots[userPattern[i + 1]].x , dots[userPattern[i + 1]].y);
    strokeWeight(4);
    fill(255,0,0);
    blueReduc -= (255 / PDSteps);
    greenIncrem += (255 / PDSteps);
    stroke(0, greenIncrem, blueReduc);
  }
}
  
function updateTimer() {
  if (!gameOver && !showPattern) {
    timer--;
  }
  if (timer <= 0) {
    resetGame(PDTimer , PDSteps);
  }
}
  
function keyPressed() {
  if (key === 'r' && ["PatternDragEasy" , "PatternDragMedium" , "PatternDragEasy"].includes(difficulty)) {
    resetGame(PDTimer , PDSteps);
  }
}
  
function resetGame(PDTimer , PDSteps) {
  pattern = [];
  userPattern = [];
  showPattern = true;
  gameOver = false;
  timer = PDTimer;
  patternStep = PDSteps;
  generatePattern();
  setTimeout(() => {
    first = true;
    showPattern = false; // Show pattern for 3 seconds
  }, 3000);
}

//COLOR CLICKER CODE ------------------------------------------------------------------------------------------------------------------
//COLOR CLICKER VARIABLES

//COLOR CLICKER MENU ________________________________________
function colorClickerMenu() {
  background(Bg);
  strokeWeight(1);
  textSize(32);
  textAlign(CENTER , CENTER);
  fill(0);
  text('Color Clicker', width / 2, 50);

  difficultyChooseCC('Easy', width / 2, 120, "colorClickerEasy");
  difficultyChooseCC('Medium', width / 2, 180, "colorClickerMedium");
  difficultyChooseCC('Hard', width / 2, 240, "colorClickerHard");
  image(backArrow , BAx , BAy, BAlen , BAwid);
  if ((mouseX > 25 && mouseX < 105) && (mouseY > 255 && mouseY < 335)) {
    BAx = 25;
    BAy = 255;
    BAlen = 80;
    BAwid = 80;
    if (mouseIsPressed) {
      page = "Home";
    }
  }
  else {
    BAx = 30;
    BAy = 260;
    BAlen = 70;
    BAwid = 70;
  }
}

function difficultyChooseCC(label, x, y, mode) {
    if (mouseX > x - 100 && mouseX < x + 100 && mouseY > y - 20 && mouseY < y + 20) {
        fill(200);
        if (mouseIsPressed) {
          page = mode;
          score = 0;
          remaining = 15; 
          gameOver = false;
          switch(page) {
            case "colorClickerEasy":
              difficulty = "Easy";
              break;
            case "colorClickerMedium":
              difficulty = "Medium";
              break;
            case "colorClickerHard":
              difficulty = "Hard";
              break;
            default:
              return;
          }
        }
    } else {
        fill(255);
      }
    stroke(0);
    rect(x - 100, y - 20, 200, 40 , 5 , 5 , 5 , 5);
    fill(0);
    textSize(20);
    text(label, x, y);
}

//COLOR CLICKER GAME ________________________________________
