let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io")(server);
let fs = require("fs");

app.use(express.static("."));

app.get("/", function(req,res) {
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
            else if(matrix[y][x] == 4) {
                let virus = new Virus(x,y);
                virusArr.push(virus);
            }
            else if (matrix[y][x] == 5) {
                let doctor = new Doctor(x,y);
                doctorArr.push(doctor);
            }
        }
    }
    io.sockets.emit("send matrix", matrix);
}


function game() {

    for (let i in grassArr) {
         
            grassArr[i].mul();
               
    }


    for (let i in grassEaterArr) {
        grassEaterArr[i].eat();
    }

    
    for (let i in predatorArr) {
        predatorArr[i].eat();
    }

    for (let i in virusArr) {
        virusArr[i].eat();    
    }

    for(let i in doctorArr) {
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
    for(let i = 0; i < 7; i++) {
        let x = Math.floor(Math.random() * matrix.length);
        let y = Math.floor(Math.random() * matrix.length);
        if(matrix[y][x] == 0) {
            matrix[y][x] = 1;
            let newGrass = new Grass(x,y);
            grassArr.push(newGrass);
        };
    };
    io.sockets.emit("send matrix", matrix);
};

function addGrassEater() {
    for(let i = 0; i < 5; i++) {
        let x = Math.floor(Math.random() * matrix.length);
        let y = Math.floor(Math.random() * matrix.length);
        if(matrix[y][x] == 0) {
            matrix[y][x] = 2;
            let newGrassEater = new GrassEater(x,y);
            grassEaterArr.push(newGrassEater);
        };
    };
    io.sockets.emit("send matrix", matrix);
};

function addPredator() {
    for(let i = 0; i < 5; i++) {
        let x = Math.floor(Math.random() * matrix.length);
        let y = Math.floor(Math.random() * matrix.length);
        if(matrix[y][x] == 0) {
            matrix[y][x] = 3;
            let newPredator = new Predator(x,y);
            predatorArr.push(newPredator);
        };
    };
    io.sockets.emit("send matrix", matrix);
};

function addVirus() {
    for(let i = 0; i < 3; i++) {
        let x = Math.floor(Math.random() * matrix.length);
        let y = Math.floor(Math.random() * matrix.length);
        if(matrix[y][x] == 0) {
            matrix[y][x] = 3;
            let newVirus = new Virus(x,y);
            virusArr.push(newVirus);
        };
    };
    io.sockets.emit("send matrix", matrix);
};

function addDoctor() {
    for(let i = 0; i < 3; i++) {
        let x = Math.floor(Math.random() * matrix.length);
        let y = Math.floor(Math.random() * matrix.length);
        if(matrix[y][x] == 0) {
            matrix[y][x] = 3;
            let newDoctor = new Doctor(x,y);
            doctorArr.push(newDoctor);
        };
    };
    io.sockets.emit("send matrix", matrix);
};
/////


setInterval(function() {
    statistics.grass = grassArr.length;
    statistics.grassEater = grassEaterArr.length;
    statistics.predator = predatorArr.length;
    statistics.virus = virusArr.length;
    statistics.doctor = doctorArr.length;
    fs.writeFile("statistics.json", JSON.stringify(statistics), function(err) {
        // console.log("Game of life statistics");
    });
}, 500);

 let weather;

function Spring() {
    weather = "spring";
    io.sockets.emit("Spring", weather);
};

function Summer() {
    weather = "summer";
    io.sockets.emit("Summer", weather);
};

function Autumn() {
    weather = "autumn";
    io.sockets.emit("Autumn", weather);
};

function Winter() {
    weather = "winter";
    io.sockets.emit("Winter", weather);
};

io.on("connection", function(socket) {
    createObject(matrix);
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
