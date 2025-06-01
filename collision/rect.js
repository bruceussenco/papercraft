class Rect {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
}

class AABBRect extends Rect {
    velX = 0;
    velY = 0;
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.oldX = x;
        this.oldY = y;
    }
}

function rectCollision(r0, r1) {
    if (r0.x + r0.w < r1.x) return false;
    if (r0.x > r1.x + r1.w) return false;
    if (r0.y + r0.h < r1.y) return false;
    if (r0.y > r1.y + r1.h) return false;

    return true;
}

function rectTileCollision(rect, tileX, tileY) {
    if (rect.x > tileX + tileSize || rect.x + rect.w < tileX) return false;
    if (rect.y > tileY + tileSize || rect.y + rect.h < tileY) return false;
    return true; 
}
