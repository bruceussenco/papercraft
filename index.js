const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");
canvas.width  = 400;
canvas.height = 400;
canvas.addEventListener("mousemove", updateMousePos, false);

const bgColor = "#4488ee";
const tileSize = 20;

const mouse  = {x: 0, y: 0};
const camera = {x: 0, y: 0};
let oldTimeStamp = 0;

init();
function init() {
    gameLoop();
}

function gameLoop(timeStamp) {
    const dt = (timeStamp - oldTimeStamp)/1000;
    oldTimeStamp = timeStamp;
    const fps = Math.round(1/dt);

    update(dt);
    camera.x = mouse.x;
    camera.y = mouse.y;
    render(camera);
    renderFPS(fps);
    window.requestAnimationFrame(gameLoop);
}
function update(dt) {
    if (!dt) {
        console.log(dt);
        return;
    }
}
function render(camera) {
    ctx.save();
    ctx.translate(-camera.x, -camera.y);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderBg(camera);
    renderTiles();
    ctx.restore();
}

function renderBg(camera) {
    ctx.fillStyle = bgColor;
    ctx.fillRect(
        camera.x,
        camera.y,
        canvas.width,
        canvas.height
    );
}
function renderTiles() {
    ctx.fillStyle   = "#aa5555";
    ctx.strokeStyle = "#000000";

    for (let j = 0; j < map.length; j++) {
        const line = map[j];
        for (let i = 0; i < line.length; i++) {
            const tile = line[i];
            if (tile == '#') {
                const x = i * tileSize;
                const y = j * tileSize;
                ctx.fillRect(x, y, tileSize, tileSize);
                ctx.strokeRect(x, y, tileSize, tileSize);
            }
        }
    }
}
function renderFPS(fps) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#00ff88";
    ctx.fillText("FPS: " + fps, 10, 30);
}

function updateMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
}
