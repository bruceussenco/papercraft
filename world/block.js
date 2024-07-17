class Block {
    collide = false;
    texture = null;
    constructor(name, collide) {
        this.name = name;
        this.collide = collide;
    }
}

const BLOCK_AIR   = 0;
const BLOCK_DIRT  = 1;
const BLOCK_GRASS = 2;
const BLOCK_STONE = 3;
const BLOCK_BEDROCK = 4;
const BLOCK_COUNT = 5;

const blocks = new Array(BLOCK_COUNT);
blocks[BLOCK_AIR]   = new Block("air",  false);
blocks[BLOCK_DIRT]  = new Block("dirt",  true);
blocks[BLOCK_GRASS] = new Block("grass", true);
blocks[BLOCK_STONE] = new Block("stone", true);
blocks[BLOCK_BEDROCK] = new Block("bedrock", true);

loadBlockTextures();
function loadBlockTextures() {
    for (let i = 0; i < BLOCK_COUNT; i++) {
        const path = TEXTURES_FOLDER + blocks[i].name + ".png";
        const image = new Image();
        image.src = path;
        blocks[i].texture = image;
    }
}
