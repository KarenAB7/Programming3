let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let fs = require("fs");

app.use(express.static("."));

app.get("/", function (req, res) {
    res.redirect("index.html");
});
server.listen(3000, () => {
    console.log("Connected");
});


function matrixGenerator(matrixSize, grassCount, grassEaterCount, predatorCount, virusCount, doctorCount) {
    let matrix = [];
    for (let i = 0; i < matrixSize; i++) {
        matrix.push([]);
        for (let j = 0; j < matrixSize; j++) {
            matrix[i].push(0);
        }
    }
    //////

    for (let i = 0; i < grassCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
        }

    }

    //////

    for (let i = 0; i < grassEaterCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
        }
    }

    /////

    for (let i = 0; i < predatorCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
        }
    }

    /////

    for (let i = 0; i < virusCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
        }
    }

    /////

    for (let i = 0; i < doctorCount; i++) {
        let x = Math.floor(Math.random() * matrixSize);
        let y = Math.floor(Math.random() * matrixSize);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
        }
    }

    /////


    return matrix;
}

matrix = matrixGenerator(40, 45, 20, 7, 1, 2);

io.sockets.emit("send matrix", matrix);

//Charecter Arrays

grassArr = [];
grassEaterArr = [];
predatorArr = [];
virusArr = [];
doctorArr = [];

//Modules

let Grass = require("./grass");
let GrassEater = require("./grassEater");
let Predator = require("./predator");
let Virus = require("./virus");
let Doctor = require("./doctor");
const { log } = require("console");

////

function createObject() {
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                let grass = new Grass(x, y);
                grassArr.push(grass);
            }
            else if (matrix[y][x] == 2) {
                let grassEater = new GrassEater(x, y);
                grassEaterArr.push(grassEater);
            }
            else if (matrix[y][x] == 3) {
                let predator = new Predator(x, y);
                predatorArr.push(predator);
            }
            else if (matrix[y][x] == 4) {
                let virus = new Virus(x, y);
                virusArr.push(virus);
            }
            else if (matrix[y][x] == 5) {
                let doctor = new Doctor(x, y);
                doctorArr.push(doctor);
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}


isWinter = false;
function game() {
    for (let i in grassArr) {
        if (isWinter == true) {
            break;
        };
        grassArr[i].mul();
    };


    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }


    for (let i in predatorArr) {
        predatorArr[i].eat();
    }

    for (let i in virusArr) {
        virusArr[i].eat();
    }

    for (let i in doctorArr) {
        doctorArr[i].medicine();
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 500);

//Statistics

let statistics = {

};

/////Button function

function addGrass() {
    for (let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix.length);
        let y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 1;
            let newGrass = new Grass(x, y);
            grassArr.push(newGrass);
        };
    };
    io.sockets.emit("send matrix", matrix);
};

function addGrassEater() {
    for (let i = 0; i < 5; i++) {
        let x = Math.floor(Math.random() * matrix.length);
        let y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 2;
            let newGrassEater = new GrassEater(x, y);
            grassEaterArr.push(newGrassEater);
        };
    };
    io.sockets.emit("send matrix", matrix);
};

function addPredator() {
    for (let i = 0; i < 5; i++) {
        let x = Math.floor(Math.random() * matrix.length);
        let y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 3;
            let newPredator = new Predator(x, y);
            predatorArr.push(newPredator);
        };
    };
    io.sockets.emit("send matrix", matrix);
};

function addVirus() {
    for (let i = 0; i < 3; i++) {
        let x = Math.floor(Math.random() * matrix.length);
        let y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 4;
            let newVirus = new Virus(x, y);
            virusArr.push(newVirus);
        };
    };
    io.sockets.emit("send matrix", matrix);
};

function addDoctor() {
    for (let i = 0; i < 3; i++) {
        let x = Math.floor(Math.random() * matrix.length);
        let y = Math.floor(Math.random() * matrix.length);
        if (matrix[y][x] == 0) {
            matrix[y][x] = 5;
            let newDoctor = new Doctor(x, y);
            doctorArr.push(newDoctor);
        };
    };
    io.sockets.emit("send matrix", matrix);
};
/////


setInterval(function () {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.virus = virusArr.length;
    statistics.doctor = doctorArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function (err) {
        // console.log("Game of life statistics");
    });
}, 500);

let weather;

function Spring() {
    weather = "spring";
    isWinter = false;
    io.sockets.emit("Spring", weather);
};

function Summer() {
    weather = "summer";
    isWinter = false;
    io.sockets.emit("Summer", weather);
};

function Autumn() {
    weather = "autumn";
    isWinter = false;
    io.sockets.emit("Autumn", weather);
};

function Winter() {
    weather = "winter";
    isWinter = true;
    io.sockets.emit("Winter", weather);
};
///// Boom button functions

function boom() {
    let x = Math.floor(Math.random() * matrix.length);
    let y = Math.floor(Math.random() * matrix.length);
    let directions = [
        [x - 2, y - 2],
        [x - 1, y - 2],
        [x, y - 2],
        [x + 1, y - 2],
        [x + 2, y - 2],
        //
        [x - 2, y],
        [x - 1, y],
        [x + 1, y],
        [x + 2, y],
        //
        [x - 2, y + 2],
        [x - 1, y + 2],
        [x, y + 2],
        [x + 1, y + 2],
        [x + 2, y + 2]
        //
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1]
        //
    ];
    for (let i in directions) {
        if (matrix[directions[i][1]][directions[i][0]] != 0) {
            if (matrix[directions[i][1]][directions[i][0]] = 1) {
                for (let j in grassArr) {
                    if (directions[i][1] == grassArr[j].x && directions[i][0] == grassArr[j].y) {
                        grassArr.splice(i, 1);
                        break;
                    }
                };
            } 
            else if (matrix[directions[i][1]][directions[i][0]] = 2) {
                for (let j in grassEaterArr) {
                    if (directions[i][1] == grassEaterArr[j].x && directions[i][0] == grassEaterArr[j].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                };
            }
            else if (matrix[directions[i][1]][directions[i][0]] = 3) {
                for (let j in predatorArr) {
                    if (directions[i][1] == predatorArr[j].x && directions[i][0] == predatorArr[j].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                };
            }
            else if (matrix[directions[i][1]][directions[i][0]] = 4) {
                for (let j in virusArr) {
                    if (directions[i][1] == virusArr[j].x && directions[i][0] == virusArr[j].y) {
                        virusArr.splice(i, 1);
                        break;
                    }
                };
            }
            else if (matrix[directions[i][1]][directions[i][0]] = 5) {
                for (let j in doctorArr) {
                    if (directions[i][1] == doctorArr[j].x && directions[i][0] == doctorArr[j].y) {
                        doctorArr.splice(i, 1);
                        break;
                    }
                };
            }
            matrix[directions[i][1]][directions[i][0]] = 0;
        };
    };
    io.sockets.emit("send matrix", matrix);
};

///////

    io.on("connection", function (socket) {
        createObject(matrix);
        socket.on("Boom", boom);
        socket.on("Spring", Spring);
        socket.on("Summer", Summer);
        socket.on("Autumn", Autumn);
        socket.on("Winter", Winter);
        socket.on("addGrass", addGrass);
        socket.on("addGrassEater", addGrassEater);
        socket.on("addPredator", addPredator);
        socket.on("addVirus", addVirus);
        socket.on("addDoctor", addDoctor);
    });
