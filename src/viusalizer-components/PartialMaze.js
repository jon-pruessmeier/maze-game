import Maze from "../mazebuilder-components/Maze";

//This function returns a random element of an array.
const getRandomElementOfArray = (array) => {
    return array[Math.floor(Math.random()*array.length)];
}

const antiDirections = {
    "top": "bottom",
    "right": "left",
    "bottom": "top",
    "left": "right"
}

class PartialMaze extends Maze{

    constructor(m, n){
        super(m, n, true);
        this.counterUnvisitedFields = m * n;
        this.lastFieldsCoordinates = [];

    }




    moveFieldAlgorithm(field, lastField){
        field.algo = true;
        if (lastField !== null){
            lastField.algo = false;
        }


        console.log("########################################");
        console.log("Turn-number: " + this.counterUnvisitedFields);
        console.log(field);

        if (field.info.visited === false){
            field.setVisited();
            this.counterUnvisitedFields--;
        }


        //creating the variable movableDirections that keeps track of every possible direction
        //(by regarding the visited-status of neighbouring fields and IndexOutOfBoundsExceptions)
        let movableDirections = field.getExistingNeighbours(this.rows, this.columns);
        movableDirections = this.getUnvisitedNeighbors(movableDirections, field);
        let counterDirections = this.countMovableDirections(movableDirections);
        console.log("CounterDirections: " + counterDirections);

        if (counterDirections > 0){ //counterDirections > 0 means that this field has neighbouring fields that are possible to visit


            //The following code-block generates the coordinates of the next field for the algorithm by getting a random possible direction

            let directionsArray = this.getDirectionsArray(movableDirections); // directions is an array that stores every available direction of the movableDirection-object
            let direction = getRandomElementOfArray(directionsArray);
            let nextFieldCoordinates = this.getNewCoordinates(direction, field);
            let nextFieldX = nextFieldCoordinates[0];
            let nextFieldY = nextFieldCoordinates[1];
            console.log("X: " + field.info.positions.X);
            console.log("Y: " + field.info.positions.Y);

            let coordinatesActualField = [field.info.positions.X, field.info.positions.Y];
            this.lastFieldsCoordinates.push(coordinatesActualField); //saving the actual coordinates or the backtracking algorithm

            console.log("Direction: " + direction);
            console.log(`NextFieldCoordinates: ${nextFieldCoordinates}`);


            //The following code-block actualizes the wall-info of the actual and the next field in order to delete the existing wall
            field.info.walls[direction] = false;
            let antiDirection = antiDirections[direction];
            console.log("Antidirection: " + antiDirection);
            this.maze[nextFieldY][nextFieldX].info.walls[antiDirection] = false;


            if (this.counterUnvisitedFields > 0){
                return [nextFieldCoordinates, coordinatesActualField];
            } else {
                return null;
            }


        } else {
            if (this.counterUnvisitedFields > 0){
                let coordinatesLastField = this.lastFieldsCoordinates.pop(); //array with the format [x,y]
                let coordinatesActualField = [field.info.positions.X, field.info.positions.Y];
                console.log("DEADEND!");
                //returning back to the last visited fields until one has 1 or more possible neighbouring field
                return [coordinatesLastField, coordinatesActualField];
            } else {
                return null;
            }

        }
    }

}

export default PartialMaze;