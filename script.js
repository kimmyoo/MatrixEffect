const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
gradient.addColorStop(0, 'red');
gradient.addColorStop(.2, 'orange');
gradient.addColorStop(.4, 'yellow');
gradient.addColorStop(.6, 'cyan');
gradient.addColorStop(.8, 'blue');
gradient.addColorStop(1, 'magenta');


class Symbol {
    constructor(x, y, fontSize, canvasHeight) {
        this.characters = 'αβγδεζηθικλμνξοπρστυφχψωABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン金瑶全家福禄寿囍财♥ἸΧΘΥΣ▣ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎㅐㅒㅔㅖㅘㅙㅚㅝㅞㅟㅢ';
        // (x, y) is coordinates
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }


    randomlyDraw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length))
        let specialChars = "金瑶全家福禄寿囍财";
        const year = new Date().getFullYear();
        specialChars += year;
        if (specialChars.includes(this.text)) {
            context.fillStyle = "#0aff0a";
        }
        else {
            context.fillStyle = gradient;
        }
        // .fillText(text, x, y)
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);

        // use random() > a percent to introduce randomness for reset y position
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasWidth, canvasHeight) {
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fontSize = 18;
        this.columns = this.canvasWidth / this.fontSize
        this.symbols = [];
        this.#initialize();

    }
    // private method to initialize array of symbols
    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
        }
    }
    resize(width, height) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        // recalculate how many columns can fit on screen after resizing
        this.columns = this.canvasWidth / this.fontSize;
        this.symbols = [];
        // reinitialize
        this.#initialize();
    }
}


const effect = new Effect(canvas.width, canvas.height)


let lastTime = 0;// initially 0
const fps = 60;// frames per sec
const nextFrame = 1000 / fps // see how many milisec each frame is
let timer = 0;

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp; // remember last time
    if (timer > nextFrame) {
        // draw semi transparent rectangle
        ctx.fillStyle = 'rgba(0, 0, 0, 0.09)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.textAlign = 'center';
        // ctx.fillStyle = '#0aff0a';
        ctx.font = effect.fontSize + 'px monospace';
        effect.symbols.forEach(symbol => symbol.randomlyDraw(ctx));
        timer = 0;
    } else {
        timer += deltaTime;
    }
    requestAnimationFrame(animate);
}

animate(0)

// resize event listener
window.addEventListener('resize', function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    effect.resize(canvas.width, canvas.height)
});

// change title based on year
const year = new Date().getFullYear();
let titleText = document.getElementById("title").innerHTML
titleText = year + titleText;
document.getElementById("title").innerHTML = titleText;