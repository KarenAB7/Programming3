let LivingCreature = require("./LivingCreature");

module.exports = class Virus extends LivingCreature {
    constructor(x, y) {
        super(x,y);
        this.energy = 1;
        this.directions = [];
    }


    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }


    chooseCell(char1, char2, char3) {
        this.getNewCoordinates();
        let found = [];
        for (let i in this.directions) {
            let x = this.directions[i][0];
            let y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == char1) {
                    found.push(this.directions[i]);
                }
                if (matrix[y][x] == char2) {
                    found.push(this.directions[i]);
                }
                if (matrix[y][x] == char3) {
                    found.push(this.directions[i]);
                }
            }

        }
        return found;
    }



    mul() {
        let emptyCells = this.chooseCell(1, 2, 3);
        for (let i in emptyCells) {
            if (emptyCells) {
                let newX = emptyCells[i][0];
                let newY = emptyCells[i][1];
                matrix[newY][newX] = 4;
                let virus = new Virus(newX, newY);
                virusArr.push(virus);

                for (let i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);

                    }
                }
                for (let i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        break;
                    }
                }
                for (let i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        break;
                    }
                }
            }
        }
    }


    eat() {
        let foods = this.chooseCell(1, 2, 3);

        for (let i in foods) {
            if (foods) {
                this.energy++;

                let newX = foods[i][0];
                let newY = foods[i][1];



                matrix[newY][newX] = 4;
                matrix[this.y][this.x] = 4;
                for (let i in grassArr) {
                    if (newX == grassArr[i].x && newY == grassArr[i].y) {
                        grassArr.splice(i, 1);

                    }
                }
                for (let i in grassEaterArr) {
                    if (newX == grassEaterArr[i].x && newY == grassEaterArr[i].y) {
                        grassEaterArr.splice(i, 1);
                        
                    }
                }
                for (let i in predatorArr) {
                    if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                        predatorArr.splice(i, 1);
                        
                    }
                }


                this.x = newX;
                this.y = newY;

                if (this.energy >= 2) {
                    this.mul();
                    this.energy = 1;
                }
            }
        }


    }

}