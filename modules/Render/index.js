export default function renderCanvas(width=200, height=200) {
    try {
        console.log(`renderCanvas: ${width}, ${height}`);

        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');
        var w = width;
        var h = height;
        var colors = ['#f35d4f', '#f36849', '#c0d988', '#6ddaf1', '#f1e85b'];

        canvas.width = width;
        canvas.height = height;
        canvas.style.left = (window.innerWidth - width) / 2 + 'px';

        if (window.innerHeight > height) {
            canvas.style.top = (window.innerHeight - height) / 2 + 'px';
        }
        var mouse = {x: 0, y: 0};

        var start_events = ["mousedown", "touchstart"];
        var move_events = ["mousemove", "touchmove"];
        var end_events = ["mouseup", "touchend"];

        move_events.forEach(function (event) {
            canvas.addEventListener(event, function (e) {
                console.log(`move: ${event}`);

                let touch = e.touches[0];

                mouse.x = touch.screenX;
                mouse.y = touch.screenY;
            }, false);
        });

        ctx.lineWidth = 5;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.strokeStyle = 'black';

        start_events.forEach(function (event) {
            canvas.addEventListener(event, function (e) {
                ctx.beginPath();
                ctx.moveTo(mouse.x, mouse.y);

                move_events.forEach(function (me) {
                    canvas.addEventListener(me, onPaint, false);
                });
            }, false);
        });

        end_events.forEach(function (event) {
            canvas.addEventListener(event, function (e) {
                move_events.forEach(function (me) {
                    canvas.removeEventListener(me, onPaint, false);
                });
            }, false);
        });

        var onPaint = function () {
            console.log(`onPaint: ${mouse.x}, ${mouse.y}`)
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        };
    } catch (err) {
        console.log(`ERROR: ${err}`);
    }
}
