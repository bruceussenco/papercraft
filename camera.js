class Camera {
    w = screenWidth;
    h = screenHeight;

    // to use only int number to position
    xRemainder = 0;
    yRemainder = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    setCenter(x, y) {
        this.x = Math.floor(x) - this.w/2;
        this.y = Math.floor(y) - this.h/2;
        this.collideOnBorders();
    }

    moveCenterTo(destX, destY, speed) {
        let dirX = (destX - this.w/2) - this.x;
        let dirY = (destY - this.h/2) - this.y;

        const dist = Math.sqrt(dirX**2 + dirY**2);

        // normalize
        dirX /= dist;
        dirY /= dist;
        
        const newX = this.x + this.xRemainder + dirX * speed;
        const newY = this.y + this.yRemainder + dirY * speed;

        this.x = Math.floor(newX);
        this.y = Math.floor(newY);

        this.xRemainder = newX - this.x;
        this.yRemainder = newY - this.y;

        this.collideOnBorders();
    }

    collideOnBorders() {
        if (this.x < 0) this.x = 0;
        if (this.x + this.w > worldWidth)  this.x = worldWidth  - this.w;
        if (this.y < 0) this.y = 0;
        if (this.y + this.h > worldHeight) this.y = worldHeight - this.h;
    }
}
