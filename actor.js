class Actor {
    velX = 0;
    velY = 0;
    constructor(x, y, w, h, speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.oldX = x;
        this.oldY = y;

        this.speed = speed;
    }

    updateOldPos() {
        this.oldX = this.x;
        this.oldY = this.y;
    }

    move() {
        this.updateOldPos();
        this.x += this.velX;
        this.y += this.velY;
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

        // get min pos of top left corner, with cur pos and old pos
        // get max pos of bottom right corner, with cur pos and old pos
        // to reduce the area to check collision
        const pos0InChunk = {
            x: Math.min(this.x, this.oldX) - cx,
            y: Math.min(this.y, this.oldY) - cy,
        };
        const pos1InChunk = {
            x: Math.max(this.x, this.oldX) + this.w - cx,
            y: Math.max(this.y, this.oldY) + this.h - cy,
        };

        // tile range to check collision
        // leftmostTileIndexToCheckCollisionWithActor ...
        const leftmostTile   = Math.max( Math.floor(pos0InChunk.x/tileSize), 0 );
        const rightmostTile  = Math.min( Math.floor(pos1InChunk.x/tileSize)+1, chunkTilesSize );
        const topmostTile    = Math.max( Math.floor(pos0InChunk.y/tileSize), 0 );
        const bottommostTile = Math.min( Math.floor(pos1InChunk.y/tileSize)+1, chunkTilesSize );

        for (let tj = topmostTile; tj < bottommostTile; tj++) {
            const ty = cy + tj * tileSize;
            for (let ti = leftmostTile; ti < rightmostTile; ti++) {
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
