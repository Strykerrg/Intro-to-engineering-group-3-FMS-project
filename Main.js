let page = "Home";
//TRAIL VAR
let trail = [];
let trailMax = 10;
//VOLUME BAR VAR
let volbar = 395;
let volume;
//BRIGHTNESS BAR VAR
let brightnessBar = 320;
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
}

function homePage() {
  //Basic Background elements
  background(Bg);
  adjustBrightness(Brightness);
    
  //text alt
  stroke("black");
  strokeWeight(1);
  fill("black");
  textSize(20);
  
  //HOVER
  homeHover();

  //Images loading [Top Line]
  image(img1 , STx , STy , STlen , STwid);
  image(img2 , HPx , HPy , HPlen , HPwid);
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
  bgMusic.setVolume(volume);
  
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
  Brightness = map(brightnessBar , 245 , 395 , 0 , 2);
  circle(brightnessBar , 205 , 20);  
  adjustBrightness(Brightness);
  
  //HOVER
  settingsHover();

  //Images loading [Top Line]
  image(img1 , STx , STy , STlen , STwid);
  image(img2 , HPx , HPy , HPlen , HPwid);
  image(img3 , ETx , ETy , ETlen , ETwid); 
  image(backArrow , BAx , BAy, BAlen , BAwid);
  
  //GAME NAME
  gameName();
}

function mousePressed() {
  //HOME PAGE RETURN
  if ((page == "Settings") && (mouseX > 25 && mouseX < 105) && (mouseY > 255 && mouseY < 335)) {
      page = "Home";
  }
  //VOL ADJUST
  if ((page == "Settings") && (mouseX > 240 && mouseX < 400) && (mouseY > 155 && mouseY < 175)) {
    volbar = mouseX;
  }
  //EXIT EXECUTION
  if (((page == "Home") || (page == "Settings")) && (mouseX > 535 && mouseX <615) && (mouseY > 31 && mouseY < 111)) {
    noLoop();
    bgMusic.stop();
  }
  //BRIGHTNESS ADJUST
  if ((page == "Settings") && ((mouseX > 240 && mouseX < 400) && (mouseY > 195 && mouseY < 215))) {
    brightnessBar = mouseX;
  }
  //Music
  //if (!bgMusic.isPlaying()) {
    //bgMusic.loop();
  //}
  
  if (page == "aimLabEasy" || page == "aimLabMedium" || page == "aimLabHard") {
    clickCircle();
  }
}

function settingsHover() {
  //clicker hover animaion
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
  //HELP
  if ((mouseX > 145 && mouseX < 225) && (mouseY > 31 && mouseY < 111)) {
    HPx = 145;
    HPy = 31;
    HPlen = 80;
    HPwid = 80;
  }
  else {
    HPx = 150;
    HPy = 36;
    HPlen = 70;
    HPwid = 70;
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
  }
  else {
    BAx = 30;
    BAy = 260;
    BAlen = 70;
    BAwid = 70;
  }
}

function homeHover() {
  //clicker hover animaion
  //AIM LAB
  if ((mouseX > 105 && mouseX < 185) && (mouseY > 215 && mouseY < 295)) {
    ALx = 105;
    ALy = 215;
    ALlen = 80;
    ALwid = 80;
    if (mouseIsPressed) {
      page = "aimLabMenu";
      strokeWeight(1);
    }
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
  //HELP
  if ((mouseX > 145 && mouseX < 225) && (mouseY > 31 && mouseY < 111)) {
    HPx = 145;
    HPy = 31;
    HPlen = 80;
    HPwid = 80;
  }
  else {
    HPx = 150;
    HPy = 36;
    HPlen = 70;
    HPwid = 70;
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

//AIM LAB CODE ------------------------------------------------------------------------------------------------------------------------
//GAME VARIABLES
let circleClick;
let score;
let remaining; 
let circleTimer;
let timeBetweenCircles; 
let gameOver;
let circleSize;
let difficulty;

//AIM LAB MENU _____________________________________________

function aimLabMenu() {
  background(Bg);
  strokeWeight(1);
  textSize(32);
  textAlign(CENTER , CENTER);
  fill(0);
  text('Reaction + Hand-eye Coordination Trainer', width / 2, 50);

  drawButton('Easy', width / 2, 120, "aimLabEasy");
  drawButton('Medium', width / 2, 180, "aimLabMedium");
  drawButton('Hard', width / 2, 240, "aimLabHard");
}

function drawButton(label, x, y, mode) {
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
      /*if (['Easy', 'Medium', 'Hard'].includes(mode)) {
        difficulty = mode;
        page = 'reaction';
      
      }*/
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
  
    
    textSize(24);
    fill(0);
    text(model , width / 2, 30);
    
    if (gameOver) {
      displayGameOver();
      return;
    }
  
    displayScore();
    displayRemaining();
    
    
    if (millis() - circleTimer > timeBetweenCircles) {
      score--;
      nextCircle();
    }
  
    drawCircle();
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
    text('Press Enter To Continue' , width / 2 , height / 2 + 100);
    noFill();
    rect(width / 2 - 150 , height / 2 + 75 , 300 , 50 , 5 , 5 , 5 , 5);
    if (keyCode == ENTER) {
      page = "aimLabMenu";
    }
}
