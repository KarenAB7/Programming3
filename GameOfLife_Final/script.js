let side = 25;

function setup() {

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
