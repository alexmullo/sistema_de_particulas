class Particula {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.vel = p5.Vector.random2D();
    this.vel.setMag(random(1, 2.5));
    this.acc = createVector(0, random(-0.08, -0.18));
    this.tVida = int(random(120, 180));
    this.tVidaInicial = this.tVida;
    this.diam = random(18, 34);
    this.estaMuerta = false;

    let palettes = [
     color(random(190, 255), random(30, 90), random(30, 90), random(210, 255)),
     color(random(30, 110), random(170, 255), random(30, 80), random(210, 255)),
     color(random(220, 240), random(200, 220), random(60, 80), random(210, 255)),
     color(random(230, 255), random(230, 255), random(230, 255), random(230, 255))
    ];

    this.c = random(palettes);
    this.halo = random(12, 26);
    
    console.log('Hola, estoy viva'); 
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.tVida--;

    if (this.tVida <= 0 || this.pos.y < 0 || this.pos.x < 0 || this.pos.x > width) {

      if (!this.estaMuerta) {
          console.log('Uuuups, me morí :(');
      }
      this.estaMuerta = true;
    }
  }

  display() {
    let diamFinal = map(this.tVida, this.tVidaInicial, 0, this.diam, this.diam * 2.5);

    let parpadeo = map(sin(frameCount * 25.5 + this.pos.x * 1.1), -1, 1, 40, 255);
    let cEffect = color(red(this.c), green(this.c), blue(this.c), parpadeo);

    fill(red(this.c), green(this.c), blue(this.c), parpadeo * 0.22);

    noStroke();
    ellipse(this.pos.x, this.pos.y, diamFinal + this.halo);

    fill(cEffect);
    ellipse(this.pos.x, this.pos.y, diamFinal);
 
    fill(255, parpadeo * 0.6);
    ellipse(this.pos.x, this.pos.y, diamFinal * 0.48);
  }
}

class ParticulaBrillo {
  constructor(_x, _y) {
    this.pos = createVector(_x, _y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(random(2, 5)); 
    this.acc = createVector(0, 0); 
    this.alpha = 255;
    this.size = random(2, 5); 
  }

  update() {
    this.pos.add(this.vel);
    this.vel.mult(0.95);
    this.alpha -= 5;
  }

  display() {
    noStroke();
    fill(255, 255, 255, this.alpha);
    
    drawingContext.shadowBlur = 15;
    drawingContext.shadowColor = 'rgba(255, 255, 255, 0.8)';
    
    ellipse(this.pos.x, this.pos.y, this.size);
    drawingContext.shadowBlur = 0;
  }

  estaMuerta() {
    return this.alpha < 0;
  }
}