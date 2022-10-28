import {Distance} from "./types";

class Peak {

  private readonly axisX;
  private readonly axisY;

  private readonly speed;
  private radius;

  private step;

  constructor(X: number, Y: number) {
    this.axisX = X;
    this.axisY = Y;

    this.speed = Math.random() / 30;
    this.step = Math.random() * Math.PI * 2;
    this.radius = Math.cos(this.step) * 30;
  }

  update() {
    this.step += this.speed;
    this.radius = Math.cos(this.step / 40) * 30;
  }

  getPos() {
    return {
      x: this.axisX + Math.cos(this.step) * this.radius,
      y: this.axisY + Math.sin(this.step) * this.radius
    };
  }

  getDistance(x: number, y: number) {
    return Math.sqrt(Math.pow(x - this.axisX, 2) + Math.pow(y - this.axisY, 2));
  }

  getNearest(peak_list: Peak[]) {
    return peak_list
      .map(item => <Distance>{dist: item.getDistance(this.axisX, this.axisY), item})
      .sort((a, b) => a.dist - b.dist)[0].item;
  }

}

export default Peak;