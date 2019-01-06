const flock = [];
const totalPredators = [];

let alignSlider, cohesionSlider, seperationSlider;
let focusedEscaping, focusedPosition, focusedVelocity;
function setup() {
  createCanvas(1000, 700);
  alignSlider = createSlider(0, 5, 1, 0.1);
  cohesionSlider = createSlider(0, 5, 1, 0.1);
  seperationSlider = createSlider(0, 5, 1, 0.1);
  focusedEscaping = createElement("p", "Escaping");
  focusedPosition = createElement("p", "Position");
  focusedVelocity = createElement("p", "Velocity");

  for (let i = 0; i < 50; i++) {
    flock.push(new Boid());
  }
  predator = new Predator(random(width), random(height));
}
function draw() {
  background(51);
  predator.display();
  predator.move();
  predator.edges();

  for (let boid of flock) {
    boid.edges();
    boid.flock(flock, predator);
    boid.display(flock);
    boid.update();
  }
}
