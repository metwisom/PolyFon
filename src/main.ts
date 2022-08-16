'use strict'

function PolyFon(element_id) {

    let count = 12;
    let coef = 100;
    let sub_coef = 25;
    let speed = 1;
    let map = Array.from({length: count}, () => Array.from({length: count}, () => Math.random() * Math.PI * 2));
    let speed_step = Array.from({length: count}, () => Array.from({length: count}, () => Math.random() / 30));

    let colors = ['#2d9d5b', '#30a15e'];

    this.setColor = (color1, color2) => {
        colors = [color1, color2];
    }
    this.setSpeed = (new_speed) => {
        speed = new_speed;
    }

    const canvas = document.getElementById(element_id) as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let ctx = canvas.getContext('2d');

    let calcPoint = (x, y) => {
        return [
            (x) * coef + sub_coef * Math.cos(map[y][x]) - coef,
            (y) * coef + sub_coef * Math.sin(map[y][x]) - coef
        ];
    }

    let draw = () => {

        ctx.fillStyle = colors[0];
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = colors[1];

        ctx.beginPath();
        for (let y = 0; y < count - 1; y++) {
            for (let x = 0; x < count - 1; x++) {
                map[y][x] += speed_step[y][x] * speed;

                let [x1, y1] = calcPoint(x, y);
                let [x2, y2] = calcPoint(x + 1, y);
                let [x3, y3] = calcPoint(x, y + 1);

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

