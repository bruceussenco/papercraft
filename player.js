class Player extends Actor {
    constructor(x, y, w, h, speed, jumpForce) {
        super(x, y, w, h, speed, jumpForce);

        this.camera = new Camera(x, y);
    }

    update() {
        super.update();
        this.camera.moveCenterTo(this.x + this.w/2, this.y + this.h/2);
    }
}