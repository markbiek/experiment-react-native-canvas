export default function renderCanvas(width=200, height=200) {
    try {
        console.log(`renderCanvas: ${width}, ${height}`);

        let canvas = document.querySelector('canvas');
        let ctx = canvas.getContext('2d');

        let img = new Image();
        img.onload = () => {
            ctx.drawImage(img, width / 2, height / 2);
        };
        img.src = 'http://i.imgur.com/MLj6Nll.png';

        canvas.width = width;
        canvas.height = height;
        canvas.style.left = (window.innerWidth - width) / 2 + 'px';

        if (window.innerHeight > height) {
            canvas.style.top = (window.innerHeight - height) / 2 + 'px';
        }

        let dragging = false;
        let mouse = {
            x: width / 2,
            y: height / 2
        };

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function drawWorld() {
            clearCanvas();

            ctx.drawImage(img, mouse.x, mouse.y);

            drawParticles(ctx);
        }

        canvas.addEventListener('touchend', (e) => {
            mouse.x = e.touches[0].screenX;
            mouse.y = e.touches[0].screenY;

            dragging = false;
        });

        canvas.addEventListener('touchstart', (e) => {
            mouse.x = e.touches[0].screenX;
            mouse.y = e.touches[0].screenY;

            dragging = true;
        });

        canvas.addEventListener('touchmove', (e) => {
            mouse.x = e.touches[0].screenX;
            mouse.y = e.touches[0].screenY;

            if (dragging) {
                drawWorld();
            }
        });

        let init = [];
        const maxParts = 10;
        for (var a = 0; a < maxParts; a++) {
            init.push({
                x: Math.random() * width,
                y: Math.random() * height,
                l: Math.random() * 1,
                xs: -4 + Math.random() * 4 + 2,
                ys: Math.random() * 10 + 10
            })
        }

        let particles = [];
        for (var b = 0; b < maxParts; b++) {
            particles[b] = init[b];
        }

        function drawParticles() {
            for (var c = 0; c < particles.length; c++) {
                let p = particles[c];
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p.x + p.l * p.xs, p.y + p.l * p.ys);
                ctx.stroke();
            }
            move();
        }

        function move() {
            for (var b = 0; b < particles.length; b++) {
                var p = particles[b];
                p.x += p.xs;
                p.y += p.ys;
                if (p.x > width || p.y > height) {
                    p.x = Math.random() * width;
                    p.y = -20;
                }
            }
        }

        setInterval(drawWorld, 30);
    } catch (err) {
        console.log(`ERROR: ${err}`);
    }
}
