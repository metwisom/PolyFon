import Peak from "./Peak";
import {Distance} from "./types";

class Peaks {

  private list: Peak[] = [];

  create(X: number, Y: number) {
    const newVertex = new Peak(X, Y);
    this.list.push(newVertex);
    return newVertex;
  }

  update() {
    this.list.map((peak) => peak.update());
  }

  getNearest(x: number, y: number, limit = 1, exclude: Peak = undefined) {
    return this.list
      .filter(peak => exclude != undefined ? peak != exclude : true)
      .map(item => <Distance>{dist: item.getDistance(x, y), item})
      .sort((a, b) => a.dist - b.dist)
      .slice(0, limit)
      .map(dist => dist.item);
  }
}

export default Peaks;