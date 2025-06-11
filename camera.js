class Camera {
    w = screenWidth;
    h = screenHeight;

    widthOffset  = 100;
    heightOffset =  60;

    // to use only int number to position
    xRemainder = 0;
    yRemainder = 0;
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    debugRender(ctx) {
        ctx.save();
        ctx.strokeStyle = "#e3d";
        // offset
        ctx.strokeRect(
            this.x + (this.w - this.widthOffset)/2,
            this.y + (this.h - this.heightOffset)/2,
            this.widthOffset, this.heightOffset
        );
        ctx.restore();
    }

    getCenter() {
        return {x: this.x + this.w/2, y: this.y + this.h/2};
    }

    setCenter(x, y) {
        this.x = Math.floor(x) - this.w/2;
        this.y = Math.floor(y) - this.h/2;
        this.collideOnBorders();
    }

    moveCenterTo(destX, destY, speed) {
        const camCenter = this.getCenter();

        let moveHorz = destX < camCenter.x -  this.widthOffset/2 ||
                       destX > camCenter.x +  this.widthOffset/2;
        let moveVert = destY < camCenter.y - this.heightOffset/2 ||
                       destY > camCenter.y + this.heightOffset/2;

        if (!moveHorz && !moveVert) return;

        let dirX = destX - this.w/2 - this.x;
        let dirY = destY - this.h/2 - this.y;

        const dist = Math.sqrt(dirX**2 + dirY**2);

        const newX = this.x + this.xRemainder + dirX/dist * speed;
        const newY = this.y + this.yRemainder + dirY/dist * speed;

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
