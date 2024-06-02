const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");
canvas.width  = screenWidth;
canvas.height = screenHeight;

const bgColor   = "#4488ee";

const mouse  = {x: 0, y: 0};
const player = new Player(40, 100, 30, 62, 3, 11);
let oldTimeStamp = 0;

let devMode = true;

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

    player.velX = moveX * player.speed;
    if (devMode) {
        player.velY = moveY * player.speed;
    } else {
        player.applyGravity();
        if (moveY == -1 && player.isOnGround) {
            player.jump();
        }
    }
    player.move();

    player.collide(chunks);
    player.update();
}
function render(camera) {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    renderBg();

    ctx.save();
    ctx.translate(-camera.x + screenWidth/2, -camera.y + screenHeight/2);
    renderChunks(camera);
    renderPlayer();

    if (player.isOnGround) ctx.fillStyle = "red";
    else                   ctx.fillStyle = "lime";
    ctx.fillRect(
        player.groundChecker.x, player.groundChecker.y,
        player.groundChecker.w, player.groundChecker.h
    );
    
    ctx.restore();
}

function renderBg() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function renderChunks(camera) {
    for (let j = 0; j < worldChunksHeight; j++) {
        for (let i = 0; i < worldChunksWidth; i++) {
            const index = j * worldChunksWidth + i;
            const offset = {
                x: i * chunkSize,
                y: j * chunkSize,
                w: chunkSize,
                h: chunkSize,
            };

            if (rectCollision(offset, camera)) {
                renderChunk(chunks[index], fgChunks[index], offset);
            }
        }
    }
}
function renderChunk(chunk, fgChunk, offset) {
    for (let j = 0; j < chunkTilesSize; j++) {
        for (let i = 0; i < chunkTilesSize; i++) {
            const index = j * chunkTilesSize + i;
            const id   = chunk[index].id;
            const fgId = fgChunk[index].id;

            const x = offset.x + i * tileSize;
            const y = offset.y + j * tileSize;

            if (id != BLOCK_AIR) {
                ctx.drawImage(blocks[id].texture, x, y);
            } else if (fgId != BLOCK_AIR) {
                ctx.drawImage(blocks[fgId].texture, x, y);
                ctx.fillStyle = "#00000088";
                ctx.fillRect(x, y, tileSize, tileSize);
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
