const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");
canvas.width  = screenWidth;
canvas.height = screenHeight;
canvas.addEventListener("mousemove", updateMousePos, false);

const bgColor   = "#4488ee";

const player = new Player(40, 100, 30, 62, 3, 11);
let oldTimeStamp = 0;

let devMode = true;

init();
function init() {
    gameLoop();
}

function gameLoop(timeStamp) {
    if (timeStamp) {
        const dt = (timeStamp - oldTimeStamp)/1000;
        oldTimeStamp = timeStamp;
        const fps = Math.round(1/dt);

        update(dt);
        render(player.camera);
        showFPS(fps);
    }
    window.requestAnimationFrame(gameLoop);
}
function update(dt) {
    if (isKeyPressed(KEY_G)) devMode = !devMode;

    if (devMode) {
        let moveX = 0;
        let moveY = 0;
        if (isKeyDown(KEY_W)) moveY -= 1;
        if (isKeyDown(KEY_S)) moveY += 1;
        if (isKeyDown(KEY_A)) moveX -= 1;
        if (isKeyDown(KEY_D)) moveX += 1;

        player.velX = moveX * player.speed;
        player.velY = moveY * player.speed;
    } else {
        let moveX = 0;
        let jump = false;
        if (isKeyDown(KEY_A)) moveX -= 1;
        if (isKeyDown(KEY_D)) moveX += 1;
        if (isKeyPressed(KEY_W) || isKeyPressed(KEY_SPACE)) jump = true;

        player.applyGravity();
        if (jump && player.isOnGround) player.jump();
        player.velX = moveX * player.speed;
    }

    player.move();
    player.collide(chunks);
    player.update();

    downKeys.forEach((value, key, map) => {
        lastDownKeys.set(key, value);
    });
}
function render(camera) {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    renderBg();

    ctx.save();
    ctx.translate(-camera.x, -camera.y);
    renderChunks(camera);
    renderPlayer();

    /* ground checker */ {
        if (player.isOnGround) ctx.fillStyle = "red";
        else                   ctx.fillStyle = "lime";
        ctx.fillRect(
            player.groundChecker.x, player.groundChecker.y,
            player.groundChecker.w, player.groundChecker.h
        );
    }

    /* tile marker */ {
        // chunk/tile on cursor
        const tm = getTileOnMouse(camera);
        const chunkIndex = tm.cj * worldChunksWidth + tm.ci;
        const tileIndex  = tm.tj * chunkTilesSize + tm.ti;
        //console.log(`chunk: (${tm.ci}, ${tm.cj}), tile: (${tm.ti}, ${tm.tj})`);

        if (chunks[chunkIndex][tileIndex].id !== BLOCK_AIR) {
            // global pos of tile
            const tgx = tm.ci * chunkSize + tm.ti * tileSize;
            const tgy = tm.cj * chunkSize + tm.tj * tileSize;

            ctx.strokeRect(tgx, tgy, tileSize, tileSize);
        }
    }

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
                renderChunk(chunks[index], offset);
            }
        }
    }
}
function renderChunk(chunk, offset) {
    for (let j = 0; j < chunkTilesSize; j++) {
        for (let i = 0; i < chunkTilesSize; i++) {
            const index = j * chunkTilesSize + i;
            const id    = chunk[index].id;

            const x = offset.x + i * tileSize;
            const y = offset.y + j * tileSize;

            if (id != BLOCK_AIR) {
                ctx.drawImage(blocks[id].texture, x, y);
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


