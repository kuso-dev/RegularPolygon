var CANVAS
var CTX
var GRAD

const RADIUS = 200
const DRAW_ID_LIST = []

const initPolygon = () => {
    CANVAS = document.getElementById("cv");
    CTX = CANVAS.getContext("2d");
    GRAD = CTX.createLinearGradient(0, 0, 0, 600);
    GRAD.addColorStop(0, 'rgb(255, 255, 0)');
    GRAD.addColorStop(0.5, 'rgb(0, 255, 255)');
    GRAD.addColorStop(1, 'rgb(255, 0, 255)');
    CTX.strokeStyle = GRAD;
    draw()
}

const draw = () => {
    const polygonShape = document.select.number.value;
    console.log('polygonShape: ', polygonShape);
    const vertexCount = ((_) => {
        const precision = 4;
        const correction = 0.5;
        var n = Math.floor(_ * 10 ** precision + correction);
        for (var i = 0; i < precision; i++) {
            if (n % 2 == 0) n = n / 2;
            if (n % 5 == 0) n = n / 5;
        }
        return n
    })(polygonShape)

    CTX.clearRect(0, 0, 500, 500);
    // 残存中の描画ハンドラ中断
    DRAW_ID_LIST.forEach(id => clearTimeout(id))

    document.getElementById('title').textContent = polygonShape;
    document.getElementById('vertex').textContent = vertexCount;
    var degree = Math.PI * 2 / polygonShape;
    var dX = 0;
    var dY = 0;

    CTX.beginPath();
    CTX.moveTo(250 + RADIUS * Math.cos(degree), 250 + RADIUS * Math.sin(degree));

    for (var _ = 0; _ < vertexCount; _++) {
        const id = setTimeout(() => {
            degree = degree + Math.PI * 2 / polygonShape;
            console.log(degree);
            dX = RADIUS * Math.cos(degree);
            dY = RADIUS * Math.sin(degree);
            CTX.lineTo(250 + dX, 250 + dY);
            CTX.stroke();
        }, _ * 50)
        DRAW_ID_LIST.push(id)
    }
}

initPolygon()


