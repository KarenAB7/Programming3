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

let side = 25;

let grassArr = [];

let grassEaterArr = [];

let predatorArr = [];

let virusArr = [];

let doctorArr = [];

function setup() {
    frameRate(10);
    createCanvas(matrix[0].length * side, matrix.length * side);
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
}

function draw() {
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

}

console.log("welcome prog 3");