let sp = [];      // Array para tus partículas originales
let spGlow = [];  // Array para las nuevas partículas de brillo
let fondo;

// Ya no necesitamos preload de imagen porque usamos fondo negro CSS
// function preload() { fondo = loadImage('noche.jpg'); }

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(60);
  angleMode(DEGREES);
}

function draw() {
  // Limpiamos el fondo en cada frame (Transparente para ver el CSS negro de fondo)
  clear();

  // --- 1. DIBUJAR LÍNEAS (Conexiones de tus partículas originales) ---
  noFill();
  stroke(60, 220, 255, 75);
  strokeWeight(2);
  for (let i = 0; i < sp.length - 1; i++) {
    // Dibujamos línea entre partícula actual y la siguiente
    line(sp[i].pos.x, sp[i].pos.y, sp[i + 1].pos.x, sp[i + 1].pos.y);
  }

  // --- 2. GENERAR PARTÍCULAS AL MOVER MOUSE ---
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    
    // Controlamos la velocidad de generación
    if (frameCount % 2 === 0) {
        // A. Tu partícula Original
        let np = new Particula(mouseX, mouseY);
        sp.push(np);
        
        // B. Las nuevas partículas de Brillo (Generamos 2 por cada 1 original)
        for(let n=0; n<2; n++){
            let brillo = new ParticulaBrillo(mouseX, mouseY);
            spGlow.push(brillo);
        }
    }
  }

  // --- 3. ACTUALIZAR Y DIBUJAR ORIGINALES ---
  for (let i = sp.length - 1; i >= 0; i--) {
    sp[i].update();
    sp[i].display();
    if (sp[i].estaMuerta) {
      sp.splice(i, 1);
    }
  }

  // --- 4. ACTUALIZAR Y DIBUJAR BRILLOS (NUEVAS) ---
  for (let i = spGlow.length - 1; i >= 0; i--) {
    spGlow[i].update();
    spGlow[i].display();
    if (spGlow[i].estaMuerta()) {
      spGlow.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}