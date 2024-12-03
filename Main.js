let page = "Home";
//TRAIL VAR
let trail = [];
let trailMax = 5;
//VOLUME BAR VAR
let volbar = 395;
let volume;
let volbarTarget = 395;
//BRIGHTNESS BAR VAR
let brightnessBar = 390;
let Brightness = 1;
let brightnessBarTaget = 390;
//MUSIC SWITCH
let music;
let musicCircle = 300;
let musicTarget = 300;
let musicSwitchColor;
let musicSwitchColorTarget;

//Life Icon
let lifeIcon;

//IMG
let Bg;
let VidBg
let img1;
let img2;
let img3;
let aimLabImg;
let patternDragImg;
let colorClickerImg;
let backArrow;

//Sound Effects
let clickSound;
let gameSound;

//MUSIC OBJECT CONTAINER
let audio = [];

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

  //Background
  VidBg = createVideo('Files/backgroundVideo.mp4', videoLoad);
  VidBg.hide();
  VidBg.hideControls();
  VidBg.elt.muted = true;

  musicSwitchColor = color("#ff1b2d");
  musicSwitchColorTarget = color("#ff1b2d");
}

function preload() {
  img1 = loadImage("Files/gearIcon.png");
  img2 = loadImage("Files/helpIcon.png");
  img3 = loadImage("Files/exitIcon.png");
  aimLabImg = loadImage("Files/aimLabIcon.png");
  patternDragImg = loadImage("Files/patternDragIcon.png");
  colorClickerImg = loadImage("Files/colorClickerIcon.png");
  clickSound = loadSound("Files/clickSound.mp3");
  gameSound = loadSound("Files/gameSound.mp3");
  audio.push(clickSound);
  audio.push(gameSound);
  backArrow  = loadImage("Files/backArrow.png");
  lifeIcon = loadImage("Files/health.png"); //Image by FreePik
}

function videoLoad() {
  VidBg.loop();
  VidBg.volume(0);
}

function gameName() {
  textAlign(LEFT , LEFT);
  textSize(30);
  fill("#003366");
  stroke("#003366");
  strokeWeight(1);
  text("Reflex Arcade" , 240 , 40);
}

