class Camera {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    moveTo(x, y) {
        this.x = Math.floor(x);
        this.y = Math.floor(y);

        if (this.x - screenWidth/2  < 0) this.x = screenWidth/2;
        if (this.x + screenWidth/2  > worldWidth)  this.x = worldWidth  - screenWidth/2;
        if (this.y - screenHeight/2 < 0) this.y = screenHeight/2;
        if (this.y + screenHeight/2 > worldHeight) this.y = worldHeight - screenHeight/2;
    }
}
