import Peak from "./Peak";

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
}

export default Peaks;