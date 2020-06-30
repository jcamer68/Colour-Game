var squareNum = 6;
TBU = chosenColor();

var shades = document.querySelector("#contrast");
mode = true;
var colors = generateColors(squareNum, TBU[0], TBU[1], TBU[2], mode);
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

shades.addEventListener("click", function() {
    shades.classList.toggle("selected");
    if (mode == true) {
        change = true;
        mode = false;
            colors = generateColors(squareNum, TBU[0], TBU[1], TBU[2], mode);

            chosen = pickColor();
            colorDisplay.textContent = chosen;
            for (var i = 0; i < squares.length; i++) {
                if (colors[i]) {
                    squares[i].style.backgroundColor = colors[i];
                } else {
                    squares[i].style.display = "none";
                }
            }
    } else {
        change = true;
        mode = true;
            colors = generateColors(squareNum, TBU[0], TBU[1], TBU[2], mode);

            chosen = pickColor();
            colorDisplay.textContent = chosen;
            for (var i = 0; i < squares.length; i++) {
                if (colors[i]) {
                    squares[i].style.backgroundColor = colors[i];
                } else {
                    squares[i].style.display = "none";
                }
            }
    }
    console.log(mode);

});

easy.addEventListener("click", function() {
    change = true;
    easy.classList.add("selected");
    hard.classList.remove("selected");
    TBU = chosenColor();

    squareNum = 3;
    colors = generateColors(squareNum, TBU[0], TBU[1], TBU[2], mode);

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
    change = true;
    hard.classList.add("selected");
    easy.classList.remove("selected");
     TBU = chosenColor();
     console.log(TBU);
     console.log(TBU[0]);
    squareNum = 6;
    colors = generateColors(squareNum, TBU[0], TBU[1], TBU[2], mode);
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
    TBU = chosenColor();
    console.log(TBU);
    console.log(TBU[0]);
    colors = generateColors(squareNum, TBU[0], TBU[1], TBU[2], mode);
    //pick new random colors
    chosen = pickColor();
    //change colors of squares
    colorDisplay.textContent = chosen;
    resetButton.textContent = "New Set"
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

function generateColors(num, red, green, blue, mode) {
    //make an array
    //add num random colors to array
    //return array
    var arr = [];

    for (var i = 0; i<num; i++) {
        arr.push(randomColor(red, green, blue, mode));
    }

    return arr;
}

function chosenColor() {
    //pick a red
    console.log(current);
    var chosenColors = [];
    var r = Math.floor(Math.random() * 256)
    chosenColors[0] = r;
    var g = Math.floor(Math.random() * 256)
    chosenColors[1] = g;
    var b = Math.floor(Math.random() * 256)
    chosenColors[2] = b;
    return chosenColors;
}

function randomColor(red,green, blue, mode) {
    if (mode == true) {
        //pick a red
        var r = Math.floor(Math.random() * (256));

        //var r = Math.floor(Math.random() * 256)
        //pick a green
        var g = Math.floor(Math.random() * (256));

        //var g = Math.floor(Math.random() * 256)
        //pick a blue
        var b = Math.floor(Math.random() * (256));

        //var b = Math.floor(Math.random() * 256)
        return "rgb(" + r + ", " + g + ", " + b + ")";
        }
        else {
            var num = Math.floor(Math.random() * (256));
            return "rgb(" + num + ", " + num + ", " + num + ")";
        }


}