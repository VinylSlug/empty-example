function setup() {
  // put setup code here
  createCanvas(720, 720);
  noFill();
  //fill(0);
  //stroke(255);
  console.log("Hello");
}

function draw() {
  // put drawing code here
  console.log("drawing...");
  for (var i = 0; i <= 5; i++) {
    line(0, 0, i*20, 100);
    line(100, 0, i*20, 100);
  }
}
