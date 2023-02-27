const BOARD_TILES = 8;
const BOARD_SIZE = 400;
const TILE_SIZE = BOARD_SIZE / BOARD_TILES;
const cores = ['#bbf0e7', '#95e8da', '#0d917b', '#01382f'];

function setup() {
    createCanvas(BOARD_SIZE, BOARD_SIZE);

    world = new World();
}

function draw() {
    // background(220)
    textSize(16);
    fill(0, 100, 150);
    text('Food Counter: ' + world.count, 10, height - 375);
    noStroke();
    target = createVector(mouseX, mouseY);
    // circle(target.x, target.y, 32);
    world.update();
}