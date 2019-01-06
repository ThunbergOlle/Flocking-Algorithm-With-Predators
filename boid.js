class Boid {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4));
    this.acceleration = createVector();
    this.maxForce = 0.2;
    this.escaping = false;
    this.maxSpeed = 4;
  }

  flock(boids, predator) {
    let alignment = this.align(boids);
    let cohesion = this.cohesion(boids);
    let seperation = this.seperation(boids);

    seperation.mult(seperationSlider.value());
    cohesion.mult(cohesionSlider.value());
    alignment.mult(alignSlider.value());
    let escapeDistance = dist(predator.position.x, predator.position.y, this.position.x, this.position.y);
    if (escapeDistance < 100) {
      if (this.escaping === false) {
        let fleeDir = p5.Vector.mult(this.velocity, -2);
        this.acceleration.mult(0);
        this.acceleration.add(fleeDir);
        this.escaping = true;
      }
    } else {
      this.acceleration.mult(0);
      this.acceleration.add(seperation);
      this.acceleration.add(alignment);
      this.acceleration.add(cohesion);
      this.escaping = false;
    }
  }
  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }
  align(boids) {
    let distance = 50;
    let total = 0;
    let steering = createVector();
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other !== this && d < distance) {
        steering.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  cohesion(boids) {
    let distance = 50;
    let total = 0;
    let steering = createVector();
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other !== this && d < distance) {
        steering.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.sub(this.position);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  seperation(boids) {
    let distance = 50;
    let total = 0;
    let steering = createVector();
    for (let other of boids) {
      let d = dist(
        this.position.x,
        this.position.y,
        other.position.x,
        other.position.y
      );
      if (other !== this && d < distance) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.div(d);
        steering.add(diff);
        total++;
      }
    }
    if (total > 0) {
      steering.div(total);
      steering.setMag(this.maxSpeed);
      steering.sub(this.velocity);
      steering.limit(this.maxForce);
    }
    return steering;
  }
  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
  }
  display(boids) {
    strokeWeight(8);
    if (this.escaping === true) stroke(255, 0, 0, 233);
    else stroke(255);

    if (this === boids[0]) {
      stroke(255, 0, 0, 233);
      strokeWeight(1);
      noFill();
      ellipse(this.position.x, this.position.y, 50);
      stroke("#00ff00");
      strokeWeight(8);
    focusedPosition.html("Pos:      x= "+floor(this.position.x)+"    y= "+ floor(this.position.y));
    focusedEscaping.html("Escaping: "+this.escaping);
    focusedVelocity.html("Velocity:      x= "+floor(this.velocity.x)+"    y= "+ floor(this.velocity.y));
    }
    point(this.position.x, this.position.y);
  }
}
