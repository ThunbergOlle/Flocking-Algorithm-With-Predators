class Predator{
    constructor(x, y){

        this.position = createVector(x, y);
        this.velocity = p5.Vector.random2D();
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
    display(){
        ellipse(this.position.x, this.position.y, 50, 50);
    }
    move(){
        this.position.add(this.velocity);
        
    }
}