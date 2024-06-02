class Camera {
    w = screenWidth;
    h = screenHeight;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    moveCenterTo(x, y) {
        this.x = Math.floor(x) - this.w/2;
        this.y = Math.floor(y) - this.h/2;
        this.collideOnBorders();
    }

    collideOnBorders() {
        if (this.x < 0) this.x = 0;
        if (this.x + this.w > worldWidth)  this.x = worldWidth  - this.w;
        if (this.y < 0) this.y = 0;
        if (this.y + this.h > worldHeight) this.y = worldHeight - this.h;
    }
}
