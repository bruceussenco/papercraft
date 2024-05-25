const mapText = 
"################" +
"..###########..." +
"....#####......." +
".....##........." +
"................" +
"................" +
"................" +
"................" +
"................" +
"................" +
"................" +
"................" +
"....###........." +
"..########......" +
".#############.." +
"################";

const worldChunksWidth  = 1;
const worldChunksHeight = 1;

const chunks = new Array(worldChunksWidth*worldChunksHeight);
chunks[0] = mapText;

async function loadFile(path) {
    const response = await fetch(path);
    const text = await response.text();
    return text;
}
