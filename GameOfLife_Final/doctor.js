let LivingCreature = require("./LivingCreature");

module.exports = class Doctor extends LivingCreature {
    constructor(x, y) {
        super(x,y);
        this.energy = 25;
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

    chooseCell(char1, char2) {
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
            }

        }
        return found;
    }


    mul() {
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 5;
            let doctor = new Doctor(newX, newY);
            doctorArr.push(doctor);
        }
    }


    eat() {
        let foods = this.chooseCell(3);
        let food = foods[Math.floor(Math.random() * foods.length)];
        if (food) {
            this.energy += 5;

            let newX = food[0];
            let newY = food[1];

            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;


            for (let i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }

            this.x = newX;
            this.y = newY;

            if (this.energy >= 50) {
                this.mul();
            }
        }
        else {
            this.move();
        }
    }


    medicine() {
        
        let patients = this.chooseCell(4);
        let patient = patients[Math.floor(Math.random() * patients.length)];

        if (patient) {
            
            let newX = patient[0];
            let newY = patient[1];

            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 6;

            for (let i in virusArr) {
                if (newX == virusArr[i].x && newY == virusArr[i].y) {
                    virusArr.splice(i, 1);
                    break;
                }
            }

            this.x = newX;
            this.y = newY
        }
        else {
            this.eat();
        }
    }

    move() {
        this.energy -= 0.5;
        let emptyCells = this.chooseCell(0);
        let newCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        if (newCell) {
            let newX = newCell[0];
            let newY = newCell[1];
            matrix[newY][newX] = 5;
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
        if (this.energy <= 0) {
            this.die();
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (let i in doctorArr) {
            if (this.x == doctorArr[i].x && this.y == doctorArr[i].y) {
                doctorArr.splice(i, 1);
                break;
            }
        }
    }
}