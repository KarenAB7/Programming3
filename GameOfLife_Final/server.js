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

let matrix = matrixGenerator(40, 45, 20, 7, 1, 2);

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

