class Player extends Actor {
    constructor(x, y, w, h, speed) {
        super(x, y, w, h, speed)

        this.camera = {x: 0, y: 0};
    }

    update() {
        this.camera.x = this.x + this.w/2;
        this.camera.y = this.y + this.h/2;
    }

    walk(dir) {
        this.oldX = this.x;
        this.x += dir * this.speed;
    }

    move(x, y) {
        this.oldX = this.x;
        this.oldY = this.y;
        this.x += x * this.speed;
        this.y += y * this.speed;
    }
}