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
let aimLab;
let patternDrag;
let colorClicker;
let backArrow;

//BG MUSIC
let bgMusic;

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
let BAwid = 7;

function setup() {
  createCanvas(640, 360);
}

function preload() {
  img1 = loadImage("images/gearIcon.png");
  img2 = loadImage("images/helpIcon.png");
  img3 = loadImage("images/exitIcon.png");
  aimLab = loadImage("images/aimLabIcon.png");
  patternDrag = loadImage("images/patternDragIcon.png");
  colorClicker = loadImage("images/colorClickerIcon.png");
  Bg = loadImage("images/BG.jpg");
  bgMusic = loadSound("images/Bgmusic.mp3");
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
}

function homePage() {
  //Basic Background elements
  background(Bg);
  adjustBrightness(Brightness);
  stroke("gold");
  strokeWeight(5);
  noFill();
  rect(0 , 0 , 640 , 360);
  
  
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
  image(aimLab , ALx , ALy , ALlen , ALwid);
  image(patternDrag , PDx , PDy , PDlen , PDwid);
  image(colorClicker , CCx , CCy , CClen , CCwid);
  
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
  stroke("gold");
  strokeWeight(5);
  noFill();
  rect(0 , 0 , 640 , 360);
  
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
  //SETTINGS PAGE ENTRY
  if ((mouseX > 25 && mouseX < 115) && (mouseY > 15 && mouseY < 105)) {
    page = "Settings";
  }
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
  if (!bgMusic.isPlaying()) {
    bgMusic.loop();
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