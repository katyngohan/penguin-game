//Arrays of animation
let norPen = [];
let leftPen = [];
let rightPen = [];
let sRock = [];
let Cands = [];
let SCands = [];
let Bul = [];

//One Picture Object
let enemy;
let boss;
let gPen0;
let gPen1;
let bg;
let norBlock;
let beginBlock;

//Sound
let FireSound;
let Footstep;
let GameOver;
let GainBell;
let GameWin;
let Pumping;
let BgMusic;

function loadFrames(arr, file_name, frame_length) {
  for (let i = 0; i < frame_length; ++i) {
    let frames = loadImage("assets/" + file_name + "_" + i + ".png");
    // frames.resize(200, 100);
    arr.push(frames);
  }
}
function loadPenFrames() {
  loadFrames(norPen, "pen", 1);
  loadFrames(leftPen, "lpen", 3);
  loadFrames(rightPen, "rpen", 3);
  loadFrames(sRock, "rock", 4);
  loadFrames(Cands, "can", 4);
  loadFrames(SCands, "scan", 4);
  loadFrames(Bul, "bul", 4);
}

function loadAssets() {
  norBlock = loadImage("assets/norBlock.png");
  beginBlock = loadImage("assets/beginBlock.png");
  bg = loadImage("assets/finalbackground.png");
  enemy = loadImage("assets/enemy.png");
  boss = loadImage("assets/boss.png");
  gPen0 = loadImage("assets/girl_0.png");
  gPen1 = loadImage("assets/girl_1.png");
  FireSound = loadSound("assets/FireSound.mp3");
  Footstep = loadSound("assets/FootStep.mp3");
  GameOver = loadSound("assets/GameOver.mp3");
  GainBell = loadSound("assets/GainBell.mp3");
  GameWin = loadSound("assets/GameWin.mp3");
  Pumping = loadSound("assets/Pumping.mp3");
  BgMusic = loadSound("assets/BgMusic.mp3");

  
  loadPenFrames();
}
