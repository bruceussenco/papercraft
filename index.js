const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");
canvas.width  = screenWidth;
canvas.height = screenHeight;

const bgColor   = "#4488ee";

const player = new Player(40, 200, 30, 62, 3, 11);
let oldTimeStamp = 0;

let devMode = false;

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
    // check keys //
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

        if (isKeyReleased(KEY_W) || isKeyReleased(KEY_SPACE)) player.cancelJump();
    }

    // check mouse //
    if (isMousePressed) {
        const tm = getTileOnMouse(player.camera);
        const chunkIndex = tm.cj * worldChunksWidth + tm.ci;
        const tileIndex  = tm.tj * chunkTilesSize + tm.ti;

        if (chunkIndex < worldChunksCount &&
            chunks[chunkIndex][tileIndex].id !== BLOCK_BEDROCK) {
            chunks[chunkIndex][tileIndex] = new Tile(BLOCK_AIR);
        }
    }

    // update //
    player.move();
    player.collide(chunks);
    player.update();

    downKeys.forEach((value, key, map) => {
        lastDownKeys.set(key, value);
    });
    updateMouse();
}
function render(camera) {
    ctx.clearRect(0, 0, screenWidth, screenHeight);
    renderBg();

    ctx.save();
    ctx.translate(-camera.x, -camera.y);
    renderChunks(ctx, chunks, camera);
    player.render(ctx);
    player.debugRender(ctx);

    /* tile marker */ {
        // chunk/tile on cursor
        const tm = getTileOnMouse(camera);
        const chunkIndex = tm.cj * worldChunksWidth + tm.ci;
        const tileIndex  = tm.tj * chunkTilesSize + tm.ti;

        if (chunkIndex < worldChunksCount &&
            chunks[chunkIndex][tileIndex].id !== BLOCK_AIR) {
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
function showFPS(fps) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "#00ff88";
    ctx.fillText("FPS: " + fps, 10, 30);
}

