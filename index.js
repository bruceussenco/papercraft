const canvas = document.getElementById("canvas");
const ctx    = canvas.getContext("2d");
canvas.width  = 400;
canvas.height = 400;

const bgColor = "#4488ee";

const tileSize = 20;
const mapPath = "map.txt";
let map;

init();
async function init() {
    map = await loadMap(mapPath);
    render();
}

function render() {
    renderBg();
    renderTiles();
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

async function loadFile(path) {
    const response = await fetch(path);
    const text = await response.text();
    return text;
}
async function loadMap(path) {
    const text = await loadFile(path);
    const lines = text.split(/\r?\n/);
    return lines;
}