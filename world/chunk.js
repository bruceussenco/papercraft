const chunkTilesSize  = 16;
const chunkTilesCount = chunkTilesSize*chunkTilesSize;
const chunkSize = chunkTilesSize * tileSize;

function chunkByText(text) {
    if (text.length != chunkTilesCount)
        alert("[error] text don't have " + chunkTilesCount + " length, lenght = " + text.length);

    const chunk = new Array(chunkTilesCount);

    for (let i = 0; i < chunkTilesCount; i++) {
        let tile;

        switch(text[i]) {
            case 'd':
                tile = new Tile(BLOCK_DIRT);  break;
            case 'g':
                tile = new Tile(BLOCK_GRASS); break;
            case 's':
                tile = new Tile(BLOCK_STONE); break;
            default:
                tile = new Tile(BLOCK_AIR);   break;
        }

        chunk[i] = tile;
    }

    return chunk;
}

function newEmptyChunk() {
    const chunk = new Array(chunkTilesCount);
    for (let i = 0; i < chunkTilesCount; i++) chunk[i] = new Tile(BLOCK_AIR);
    return chunk;
}

function renderChunks(ctx, chunks, camera) {
    for (let j = 0; j < worldChunksHeight; j++) {
        for (let i = 0; i < worldChunksWidth; i++) {
            const index = j * worldChunksWidth + i;
            const offset = {
                x: i * chunkSize,
                y: j * chunkSize,
                w: chunkSize,
                h: chunkSize,
            };

            if (rectCollision(offset, camera)) renderChunk(ctx, chunks[index], offset);
        }
    }
}

function renderChunk(ctx, chunk, offset) {
    for (let j = 0; j < chunkTilesSize; j++) {
        for (let i = 0; i < chunkTilesSize; i++) {
            const index = j * chunkTilesSize + i;
            const id    = chunk[index].id;

            const x = offset.x + i * tileSize;
            const y = offset.y + j * tileSize;

            if (id != BLOCK_AIR) ctx.drawImage(blocks[id].texture, x, y);
        }
    }
}
