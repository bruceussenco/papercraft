class Block {
    constructor(collide) {
        this.collide = collide;
    }
}

const BLOCK_AIR   = 0;
const BLOCK_DIRT  = 1;
const BLOCK_COUNT = 2;

const blocks = new Array(BLOCK_COUNT);
blocks[BLOCK_AIR]  = new Block(false);
blocks[BLOCK_DIRT] = new Block(true);