function draw() { 
  //Background
  image(VidBg , 0 , 0 , width , height);
  
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
  else if (page == "gameOver") {
    displayGameOver(mode);
  }
  else if (page == "aimLabMenu") {
    aimLabMenu();
  }
  else if (page == "aimLabEasy" ||page == "aimLabMedium" ||page == "aimLabHard") {
    aimLab(difficulty);
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
  else if (page == "colorClickerEasy" ||page == "colorClickerMedium" ||page == "colorClickerHard") {
    colorClicker();
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

  adjustBrightness(Brightness);
}

function homePage() {
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
  textAlign(RIGHT , CENTER);

  //sound on/off
  fill("black");
  stroke("black");
  strokeWeight(1);
  text("Music:" , 230 , 130)

  musicSwitchColor = lerpColor(musicSwitchColor , musicSwitchColorTarget , 0.2);
  fill(musicSwitchColor);
  strokeWeight(4);
  stroke("Black")
  rect(290 , 120 , 60 , 20 , 10);

  fill("Black");
  stroke("Black");
  strokeWeight(1);
  musicCircle = lerp(musicCircle , musicTarget , 0.2);
  music = map(musicCircle , 300 , 340 , 0 , 2) > 1;
  circle(musicCircle , 130 , 20);
  if (music && !gameSound.isPlaying()) {
    gameSound.loop();
  }
  else if (!music) {
    gameSound.stop();
  }
  
  
  //Volume Bar
  fill("black");
  stroke("black");
  strokeWeight(1);
  text("Volume:" , 230 , 165);
  
  fill("#e7bb92");
  strokeWeight(4);
  stroke("Black");
  rect(240 , 160 , 160 , 10 , 5);
  
  fill("black");
  stroke("black");
  volbar = lerp(volbar , volbarTarget , 0.2);
  volume = map(volbar , 245 , 395 , 0 , 1);
  circle(volbar , 165 , 20);
  for (let i of audio) {
    i.setVolume(volume);
  }
  
  //Brightness
  fill("black");
  stroke("black");
  strokeWeight(1);
  text("Brightness:" , 230 , 205);
  
  fill("#e7bb92");
  strokeWeight(4);
  stroke("Black");
  rect(240 , 200 , 160 , 10 , 5);
  
  fill("black");
  stroke("black");
  brightnessBar = lerp(brightnessBar , brightnessBarTaget , 0.2);
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
    volbarTarget = mouseX;
  }
  //EXIT EXECUTION
  if (((page == "Home") || (page == "Settings")) && (mouseX > 535 && mouseX <615) && (mouseY > 31 && mouseY < 111)) {
    noLoop();
    select('canvas').remove();
    //bgMusic.stop();
  }
  //BRIGHTNESS ADJUST
  if ((page == "Settings") && ((mouseX > 240 && mouseX < 400) && (mouseY > 195 && mouseY < 215))) {
    brightnessBarTaget = mouseX;
  }
  //MUSIC SWITCH
  if ((page == "Settings") && (mouseX > 290 && mouseX < 350) && (mouseY > 120 && mouseY < 140)) {
    if (mouseX > 320) {
      musicTarget = 340;
      musicSwitchColorTarget = color("#1ed760");
    } 
    else {
      musicTarget = 300;
      musicSwitchColorTarget = color("#ff1b2d");
    }
  }
  //Mouse Press Aim Lab
  if (page == "aimLabEasy" || page == "aimLabMedium" || page == "aimLabHard") {
    clickCircle();
  }
  //Mouse Press Pattern Drag
  if (page == "patternDragEasy" || page == "patternDragMedium" || page == "patternDragHard") {
    patternDragMousePressed();
  }
  //Mouse Press Color Clicker
  if (page == "colorClickerEasy" || page == "colorClickerMedium" || page == "colorClickerHard") {
    colorClickerMousePressed();
  }
}

function mouseClicked() { //this function starts when mouse is released
  //AIM LAB ICON
  if (page == "Home" && ((mouseX > 105 && mouseX < 185) && (mouseY > 215 && mouseY < 295))) {
    clickSound.play();
    page = "aimLabMenu";
  }
  //PATTERN DRAG ICON
  if (page == "Home" && (mouseX > 285 && mouseX < 365) && (mouseY > 215 && mouseY < 295)) {
    clickSound.play();
    page = "patternDragMenu";
  }
  //COLOR CLICKER ICON
  if (page == "Home" && (mouseX > 465 && mouseX < 545) && (mouseY > 215 && mouseY < 295)) {
    clickSound.play();
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
      clickSound.play();
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
      clickSound.play();
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
let gameOver = false;
let remaining;
let difficulty;
let mode;
let maxScore;

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
  textSize(32);
  stroke("black");
  strokeWeight(1);
  fill(0);
  textStyle(ITALIC);
  if (score == maxScore) {
    text('Perfect Score!!!' , width / 2 , height / 6);
  }
  else if (score >= maxScore - 5) {
    text('Almost Got it! Keep Trying!!' , width / 2 , height / 6);
  }
  else if (score > 0) {
    text('Keep practicing—you\'ve got this!!', width / 2 , height / 6);
  }
  else {
    text('Don\'t give up! Try again!', width / 2 , height / 6);
  }
  fill("#FD7E14");
  rect(width / 2 - 150 , height / 2 + 75 , 300 , 50 , 5 , 5 , 5 , 5);

  textStyle(NORMAL);
  fill(0);
  text('Game Over', width / 2, height / 2 - 30);
  textSize(24);
  text(`Final Score: ${score}`, width / 2, height / 2 + 10);
  text('Press Enter To Continue' , width / 2 , height / 2 + 100);
  let Press_width = textWidth("Press ");
  strokeWeight(3);
  stroke(255 , 0 , 0);
  line(width / 2 - Press_width - 3 , height / 2 + 113 , width / 2 - Press_width - 3 + textWidth("Enter") , height / 2 + 113);
  if (keyIsDown(ENTER)) {
    page = gameMode;
  }
}

//AIM LAB CODE ------------------------------------------------------------------------------------------------------------------------
//GAME VARIABLES
let circleClick;
let circleTimer;
let timeBetweenCircles;
let circleSize;

//AIM LAB MENU ______________________________________________

function aimLabMenu() {
  strokeWeight(1);
  textSize(32);
  textAlign(CENTER , CENTER);
  fill(0);
  text('Aim Lab', width / 2, 50);

  //instructions
  textSize(20);

  textFont('Montserrat');
  fill("#5762f5");
  stroke("#0B6623");
  text('Click on the circles before the time runs out!', width / 2, height - 10);

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
      clickSound.play();
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
    fill("#F88379");
    if (mouseIsPressed) {
      clickSound.play();
      page = mode;
      score = 0;
      remaining = 30; 
      circleTimer = 0;
      gameOver = false;
      maxScore = 30;
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
    fill("#E0F2F7");
  }
  stroke(0);
  rect(x - 100, y - 20, 200, 40 , 5 , 5 , 5 , 5);
  fill(0);
  textSize(20);
  text(label, x, y);
}

//AIM LAB GAME ______________________________________________

function aimLab(model) {
    strokeWeight(1);
    
    textSize(24);
    fill(0);
    text(model , width / 2, 30);
    
    if (gameOver) {
      page = "gameOver";
      mode = "aimLabMenu";
      return;
    }
  
    displayScore();
    displayRemaining();
    
    
    if (millis() - circleTimer > timeBetweenCircles) {
      score--;
      nextCircle();
    }
  
    drawCircle();

    fill("#EAF8F1");
    rect (5 , 5 , 100 , 30 , 5 , 5);
    fill("Black");
    text('ESC to Exit' , 55 , 20,);
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
  strokeWeight(1);
  textSize(32);
  textAlign(CENTER , CENTER);
  fill(0);
  text('Pattern Drag', width / 2, 50);

  clearInterval(drawTimer);

  //instructions
  textSize(20);

  textFont('Montserrat');
  fill("#5762f5");
  stroke("#0B6623");
  text('See the pattern, Remember it! Recreate!!', width / 2, height - 10);


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
      clickSound.play();
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
        fill("#F88379");
        if (mouseIsPressed) {
          clickSound.play();
          page = mode;
          score = 0;
          remaining = 15; 
          gameOver = false;
          maxScore = 15;
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
        fill("#E0F2F7");
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
  drawDots();
  if (remaining < 0) {
    gameOver = true;
  }

  if (showPattern) {
    drawPattern();
  }
  else {
    drawUserPattern();
  }
  if (gameOver) {
    page = "gameOver";
    mode = "patternDragMenu";
    return;
  }
  displayScore();
  displayRemaining();

  fill("#EAF8F1");
  rect (5 , 5 , 100 , 30 , 5 , 5);
  fill("Black");
  text('ESC to Exit' , 55 , 20,);
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
  
function drawPattern() {
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
    fill(153, 235, 255);

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
  if (!gameOver && !showPattern && userPattern.length < pattern.length) {
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
  let xDifference;
  let yDifference;
  let angle;
  let x1;
  let y1;
  let x2;
  let y2;
  for (let i = 0; i < userPattern.length - 1; i++) {
    xDifference = (dots[userPattern[i + 1]].x - dots[userPattern[i]].x);
    yDifference = (dots[userPattern[i + 1]].y - dots[userPattern[i]].y);
    angle = atan2(yDifference , xDifference);
    x1 = dots[userPattern[i]].x + 12 * cos(angle);
    y1 = dots[userPattern[i]].y + 12 * sin(angle);
    x2 = dots[userPattern[i + 1]].x - 10 * cos(angle);
    y2 = dots[userPattern[i + 1]].y - 10 * sin(angle);
    line(x1 , y1 , x2 , y2);
    stroke("White");
    strokeWeight(1);
    fill("white");
    text(i + 1 , dots[pattern[i + 1]].x , dots[pattern[i + 1]].y);

    let arrowX1 = x2 - 20 * cos(angle + PI / 6);
    let arrowY1 = y2 - 20 * sin(angle + PI / 6);
    let arrowX2 = x2 - 20 * cos(angle - PI / 6);
    let arrowY2 = y2 - 20 * sin(angle - PI / 6);
    stroke("white");
    fill(outcomeColor);
    strokeWeight(1);
    triangle(arrowX1 , arrowY1 , arrowX2 , arrowY2 , x2 , y2);
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
let circles = [];
let circleDiameter;
let numCircles;
let targetColor;
let colors;
let lives;
let Timer;

//COLOR CLICKER MENU ________________________________________
function colorClickerMenu() {
  strokeWeight(1);
  textSize(32);
  textAlign(CENTER , CENTER);
  fill(0);
  text('Color Clicker', width / 2, 50);

  //interval reset
  clearInterval(Timer);

  //instructions
  textSize(20);

  textFont('Montserrat');
  fill("#5762f5");
  stroke("#0B6623");
  text('Click on the circles of the target color!', width / 2, height - 10);
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
      clickSound.play();
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
        fill("#F88379");
        if (mouseIsPressed) {
          clickSound.play();
          page = mode;
          score = 0; 
          gameOver = false;
          remaining = 0;
          circles = [];
          switch(page) {
            case "colorClickerEasy":
              difficulty = "Easy";
              lives = 5;
              colors = ['red', 'blue'];
              targetColor = random(colors);
              numCircles = 30;
              circleDiameter = 40;
              timer = 60;
              CirclePositionConstruct();
              break;
            case "colorClickerMedium":
              difficulty = "Medium";
              lives = 3;
              colors = ['red', 'blue' , 'green'];
              targetColor = random(colors);
              numCircles = 45;
              circleDiameter = 30;
              timer = 45;
              CirclePositionConstruct();
              break;
            case "colorClickerHard":
              difficulty = "Hard";
              lives = 2;
              colors = ['red', 'blue' , 'green' , 'yellow'];
              targetColor = random(colors);
              numCircles = 60;
              circleDiameter = 20;
              timer = 30;
              CirclePositionConstruct();
              break;
            default:
              return;
          }
          maxScore = remaining;
          Timer = setInterval(() => {timer--;} , 1000);
        }
    } else {
        fill("#E0F2F7");
      }
    stroke(0);
    rect(x - 100, y - 20, 200, 40 , 5 , 5 , 5 , 5);
    fill(0);
    textSize(20);
    text(label, x, y);
}

//COLOR CLICKER GAME ________________________________________

function colorClicker() {

  if (gameOver) {
    page = "gameOver";
    mode = "colorClickerMenu";
    return;
  }
  
  if (timer == 0) {
    gameOver = true;
  }

  // Draw all circles (only those that are not clicked)
  for (let i = 0; i < circles.length; i++) {
    if (!circles[i].clicked) {
      fill(circles[i].color);
      noStroke();
      ellipse(circles[i].x, circles[i].y, circleDiameter, circleDiameter);
    }
  }

  //Life display
  fill (0);
  textSize(24);
  text('Lives: ' , 40 , 50);
  for(let i = 0; i < lives; i++) {
    image(lifeIcon , textWidth('Lives: ') + 5 + (i * 35), 35 , 30 , 30);
  }

  //timer Draw
  timerDraw();

  // Display the target color
  textSize(24);
  fill(0);
  text('Target: ' , (width / 2) - (textWidth('Target: ') / 2) , 25);
  fill(targetColor);
  text(`${targetColor}` , (width / 2) + (textWidth(`${targetColor}`) / 2) , 25);

  // Check if all circles of the target color have been clicked
  if (allTargetCirclesClicked()) {
    gameOver = true;  // End the game if all target color circles are clicked
  }

  if (lives === 0) {
    gameOver = true;
  }

  displayScore();
  displayRemaining();

  fill("#EAF8F1");
  rect (5 , 5 , 100 , 30 , 5 , 5);
  fill("Black");
  text('ESC to Exit' , 55 , 20);
  if (keyCode == ESCAPE && keyIsPressed) {
    page = "colorClickerMenu";
  }
}

function CirclePositionConstruct() {
  do {
    let x = random(circleDiameter / 2 , width - (circleDiameter / 2) - 1); //prevents circles from going out of screen
    let y = random(circleDiameter / 2 + 60, height - (circleDiameter / 2) - 1); // this one also prevents circles near the counters
    let validPosition = true;
    for (let i = 0; i < circles.length; i++ ) {
      let circleDistance = dist(circles[i].x , circles[i].y , x , y);
      if (circleDistance < circleDiameter) {
        validPosition = false;
        break;
      }
    }
    if (!validPosition) {continue;}
    let color = random(colors);
    if (color === targetColor) {
      remaining++;
    }
    circles.push({ x, y, color, clicked: false });
    numCircles--;
  } while(numCircles > 0);
}

function colorClickerMousePressed() {
  if (gameOver) {return;}
  let blankSpaceClicked = true;
  // Check if the clicked position is inside a circle and the circle's color matches the target
  for (let i = 0; i < circles.length; i++) {
    if (circles[i].clicked) {continue;}  // Skip already clicked circles

    let d = dist(mouseX, mouseY, circles[i].x, circles[i].y);
    if (d < circleDiameter / 2) {  // 20 is half the diameter of the circle
      if (circles[i].color === targetColor) {
        score++; // Correct color clicked
        remaining--;
        blankSpaceClicked = false;
        circles[i].clicked = true; // Mark this circle as clicked
      } else {
        score--; // Incorrect color clicked
        lives--;
        blankSpaceClicked = false;
      }
    }
  }
  if (blankSpaceClicked) {
    score--;
    lives--;
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

function timerDraw() {
  if (timer > 10) {
    fill(0);
  }
  else {
    fill(255 , 0 , 0);   //last ten seconds alert
  }
  textSize(24);
  //text('Timer :' , width - textWidth('Timer :') - 20 , 40);
  text(`Timer : ${timer}` , width - textWidth('Timer :') / 2 - 20, 50);
}
