class Actor extends AABBRect {
    isOnGround = false;
    constructor(x, y, w, h, speed, jumpForce) {
        super(x, y, w, h);

        this.speed = speed;
        this.jumpForce = jumpForce;
        this.groundChecker = new CollisionBox(0, 0, w-2, w/2);
        this.updateGroundChecker();
    }

    update() {
        this.updateGroundChecker();
    }

    updateGroundChecker() {
        this.groundChecker.x = this.x + 1;
        this.groundChecker.y = this.y + this.h - this.groundChecker.h/2;
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

    applyGravity() {
        this.velY += GRAVITY;
        this.velY = Math.min(this.velY, MAX_GRAVITY);
    }

    jump() {
        this.velY = -this.jumpForce;
    }

    isInChunk(i, j) {
        const cx = i * chunkSize
        const cy = j * chunkSize

        if (cx + chunkSize < this.x && cx + chunkSize < this.oldX) return false;
        if (this.x + this.w < cx    && this.oldX + this.w < cx)    return false;

        if (cy + chunkSize < this.y && cy + chunkSize < this.oldY) return false;
        if (this.y + this.h < cy    && this.oldY + this.h < cy)    return false;

        return true;
    }

    collide(chunks) {
        this.isOnGround = false;

        // invert j loop if player is moving up, to fix collision bug
        let bj = 0;
        let ej = worldChunksHeight;
        let inc = 1;
        let condition = (j) => { return j < ej; };

        if (this.velY < 0) {
            bj = worldChunksHeight-1;
            ej = 0;
            inc = -1;
            condition = (j) => { return j >= ej; };
        }

        for (let j = bj; condition(j); j += inc) {
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

        // use these vars to invert loop
        // if actor is moving up, to fix a bug collision
        let tjb = topmostTile;    // begin tile j
        let tje = bottommostTile; //   end tile j
        let inc = 1;
        let condition = (tj) => { return tj < tje };

        if (this.velY < 0) {
            tjb = bottommostTile-1;
            tje = topmostTile;
            inc = -1;
            condition = (tj) => { return tj >= tje; };
        }

        //for (let tj = topmostTile; tj < bottommostTile; tj++) {
        for (let tj = tjb; condition(tj); tj += inc) {
            const ty = cy + tj * tileSize;
            for (let ti = leftmostTile; ti < rightmostTile; ti++) {
                const tIndex = tj * chunkTilesSize + ti;
                const tile = chunk[tIndex];
                // block don't have collision
                if (!blocks[tile.id].collide) continue;

                const tx = cx + ti * tileSize;

                // horizontal collision
                if (!(this.x >= tx + tileSize || this.x + this.w <= tx)) {
                    // tile bottom-actor top collision
                    if (this.oldY >= ty + tileSize && this.y < ty + tileSize) {
                        this.y = ty + tileSize;
                        this.velY = 0;
                    }

                    // tile top
                    if (this.oldY + this.h <= ty && this.y + this.h > ty) {
                        this.y = ty - this.h;
                        this.velY = 0;
                    }
                }

                // vertical collision
                if (!(this.y >= ty + tileSize || this.y + this.h <= ty)) {
                    // tile right
                    if (this.oldX >= tx + tileSize && this.x < tx + tileSize) {
                        this.x = tx + tileSize;
                        this.velX = 0;
                    }

                    // tile left
                    if (this.oldX + this.w <= tx && this.x + this.w > tx) {
                        this.x = tx - this.w;
                        this.velX = 0;
                    }
                }
                if (this.groundChecker.collideTile(tx, ty)) this.isOnGround = true;
           }
        }
    }
}
