class Actor {
    constructor(x, y, w, h, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.speed = speed;

        this.oldX = x;
        this.oldY = y;
    }

    isInChunk(i, j) {
        const cx = i * chunkSize
        const cy = j * chunkSize

        if (cx + chunkSize < this.x) return false;
        if (this.x + this.w < cx)    return false;

        if (cy + chunkSize < this.y) return false;
        if (this.y + this.h < cy)    return false;

        return true;
    }

    collide(chunks) {
        for (let j = 0; j < worldChunksHeight; j++) {
            for (let i = 0; i < worldChunksWidth; i++) {
                if (this.isInChunk(i, j)) {
                    const index = j * worldChunksWidth + i;
                    this.collideChunk(i, j, chunks[index]);
                }
            }
        }
    }

    collideChunk(i, j, chunk) {
        const cx = i * chunkSize;
        const cy = j * chunkSize;

        /*
        // get min pos of top left corner, with cur pos and old pos
        // get max pos of bottom right corner, with cur pos and old pos
        // to reduce the area to check collision
        let pos0InChunk = {x: 0, y: 0};
        pos0InChunk.x = Math.min(this.x, this.oldX) - cx;
        pos0InChunk.y = Math.min(this.y, this.oldY) - cy;
        let pos1InChunk = {x: 0, y: 0};
        pos0InChunk.x = Math.max(this.x, this.oldX) - cx;
        pos0InChunk.y = Math.max(this.y, this.oldY) - cy;

        // tile range to check collision
        const leftMostTile = Math.floor(pos0InChunk/tileSize);
        */

        for (let tj = 0; tj < chunkTilesSize; tj++) {
            const ty = cy + tj * tileSize;
            for (let ti = 0; ti < chunkTilesSize; ti++) {
                const tIndex = tj * chunkTilesSize + ti;
                const tile = chunk[tIndex];
                // block don't have collision
                if (!blocks[tile.id].collide) continue;

                const tx = cx + ti * tileSize;

                // horizontal collision
                if (!(this.x >= tx + tileSize || this.x + this.w <= tx)) {
                    // tile bottom
                    if (this.oldY >= ty + tileSize && this.y < ty + tileSize) {
                        this.y = ty + tileSize;
                    }

                    // tile top
                    if (this.oldY + this.h <= ty && this.y + this.h > ty) {
                        this.y = ty - this.h;
                    }
                }

                // vertical collision
                if (!(this.y >= ty + tileSize || this.y + this.h <= ty)) {
                    // tile right - actor left collision
                    if (this.oldX >= tx + tileSize && this.x < tx + tileSize) {
                        this.x = tx + tileSize;
                    }

                    // tile left
                    if (this.oldX + this.w <= tx && this.x + this.w > tx) {
                        this.x = tx - this.w;
                    }
                }
           }
        }
    }
}