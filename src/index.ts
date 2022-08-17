'use strict'

import Peaks from "./Peaks";

function PolyFon(element_id: string) {

    const peaks = new Peaks();

    let count = 12;
    let coef = 100;
    let map = Array.from({length: count},
        (_, y) =>
            Array.from({length: count},
                (_, x) => peaks.create(x * coef, y * coef)));

    let colors = ['#2d9d5b', '#30a15e'];

    const canvas = document.getElementById(element_id) as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext('2d');

    let draw = () => {
        peaks.update()

        ctx.fillStyle = colors[0];
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = colors[1];

        ctx.beginPath();
        for (let y = 0; y < count - 1; y++) {
            for (let x = 0; x < count - 1; x++) {

                let {x: x1, y: y1} = map[x][y].getPos();
                let {x: x2, y: y2} = map[x + 1][y].getPos();
                let {x: x3, y: y3} = map[x][y + 1].getPos();

                ctx.moveTo(x1, y1);
                ctx.lineTo(x2, y2);
                ctx.lineTo(x3, y3);
            }
        }
        ctx.closePath();
        ctx.fill();

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
    return this;
}

document.getElementById('canvas') && PolyFon('canvas');