class Player extends Actor {
    constructor(x, y, w, h, speed, jumpForce) {
        super(x, y, w, h, speed, jumpForce);

        this.camera = new Camera(0, 0);
    }

    update() {
        super.update();
        this.camera.moveTo(this.x + this.w/2, this.y + this.h/2);
    }
}