const chunks = new Array(worldChunksCount);

for (let i = 0; i < worldChunksCount; i++) chunks[i] = newEmptyChunk();

generateMap(
    (t) => Math.floor(worldTilesHeight/4 + Math.sin(t * Math.PI + 0.1) * worldTilesHeight/8)
);

function generateMap(heightMapFunc) {
    const heightMap = new Array(worldTilesWidth);

    for (let i = 0; i < worldTilesWidth; i++) {
        const t = i / worldTilesWidth;
        const height = heightMapFunc(t);
        heightMap[i] = Math.max(1, height);
    }

    for (let i = 0; i < worldTilesWidth; i++) {
        const globalTileJ = worldTilesHeight - heightMap[i] - 1;
        const chunkJ = Math.floor(globalTileJ / chunkTilesSize);
        const tileJ  = globalTileJ % chunkTilesSize;

        const chunkI = Math.floor(i / chunkTilesSize);
        const tileI  = i % chunkTilesSize;

        fillBottom(chunkI, chunkJ, tileI, tileJ);
    }

    // cj == current chunk j // tj == current tile j //
    const cj = worldChunksHeight - 1;
    const tj = chunkTilesSize - 1;
    for (let ci = 0; ci < worldChunksWidth; ci++) {
        const cIndex = cj * worldChunksWidth + ci;
        for (let ti = 0; ti < chunkTilesSize; ti++) {
            const tIndex = tj * chunkTilesSize + ti;
            chunks[cIndex][tIndex] = new Tile(BLOCK_BEDROCK);
        }
    }
}

function fillBottom(chunkI, chunkJ, tileI, tileJ) {
    const chunkIndex = chunkJ * worldChunksWidth + chunkI;
    const tileIndex  = tileJ  * chunkTilesSize   + tileI;

    chunks[chunkIndex][tileIndex] = new Tile(BLOCK_GRASS);

    // cj == current chunk j // tj == current tile j //
    let tj = tileJ + 1;
    let depthCount = 1;
    for (let cj = chunkJ; cj < worldChunksHeight; cj++) {
        for (; tj < chunkTilesSize; tj++) {
            depthCount++;
            chunks
                [cj * worldChunksWidth + chunkI]
                [tj * chunkTilesSize + tileI] =
                    new Tile(depthCount <= 4 ? BLOCK_DIRT : BLOCK_STONE);
        }
        tj = 0;
    }
}

