let sp = [];
let fondo;

function preload() {
  fondo = loadImage('noche.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  angleMode(DEGREES);
}

function draw() {
  image(fondo, 0, 0, width, height);

  noFill();
  stroke(60, 220, 255, 75);
  strokeWeight(2);
  for (let i = 0; i < sp.length - 1; i++) {
    line(sp[i].pos.x, sp[i].pos.y, sp[i + 1].pos.x, sp[i + 1].pos.y);
  }

  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height && frameCount % 2 === 0) {
    let np = new Particula(mouseX, mouseY);
    sp.push(np);
  }

  for (let i = sp.length - 1; i >= 0; i--) {
    sp[i].update();
    sp[i].display();
    if (sp[i].estaMuerta) {
      sp.splice(i, 1);
    }
  }
}
