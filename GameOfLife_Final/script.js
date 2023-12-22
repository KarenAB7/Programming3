let socket = io();

let side = 35;
// let weathers = ["Spring", "Summer", "Autumn", "Winter"];

function setup() {
    createCanvas(40 * side, 40 * side);
}

socket.on("Spring", function (data) {
    weather = data;
});

socket.on("Summer", function (data) {
    weather = data;
});

socket.on("Autumn", function (data) {
    weather = data;
});

socket.on("Winter", function (data) {
    weather = data;
});

let weather = "spring";

function nkarel(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
                  


            if (matrix[y][x] == 1) {
                if(weather == "spring") {
                    fill("#49ab81");
                }
                else if (weather == "summer") {
                    fill("#66ab4d");
                }
                else if (weather == "autumn") {
                    fill("#F3BC2E");
                }
                else if(weather == "winter") {
                    fill("#ffffff" );
                }
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

function Spring() {
    socket.emit("Spring");
};

function Summer() {
    socket.emit("Summer");
};

function Autumn() {
    socket.emit("Autumn");
};

function Winter() {
    socket.emit("Winter");
};

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

let counter = 0;

function changeWeather() {
 counter++;
    if (counter == 1) {
        let weatherBtn = document.getElementById("weatherBtn");
        weatherBtn.innerHTML = "Weather: Summer";
        weatherBtn.style.backgroundColor = "yellow";
        Summer()
    }
    else if (counter == 2) {
        let weatherBtn = document.getElementById("weatherBtn");
        weatherBtn.innerHTML = "Weather: Autumn";
        weatherBtn.style.backgroundColor = "orange";
        Autumn()
    }
    else if (counter == 3) {
        let weatherBtn = document.getElementById("weatherBtn");
        weatherBtn.innerHTML = "Weather: Winter";
        weatherBtn.style.backgroundColor = "white";
        Winter()
    }
    else if (counter > 3) {
        counter = 0;
        let weatherBtn = document.getElementById("weatherBtn");
        weatherBtn.innerHTML = "Weather: Spring";
        weatherBtn.style.backgroundColor = "lime";
        Spring()
    }
};

/////


    socket.on("send matrix", nkarel);

