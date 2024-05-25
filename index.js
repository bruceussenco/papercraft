const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");
canvas.width  = 400;
canvas.height = 400;

const bgColor   = "#4488ee";
const chunkTileCount = 16;
const tileSize  = 20;
const chunkSize = chunkTileCount * tileSize;

const mouse  = {x: 0, y: 0};
const player = new Player(100, 100, 20, 40, 3);
let oldTimeStamp = 0;

let devMode = false;

init();
function init() {
    gameLoop();
}

function gameLoop(timeStamp) {
    const dt = (timeStamp - oldTimeStamp)/1000;
    oldTimeStamp = timeStamp;
    const fps = Math.round(1/dt);

    update(dt);
    render(player.camera);
    showFPS(fps);
    window.requestAnimationFrame(gameLoop);
}
function update(dt) {
    if (!dt) {
        console.log(dt);
        return;
    }

    let moveX = 0;
    let moveY = 0;
    if (downKeys.get('w')) moveY -= 1;
    if (downKeys.get('s')) moveY += 1;
    if (downKeys.get('a')) moveX -= 1;
    if (downKeys.get('d')) moveX += 1;

    if (downKeys.get('g')) devMode = !devMode;
    if (devMode) {
        player.move(moveX, moveY);
    } else {
        player.walk(moveX);
    }

    player.update();
}
function render(camera) {
    ctx.save();
    ctx.translate(-camera.x, -camera.y);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderBg(camera);
    renderChunks();
    renderPlayer();
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
function renderChunks() {
    for (let j = 0; j < worldChunksHeight; j++) {
        for (let i = 0; i < worldChunksWidth; i++) {
            const index = j * worldChunksWidth + i;
            const offset = {
                x: i * chunkSize,
                y: j * chunkSize,
            };
            renderChunk(chunks[index], offset);
        }
    }
}
function renderChunk(chunk, offset) {
    ctx.fillStyle   = "#aa5555";
    ctx.strokeStyle = "#000000";

    for (let j = 0; j < chunkTileCount; j++) {
        for (let i = 0; i < chunkTileCount; i++) {
            const index = j * chunkTileCount + i;
            if (chunk[index] == '#') {
                const x = offset.x + i * tileSize;
                const y = offset.y + j * tileSize;
                ctx.fillRect(x, y, tileSize, tileSize);
                ctx.strokeRect(x, y, tileSize, tileSize);
            }
        }
    }
}
function renderPlayer() {
    ctx.fillStyle = "#2222ff"; ctx.strokeStyle = "#000000";
    ctx.fillRect(player.x, player.y, player.w, player.h);
    ctx.strokeRect(player.x, player.y, player.w, player.h);
}
function showFPS(fps) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#00ff88";
    ctx.fillText("FPS: " + fps, 10, 30);
}

canvas.addEventListener("mousemove", updateMousePos, false);
function updateMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
}

////////////////////////////////
//////////// Input /////////////
////////////////////////////////
const downKeys = new Map();

document.addEventListener("keydown", onKeyDown);
document.addEventListener("keyup", onKeyUp);
function onKeyDown(e) { downKeys.set(e.key, true); }
function onKeyUp(e) { downKeys.set(e.key, false); }
