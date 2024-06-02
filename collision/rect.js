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

class CollisionBox extends Rect {
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    collideTile(x, y) {
        if (this.x > x + tileSize || this.x + this.w < x) return false;
        if (this.y > y + tileSize || this.y + this.h < y) return false;
        return true;
    }
}

function rectCollision(r0, r1) {
    if (r0.x + r0.w < r1.x) return false;
    if (r0.x > r1.x + r1.w) return false;
    if (r0.y + r0.h < r1.y) return false;
    if (r0.y > r1.y + r1.h) return false;

    return true;
}
