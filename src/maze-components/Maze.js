import Field from './Field.js'
import './Maze.css'

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

class Maze {

    constructor(m, n) {
        this.z = 1;

        this.rows = m;
        this.columns = n;

        this.maze = new Array(m);
        for (let i = 0; i < m; i++) {
            this.maze[i] = new Array(n);
        }
        for (let i = 0; i < m; i++){
            for (let j = 0; j < n; j++){
                this.maze[i][j] = new Field(j, i); //j is the x-Position, i is the y-Position
            }
        }
        //tracks the coordinates of the last visited fields
        //is used as a stack with the push- and shift-methods
        this.lastFieldsCoordinates = [];

        this.createMaze();

        /*
        //This code-block assigns a random field in the maze as the field with the player on it.
        let randomRowIndex = Math.floor(Math.random()*this.rows);
        let randomColumnIndex = Math.floor(Math.random()*this.columns);
        this.maze[randomRowIndex][randomColumnIndex].changePlayer();

        //This code-block assigns a random field in the maze as the field with the goal on it.
        randomRowIndex = Math.floor(Math.random()*this.rows);
        randomColumnIndex = Math.floor(Math.random()*this.columns);
        this.maze[randomRowIndex][randomColumnIndex].changeGoal();
        */
        this.allFieldsJSX = [];
        for (let i = 0; i < this.maze.length; i++){
            for (let j = 0; j < this.maze[i].length; j++){
                this.allFieldsJSX.push(this.maze[i][j].getDivElement());
            }
        }

        this.mazeJSX = (
            <div id="maze">
                {this.allFieldsJSX}
            </div>
        );

    }


    //modifies an object of directions that are movable (= they would not cause an IndexOutOufBoundsException) to an object
    //containing additional information about neighbours that are unvisited
    getUnvisitedNeighbors(movableDirections, field){
        console.log("Vor getUnvistedNeighbors: ");
        console.log(movableDirections);
        let x = field.info.positions.X;
        let y = field.info.positions.Y;
        if (movableDirections.top){
            if (this.maze[y-1][x].getVisitedStatus()){
                movableDirections.top = false;
            }
        }
        if (movableDirections.right){
            if (this.maze[y][x+1].getVisitedStatus()){
                movableDirections.right = false;
            }
        }
        if (movableDirections.bottom){
            if (this.maze[y+1][x].getVisitedStatus()){
                movableDirections.bottom = false;
            }
        }
        if (movableDirections.left){
            if (this.maze[y][x-1].getVisitedStatus()){
                movableDirections.left = false;
            }
        }
        console.log("Nach getUnvisitedNeighbours:");
        console.log(movableDirections);
        return movableDirections;
    }

    countMovableDirections(movableDirections){
        let counter = 0;
        if (movableDirections.top){
            counter++;
        }
        if (movableDirections.right){
            counter++;
        }
        if (movableDirections.bottom){
            counter++;
        }
        if (movableDirections.left){
            counter++;
        }
        return counter++;
    }

    getDirectionsArray(movableDirections){
        let arr = []
        if (movableDirections.top){
            arr.push("top");
        }
        if (movableDirections.right){
            arr.push("right");
        }
        if (movableDirections.bottom){
            arr.push("bottom");
        }
        if (movableDirections.left){
            arr.push("left");
        }
        return arr;
    }

    //accepts a direction and a field and returns an array with the coordinates (format [x, y]) of the neighbouring field
    getNewCoordinates(direction, actualField){
        let x = actualField.info.positions.X;
        let y = actualField.info.positions.Y;
        if (direction === "top"){
            return [x, y-1];
        } else if (direction === "right"){
            return [x+1, y];
        } else if (direction === "bottom"){
            return [x, y+1];
        } else if (direction === "left"){
            return  [x-1, y];
        }
    }

    //deletes all walls that are destructed during the maze-creation
    deleteWalls(){
        for (let i = 0; i < this.maze.length; i++){
            for (let j = 0; j < this.maze[i].length; j++){
                this.maze[i][j].actualizeWalls();
            }
        }
    }

    createMaze(){
        //tracks the coordinates of the last visited fields
        //is used as a stack with the push- and pop-methods
        let lastFieldsCoordinates = new Array();

        //tracks the number of all fields in the maze and gets decremented by every visited field by the algorithm
        //this variable is the termination condition of the recursion in the moveFieldAlgorithm-method
        let counterUnvisitedFields = this.rows * this.columns;

        this.moveFieldAlgorithm(this.maze[0][0], lastFieldsCoordinates, counterUnvisitedFields); //starting the algorithm with the field in the top-left of the maze

        //This code-block assigns a random field in the maze as the field with the player on it.
        let randomRowIndex = Math.floor(Math.random()*this.rows);
        let randomColumnIndex = Math.floor(Math.random()*this.columns);
        this.maze[randomRowIndex][randomColumnIndex].changePlayer();

        //This code-block assigns a random field in the maze as the field with the goal on it.
        randomRowIndex = Math.floor(Math.random()*this.rows);
        randomColumnIndex = Math.floor(Math.random()*this.columns);
        this.maze[randomRowIndex][randomColumnIndex].changeGoal();

        //document.addEventListener('DOMContentLoaded', this.deleteWalls(), false);

    }


    /*
    This method is the heart of the maze-generation. It takes a field as parameter, chooses a next field by randomness,
    deletes the wall between the actual and the next field and then visits the next field by recursion. If the field has no visitable
    neighbours, it returns to the last visited field until a field has a visitable neighbour. The recursion of this method stops when
    the counterUnvisitedFields-variable of the Maze-class is zero, because then the creation of the maze has finished.
    Furthermore, it keeps track of the past fields by using the lastFieldsCoordinates-Array of the createMaze()-method and uses the counterUnvisitedFields-variable
    which is used for counting the number of remaining fields.
     */

    moveFieldAlgorithm(field, lastFieldsCoordinates, counterUnvisitedFields){
        console.log("########################################");
        console.log("Turn-number: " + counterUnvisitedFields);
        console.log(field);

        if (field.info.visited === false){
            field.setVisited();
            counterUnvisitedFields--;
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
            lastFieldsCoordinates.push(coordinatesActualField); //saving the actual coordinates or the backtracking algorithm

            console.log("Direction: " + direction);
            console.log(`NextFieldCoordinates: ${nextFieldCoordinates}`);


            //The following code-block actualizes the wall-info of the actual and the next field in order to delete the existing wall
            field.info.walls[direction] = false;
            let antiDirection = antiDirections[direction];
            console.log("Antidirection: " + antiDirection);
            this.maze[nextFieldY][nextFieldX].info.walls[antiDirection] = false;


            if (counterUnvisitedFields > 0){
                this.moveFieldAlgorithm(this.maze[nextFieldY][nextFieldX], lastFieldsCoordinates, counterUnvisitedFields);
            }


        } else {
            if (counterUnvisitedFields > 0){
                let coordinatesLastField = lastFieldsCoordinates.pop(); //array with the format [x,y]
                console.log("DEADEND!");
                //returning back to the last visited fields until one has 1 or more possible neighbouring field
                this.moveFieldAlgorithm(this.maze[coordinatesLastField[1]][coordinatesLastField[0]], lastFieldsCoordinates, counterUnvisitedFields);
            }

        }



    }
    getDivElement(){
        return this.mazeJSX;
    }
}

export default Maze;