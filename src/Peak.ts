class Peak {

    private readonly axisX;
    private readonly axisY;

    private readonly speed;
    private  radius;

    private step;

    constructor(X: number, Y: number) {
        this.axisX = X;
        this.axisY = Y;

        this.speed = Math.random() / 30;
        this.step = Math.random() * Math.PI * 2;
        this.radius = Math.cos(this.step) * 30
    }

    update() {
        this.step += this.speed;
        this.radius = Math.cos(this.step/40) * 30;
    }

    getPos() {
        return {
            x: this.axisX + Math.cos(this.step) * this.radius,
            y: this.axisY + Math.sin(this.step) * this.radius
        }
    }

}

export default Peak;