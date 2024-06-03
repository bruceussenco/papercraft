const downKeys = new Map();
const lastDownKeys = new Map();

const isKeyDown    = (key) => downKeys.get(key);
const isKeyPressed = (key) => downKeys.get(key) && !lastDownKeys.get(key);

document.addEventListener("keydown", onKeyDown);
function onKeyDown(e) {
    //console.log(e.keyCode);
    downKeys.set(e.keyCode, true);
    if (e.keyCode == KEY_SPACE) e.preventDefault();
}

document.addEventListener("keyup", onKeyUp);
function onKeyUp(e) {
    downKeys.set(e.keyCode, false);
}

const KEY_W = 87;
const KEY_S = 83;
const KEY_A = 65;
const KEY_D = 68;
const KEY_SPACE = 32;

const KEY_G = 71;

// mouse //

const mouse  = {x: 0, y: 0};

function updateMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
}

// use chunks[ci, cj].tiles[ti, tj]
function getTileOnMouse(camera) {
    // global mouse pos
    const mx = mouse.x + camera.x;
    const my = mouse.y + camera.y;

    // chunk index
    const ci = Math.floor(mx/chunkSize);
    const cj = Math.floor(my/chunkSize);

    // tile index (in chunk)
    const ti = Math.floor(mx/tileSize) % chunkTilesSize;
    const tj = Math.floor(my/tileSize) % chunkTilesSize;

    return {ci, cj, ti, tj};
}
