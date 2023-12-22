let socket = io();

let side = 25;

function setup() {
    createCanvas(40 * side, 40 * side);
}

function nkarel(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
                fill("red");
            }
            else if (matrix[y][x] == 4) {
                fill("lime");
            }
            else if (matrix[y][x] == 5) {
                fill("aqua");
            }    
            else if (matrix[y][x] == 6) {
                fill("CornflowerBlue");
            }
            else {
                fill("gray");
            }
            rect(x * side, y * side, side, side);
        }
    }
}

setInterval(function() {
    socket.on("send matrix", nkarel);
}, 500);


function addGrass() {
    socket.emit("addGrass");
};

function addGrassEater() {
    socket.emit("addGrassEater");
};

function addPredator() {
    socket.emit("addPredator");
};

function addVirus() {
    socket.emit("addVirus");
};

function addDoctor() {
    socket.emit("addDoctor");
};

/////Weather

let weathers = ["Spring", "Summer", "Autumn", "Winter"];
let counter = 0;
function changeWeather() {
    counter++;
    if (counter == 1) {
        let weatherBtn = document.getElementById("weatherBtn");
        weatherBtn.innerHTML = "Weather: Summer";
        weatherBtn.style.backgroundColor = "yellow";
    }
    else if (counter == 2) {
        let weatherBtn = document.getElementById("weatherBtn");
        weatherBtn.innerHTML = "Weather: Autumn";
        weatherBtn.style.backgroundColor = "orange";
    }
    else if (counter == 3) {
        let weatherBtn = document.getElementById("weatherBtn");
        weatherBtn.innerHTML = "Weather: Winter";
        weatherBtn.style.backgroundColor = "white";
    }
    else if (counter > 3) {
        counter = 0;
        let weatherBtn = document.getElementById("weatherBtn");
        weatherBtn.innerHTML = "Weather: Spring";
        weatherBtn.style.backgroundColor = "lime";
    }
};

/////