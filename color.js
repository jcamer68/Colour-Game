var squareNum = 6;
var colors = generateColors(squareNum);
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var chosen = pickColor();
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var resetButton = document.querySelector("#reset");
var easy = document.querySelector("#easy");
var hard = document.querySelector("#hard");
var Hscore = document.querySelector("#high");
var score = document.querySelector("#score");

var win = false;
var lose = false;
var current = 0;
var Hcurrent = 0;
var change = true;

easy.addEventListener("click", function() {
    easy.classList.add("selected");
    hard.classList.remove("selected");
    squareNum = 3;
    colors = generateColors(squareNum);
    console.log(colors);
    chosen = pickColor();
    colorDisplay.textContent = chosen;
    for (var i = 0; i < squares.length; i++) {
        if (colors[i]) {
            squares[i].style.backgroundColor = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
});


hard.addEventListener("click", function() {
    hard.classList.add("selected");
    easy.classList.remove("selected");
    squareNum = 6;
    colors = generateColors(squareNum);
        console.log(colors);
        chosen = pickColor();
        colorDisplay.textContent = chosen;

        for (var i = 0; i < squares.length; i++) {
                squares[i].style.backgroundColor = colors[i];
                squares[i].style.display = "block";
        }
});

resetButton.addEventListener("click", function() {
    //generate new colors
    colors = generateColors(squareNum);
    //pick new random colors
    chosen = pickColor();
    //change colors of squares
    colorDisplay.textContent = chosen;
    resetButton.textContent = "New Colors"
    messageDisplay.textContent = "";
    change = true;


    for (var i=0; i < colors.length; i++) {
        //add initial colors to squares
        squares[i].style.backgroundColor = colors[i];
    }
    h1.style.backgroundColor = "steelblue";
});

function scoreUpdate(win) {
    if (win && change) {
            current++;
            win = false;
            change = false;
            score.textContent = "S: " + current;
            if (current > Hcurrent) {
                Hscore.textContent = "H: " + current;
                Hcurrent = current;
            }
        }
}

function scoreReset(lose) {
    if (lose) {
            current = 0;
            lose = false;
            score.textContent = "S: " + current;
        }
}

colorDisplay.textContent = chosen;

for (var i=0; i < colors.length; i++) {
    //add initial colors to squares
    squares[i].style.backgroundColor = colors[i];

    squares[i].addEventListener("click", function() {
        var clicked = this.style.backgroundColor;

        if (clicked === chosen) {
            messageDisplay.textContent = "Correct!";
            changeColors(chosen);
            resetButton.textContent = "Play Again?"
            h1.style.backgroundColor = chosen;
            win = true;
            scoreUpdate(win, change);

        } else {
            this.style.backgroundColor = "#232323";
            messageDisplay.textContent = "Try Again";
            lose = true;
            scoreReset(lose);
        }
    });
}

function changeColors(color) {
    //loop through all squares
    for (var i = 0; i < colors.length; i++) {
        squares[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateColors(num) {
    //make an array
    //add num random colors to array
    //return array
    var arr = [];

    for (var i = 0; i<num; i++) {
        arr.push(randomColor());
    }

    return arr;
}

function randomColor() {
    //pick a red
    var r = Math.floor(Math.random() * 256)
    //pick a green
    var g = Math.floor(Math.random() * 256)
    //pick a blue
    var b = Math.floor(Math.random() * 256)
    return "rgb(" + r + ", " + g + ", " + b + ")";

}