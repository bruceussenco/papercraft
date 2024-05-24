const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");
canvas.width  = 400;
canvas.height = 400;
canvas.addEventListener("mousemove", updateMousePos, false);

const bgColor = "#4488ee";
const tileSize = 20;

let mouse = {x: 0, y: 0};

init();
function init() {
    render();
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderBg();
    renderTiles();
    renderMouse();
}

function renderBg() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
function renderMouse() {
    ctx.fillStyle   = "white";
    ctx.fillRect(mouse.x, mouse.y, 10, 10);
}

function updateMousePos(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    console.log("(" + mouse.x + ", " + mouse.y + ")");
}
