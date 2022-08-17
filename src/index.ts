'use strict'

import Peaks from "./Peaks";
import Peak from "./Peak";

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

    let clientX = 0;
    let clientY = 0;

    let targets: Peak[] = []
    let path: Peak[] = []

    document.addEventListener('DOMContentLoaded', () => {

        canvas.addEventListener('mousemove', (e) => {
            clientX = e.clientX;
            clientY = e.clientY;
        })

        canvas.addEventListener('click', (_) => {
            console.log(targets)
            if (targets.length < 2) {
                targets.push(peaks.getNearest(clientX, clientY)[0]);
            } else {
                targets = [];
                path = [];
            }

        })
    })

    let draw = () => {
        peaks.update()

        if (targets.length == 2) {
            path = []
            let lastPeak = targets[0];
            while (lastPeak != targets[1]) {
                path.push(lastPeak);
                let nearby_peaks = peaks.getNearest(lastPeak.getPos().x, lastPeak.getPos().y, 6, lastPeak);
                if (nearby_peaks.includes(targets[1])) {
                    path.push(targets[1]);
                    break;
                }
                lastPeak = targets[1].getNearest(nearby_peaks);
            }
        }

        ctx.fillStyle = colors[0];
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = colors[1];

        let nearbyItem = peaks.getNearest(clientX, clientY)[0];

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

        ctx.fillStyle = '#4166b6'
        targets.map(peak => {
            ctx.beginPath();
            ctx.arc(peak.getPos().x, peak.getPos().y, 5, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        })


        ctx.fillStyle = '#151921'
        ctx.beginPath();
        path.map((peak, i) => {
            if (i == 0) {
                ctx.moveTo(peak.getPos().x, peak.getPos().y);
            } else {
                    ctx.lineTo(peak.getPos().x, peak.getPos().y);

                if (i == path.length - 1) {
                    ctx.moveTo(peak.getPos().x, peak.getPos().y);
                }
            }

        })
        console.log(path)
        ctx.closePath();
        ctx.stroke();

        ctx.fillStyle = '#61b7c4'
        ctx.beginPath();
        ctx.arc(nearbyItem.getPos().x, nearbyItem.getPos().y, 5, 0, Math.PI * 2);
        ctx.closePath();
        ctx.stroke();

        requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
    return this;
}

document.getElementById('canvas') && PolyFon('canvas');