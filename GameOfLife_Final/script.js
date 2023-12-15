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