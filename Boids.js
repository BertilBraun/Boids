
const triangleSize = 2;

const mouseMargin = 200;
const wallMargin = 50;
const turnFactor = 2;

var localThreshold = 50;
var seperationFactor = 0.05;
var alignmentFactor = 0.05;
var cohesionFactor = 0.05;

class Flock {
    constructor(count) {
        this.boids = [];

        for (var i = 0; i < count; i++) {
            this.boids.push(new Boid());
        }
    }

    update() {
        for (const boid of this.boids) {
            const locals = []

            // TODO optimize using spacial seperation
            for (const other of this.boids) {
                if (boid != other && boid.pos.dist(other.pos) < localThreshold)
                    locals.push(other)
            }

            boid.update(locals)
        }
    }

    draw() {
        for (const boid of this.boids) {
            boid.draw()
        }
    }
}

class Boid {
    constructor() {
        this.pos = createVector(random(width), random(height))
        this.vel = p5.Vector.random2D()
        this.acc = createVector(0, 0)
    }

    update(locals) {

        if (locals.length > 0) {
            this.seperation(locals)
            this.alignment(locals)
            this.cohesion(locals)
            this.avoideWall()
            this.avoideMouse()
        } else {
            this.flockToCenter()
        }

        this.vel = this.vel.add(this.acc)
        this.vel.limit(5)
        this.pos = this.pos.add(this.vel)
        this.acc = createVector(0, 0)

        this.confine();
    }

    draw() {
        // draw using a triangle to indicate direction

        push()

        translate(this.pos.x, this.pos.y)
        rotate(this.vel.heading() - radians(90));

        stroke(255);
        triangle(0, 0, triangleSize, 0, triangleSize / 2, triangleSize * 1.2);

        pop()

        // point(this.pos.x, this.pos.y)
    }

    // Move away from other boids that are too close to avoid colliding
    seperation(locals) {

        var avg = createVector(0, 0);

        for (const local of locals)
            if (this.pos.dist(local.pos) < 20)
                avg.add(this.pos.copy().sub(local.pos))

        avg.mult(seperationFactor) // Adjust by this %

        this.applyForce(avg)
    }

    // Find the average velocity (speed and direction) of the other boids and
    // adjust velocity slightly to match.
    alignment(locals) {

        var avg = createVector(0, 0);

        for (const local of locals)
            avg.add(local.vel)

        avg.div(locals.length)

        avg.sub(this.vel)
        avg.mult(alignmentFactor) // Adjust by this %

        this.applyForce(avg)
    }

    // Find the center of mass of the other boids and adjust velocity slightly to
    // point towards the center of mass.
    cohesion(locals) {
        var center = createVector(0, 0);

        for (const local of locals)
            center.add(local.pos)

        center.div(locals.length)
        center.sub(this.pos)
        center.mult(cohesionFactor) // Adjust by this %

        this.applyForce(center)
    }

    // Constrain a boid to within the window. If it gets too close to an edge,
    // nudge it back in and reverse its direction.
    avoideWall() {

        if (this.pos.x < wallMargin)
            this.acc.x += turnFactor;
        if (this.pos.x > width - wallMargin)
            this.acc.x -= turnFactor;

        if (this.pos.y < wallMargin)
            this.acc.y += turnFactor;
        if (this.pos.y > height - wallMargin)
            this.acc.y -= turnFactor;
    }

    avoideMouse() {
        const mousePos = createVector(mouseX, mouseY)
        if (this.pos.dist(mousePos) < mouseMargin) {

            this.applyForce(this.pos.copy().sub(mousePos))
            stroke(255, 0, 0);
            point(this.pos.x, this.pos.y)
        }
    }

    flockToCenter() {
        const center = createVector(width / 2, height / 2)

        if (this.pos.dist(center) > 100 && localThreshold > 30)
            this.applyForce(center.sub(this.pos))
        else
            this.applyForce(p5.Vector.random2D())

        stroke(255, 182, 193);
        point(this.pos.x, this.pos.y)
    }

    confine() {
        this.pos.x = max(min(width, this.pos.x), 0);
        this.pos.y = max(min(height, this.pos.y), 0);
    }

    applyForce(force) {
        this.acc.add(force)
    }
}