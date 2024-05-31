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
