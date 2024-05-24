const mapText = 
`##########
..#####...
....##....
..........
..........
..........
....#.....
..####....
.######...
##########`;

const map = loadMap(mapText);

async function loadFile(path) {
    const response = await fetch(path);
    const text = await response.text();
    return text;
}
function loadMap(text) {
    const lines = text.split(/\r?\n/);
    return lines;
}
