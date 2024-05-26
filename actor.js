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
        this.collideChunkHorizontal(i, j, chunk);
        this.collideChunkVertical(i, j, chunk);
    }

    collideChunkHorizontal(i, j, chunk) {
        const cx = i * chunkSize;
        const cy = j * chunkSize;

        for (let ti = 0; ti < chunkTilesSize; ti++) {
            const tx = cx + ti * tileSize;
            // if don't collide in x axis, don't check collilion for this col
            if (this.x >= tx + tileSize || this.x + this.w <= tx) continue;
            
            for (let tj = 0; tj < chunkTilesSize; tj++) {
                const tIndex = tj * chunkTilesSize + ti;
                const tile = chunk[tIndex];
                if (!blocks[tile.id].collide) continue;

                const ty = cy + tj * tileSize;

                if (this.oldY >= ty + tileSize && this.y < ty + tileSize) {
                    this.y = ty + tileSize;
                }

                if (this.oldY + this.h <= ty && this.y + this.h > ty) {
                    this.y = ty - this.h;
                }
            }
        }
    }

    collideChunkVertical(i, j, chunk) {
        const cx = i * chunkSize;
        const cy = j * chunkSize;

        for (let tj = 0; tj < chunkTilesSize; tj++) {
            const ty = cy + tj * tileSize;
            // if don't collide in y axis, don't check collilion for this row
            if (this.y >= ty + tileSize || this.y + this.h <= ty) continue;
            
            for (let ti = 0; ti < chunkTilesSize; ti++) {
                const tIndex = tj * chunkTilesSize + ti;
                const tile = chunk[tIndex];
                if (!blocks[tile.id].collide) continue;

                const tx = cx + ti * tileSize;

                if (this.oldX >= tx + tileSize && this.x < tx + tileSize) {
                    this.x = tx + tileSize;
                }

                if (this.oldX + this.w <= tx && this.x + this.w > tx) {
                    this.x = tx - this.w;
                }
            }
        }
    }
}