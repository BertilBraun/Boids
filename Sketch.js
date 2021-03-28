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
    seperationSlider = document.getElementById('seperationSlider')
    alignmentSlider = document.getElementById('alignmentSlider')
    cohesionSlider = document.getElementById('cohesionSlider')
    
    boidCountSlider = document.getElementById('boidCountSlider')
    visionSlider = document.getElementById('visionSlider')

    reset();
    
    // console.time('update')
    // for (var i = 0; i < 10000; i++)
    // system.update()
    // console.timeEnd('update')

    // console.time('updateOld')
    // for (var i = 0; i < 10000; i++)
    // system.updateOld()
    // console.timeEnd('updateOld')

}

function draw() {

    if (boidCountSlider.value != boidCount) {
        boidCount = Number(boidCountSlider.value)
        reset()
    }

    localThreshold = Number(visionSlider.value)

    seperationFactor = Number(seperationSlider.value)
    alignmentFactor = Number(alignmentSlider.value)
    cohesionFactor = Number(cohesionSlider.value)

    background(20);
    strokeWeight(6);

    system.update()
    system.draw()
}