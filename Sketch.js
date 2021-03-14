var system;

var boidCount = 200;

var seperationSlider; 
var alignmentSlider;
var cohesionSlider;
var boidCountSlider;
var visionSlider;

function reset() {
    system = new Flock(boidCount)
}

function setup() {
    createCanvas(800, 800);
    createButton('Reset').mousePressed(reset);

    createP('seperation')
    seperationSlider = createSlider(0, 0.4, 0.05, 0.01)
    createP('alignment')
    alignmentSlider = createSlider(0, 0.4, 0.05, 0.01)
    createP('cohesion')
    cohesionSlider = createSlider(0, 0.4, 0.05, 0.01)
    
    createP('boidCount')
    boidCountSlider = createSlider(1, 1000, 200, 10)
    createP('vision')
    visionSlider = createSlider(0, 200, 50, 2)

    reset();
}

function draw() {

    if (boidCountSlider.value() != boidCount) {
        boidCount = boidCountSlider.value()
        reset()
    }
    
    localThreshold = visionSlider.value()

    seperationFactor = seperationSlider.value()
    alignmentFactor = alignmentSlider.value()
    cohesionFactor = cohesionSlider.value()

    background(20);
    strokeWeight(6);
    system.update()
    system.draw()
}