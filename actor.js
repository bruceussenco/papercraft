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
}