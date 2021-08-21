function setup() {
  // put setup code here
  createCanvas(720, 720);
  noFill();
  //fill(0);
  //stroke(255);
  slider = createSlider(10,100,50);
  console.log("Hello, there...");
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(10);
  // put drawing code here
  console.log("drawing...");
  ellipse(width/2,height/2,slider.value(),slider.value());
}
