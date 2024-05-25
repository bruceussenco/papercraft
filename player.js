class Player {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.speed = 3;

        this.oldX = x;
        this.oldY = y;
    }

    move(dir) {
        this.oldX = this.x;
        this.x += dir * this.speed;
    }
}