let SIZE = 1080;
let gridSIZE = 1000;
let grid;
let gridStart = SIZE * .1;
let gridEnd = SIZE * .9;
let strokeWidth = SIZE * 0.001;
let strokeLength = SIZE * 0.01;
let xOff01;
let yOff01;
let zOff01 = 0;
let xOff02;
let yOff02;
let zOff02 = 0;
let colorPallet01 = ["#689ea5", "#4d321f", "#e4d5c4"];
let colorPallet02 = ["#B8D04E", "#036D19", "#FF6F59"];
let recording = false;

function setup() {
  // SIZE = min(windowHeight, windowWidth);

  createCanvas(SIZE, SIZE);
  console.log(canvas.width + ", " + canvas.height);

  frameRate(30);
  noLoop();

  initGrid();
  updateGrid();
  strokeWeight(strokeWidth);
  console.log(strokeWidth);
}

function draw() {
  background("#eca69f");
  for (let row = 0; row < gridSIZE; row++) {
    for (let col = 0; col < gridSIZE; col++) {
      let x = lerp(gridStart, gridEnd, col / gridSIZE);
      let y = lerp(gridStart, gridEnd, row / gridSIZE);

      let pos = grid[row][col];

      let groupValue = pos.groupVal;
      let positionValue = pos.noiseVal;

      push();
      translate(x,y);
      if (round(groupValue) == 0) {
        rotate(map(positionValue, 0, 1, -PI/5, PI/5));
        stroke(random(colorPallet01));
        line(0,0,strokeLength,0);
        // point(0,0);
      } else {
        rotate(map(positionValue, 0, 1, -2*PI,2*PI));
        stroke(random(colorPallet02));
        line(0,0,strokeLength,0);
        // point(0,0);
      }
      pop();
    }
  }

  if (recording) {
    capturer.capture(canvas);
  }

  updateGrid();
  console.log(frameRate);
}

//initialize grid and set a standard unit vector to each cell
function initGrid() {
  grid = new Array(gridSIZE);
  for (let row = 0; row < gridSIZE; row++) {
    grid[row] = new Array(gridSIZE);
    for (let col = 0; col < gridSIZE; col++) {
      grid[row][col] = new Position();
    }
  }
}

//update grid to next slice of through 3Dnoise
function updateGrid() {
  yOff01 = 0;
  yOff02 = 0;
  for (let row = 0; row < gridSIZE; row++) {
    xOff01 = 0;
    xOff02 = 0;
    for (let col = 0; col < gridSIZE; col++) {
      grid[row][col].groupVal = round(noise(xOff01, yOff01, zOff01));
      grid[row][col].noiseVal = noise(xOff02, yOff02, zOff02);
      xOff01+=0.008;
      xOff02+=0.5;
    }
    yOff01+=0.008;
    yOff02+=0.5;
  }
  zOff01+=0.01;
  zOff02+=0.01;
}

function keyReleased() {
  if (key == ' ' && !recording) {
    recording = true;
    capturer.start();
  }

  if (key == 's' || key == 'S') {
    saveCanvas("noiseField", 'png');
  }
}

class Position {
  groupVal;
  positionValue;
}