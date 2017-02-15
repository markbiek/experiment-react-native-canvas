export default function renderCanvas(width=200, height=200) {
    try {
        console.log(`renderCanvas: ${width}, ${height}`);

        let canvas = document.querySelector('canvas');
        let ctx = canvas.getContext('2d');

        var img = new Image();
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
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, mouse.x, mouse.y);
            }
        });
    } catch (err) {
        console.log(`ERROR: ${err}`);
    }
}
