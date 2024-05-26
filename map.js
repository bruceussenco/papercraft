const mapText = 
"################" +
"..###########..#" +
"....#####......#" +
".....##........#" +
"...............#" +
"...............#" +
"...#.#.........#" +
"...............#" +
"...............#" +
"...#...........#" +
"................" +
"................" +
"....###........." +
"..########......" +
".#############.." +
"################";

const chunks = new Array(worldChunksCount);
chunks[0] = chunkByText(mapText);

async function loadFile(path) {
    const response = await fetch(path);
    const text = await response.text();
    return text;
}
