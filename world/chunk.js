const chunkTilesSize  = 16;
const chunkTilesCount = chunkTilesSize*chunkTilesSize;
const chunkSize = chunkTilesSize * tileSize;

function chunkByText(text) {
    if (text.length != chunkTilesCount)
        console.log("[error] text don't have " + chunkTilesCount + " length");

    const chunk = new Array(chunkTilesCount);

    for (let i = 0; i < chunkTilesCount; i++) {
        let curTile;

        if (text[i] == '#') {
            curTile = new Tile(BLOCK_DIRT);
        } else {
            curTile = new Tile(BLOCK_AIR);
        }

        chunk[i] = curTile;
    }

    return chunk;
}
