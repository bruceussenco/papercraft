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
