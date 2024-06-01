class Player extends Actor {
    constructor(x, y, w, h, speed, jumpForce) {
        super(x, y, w, h, speed, jumpForce);

        this.camera = {x: 0, y: 0};
    }

    update() {
        super.update();
        this.camera.x = Math.floor(this.x + this.w/2);
        this.camera.y = Math.floor(this.y + this.h/2);
    }
}