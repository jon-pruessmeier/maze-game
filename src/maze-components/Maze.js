import Field from './Field.js'
import './Maze.css'

/*
This function returns a random element of an array.
Since often times the arrays used in the Maze-class (especially those for tracking directions) are very short (1-4 elements),
the randomness of an element will be supported by shuffling the array first.
 */
const getRandomElementArray = (array) => {
    /*
    //shuffles the array in order to the Fisher-Yates Algorithm
    //credits: https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
    for(let i = array.length—1; i > 0; i--){
        const j = Math.floor(Math.random() * i)
        const temp = array[i]
        array[i] = array[j]
        array[j] = temp
    } */
    return array[Math.floor(Math.random()*this.length)];
}

const antiDirections = {
    "top": "bottom",
    "right": "left",
    "bottom": "top",
    "left": "right"
}

class Maze {

    createMaze(){
        this.moveFieldAlgorithm(this.maze[0][0]); //starting the algorithm with the field in the top-left of the maze

        //This code-block assigns a random field in the maze as the field with the player on it.
        let randomRowIndex = Math.floor(Math.random()*this.rows);
        let randomColumnIndex = Math.floor(Math.random()*this.columns);
        this.maze[randomRowIndex][randomColumnIndex].changePlayer();

        //This code-block assigns a random field in the maze as the field with the goal on it.
        randomRowIndex = Math.floor(Math.random()*this.rows);
        randomColumnIndex = Math.floor(Math.random()*this.columns);
        this.maze[randomRowIndex][randomColumnIndex].changeGoal();

    }

    constructor(m, n) {

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

        //tracks the number of all fields in the maze and gets decremented by every visited field by the algorithm
        //this variable is the termination condition of the recursion in the moveFieldAlgorithm-method
        this.counterUnvisitedFields = this.rows * this.columns;

        //this.createMaze();

        for(let i = 0; i < this.maze.length; i++){
            for (let j = 0; j < this.maze[i].length; j++){
                console.log(`Koordinaten: X = ${this.maze[i][j].info.positions.X} und Y = ${this.maze[i][j].info.positions.Y}`);
            }
        }

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
        let x = field.info.positions.X;
        let y = field.info.positions.Y;
        if (movableDirections.top){
            if (!this.maze[y-1][x].getVisitedStatus()){
                movableDirections.top = false;
            }
        }
        if (movableDirections.right){
            if (!this.maze[y][x+1].getVisitedStatus()){
                movableDirections.right = false;
            }
        }
        if (movableDirections.bottom){
            if (!this.maze[y+1][x].getVisitedStatus()){
                movableDirections.bottom = false;
            }
        }
        if (movableDirections.left){
            if (!this.maze[y][x-1].getVisitedStatus()){
                movableDirections.left = false;
            }
        }
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


    //accepts a direction and a field and returns an array with the coordinates (format [x, y]) of the neighbouring field
    getNewCoordinates(direction, actualField){
        let x = actualField.info.positions.x;
        let y = actualField.info.positions.y;
        if (direction === "top"){
            return [y-1, x];
        } else if (direction === "right"){
            return [y, x+1];
        } else if (direction === "bottom"){
            return [y+1, x];
        } else if (direction === "left"){
            return  [y, x-1];
        }
    }


    /*
    This method is the heart of the maze-generation. It takes a field as parameter, chooses a next field by randomness,
    deletes the wall between the actual and the next field and then visits the next field by recursion. If the field has no visitable
    neighbours, it returns to the last visited field until a field has a visitable neighbour. The recursion of this method stops when
    the counterUnvisitedFields-variable of the Maze-class is zero, because then the creation of the maze has finished.
     */

    moveFieldAlgorithm(field){
        if (field.info.visited){
            field.setVisited();
            this.counterUnvisitedFields--;
        }


        //creating the variable movableDirections that keeps track of every possible direction
        //(by regarding the visited-status of neighbouring fields and IndexOutOfBoundsExceptions)
        let movableDirections = field.getExistingNeighbours(this.rows, this.columns);
        movableDirections = this.getUnvisitedNeighbors(movableDirections, field);
        let counterDirections = this.countMovableDirections(movableDirections);

        if (counterDirections > 0){ //counterDirections > 0 means that this field has neighbouring fields that are possible to visit

            /*
            The following code-block generates the coordinates of the next field for the algorithm by getting a random possible direction
             */
            let directionsArray = Object.keys(movableDirections); // directions is an array that stores every available direction of the movableDirection-object
            let direction = getRandomElementArray(directionsArray);
            let nextFieldCoordinates = this.getNewCoordinates(direction, field);
            let nextFieldX = nextFieldCoordinates[0];
            let nextFieldY = nextFieldCoordinates[1];

            /*
            The following code-block actualizes the wall-info of the actual and the next field in order to delete the existing wall
             */
            field.info.walls.direction = false;
            let antiDirection = antiDirections.direction;
            this.maze[nextFieldY][nextFieldX].info.walls.antiDirection = false;
            let coordinatesActualField = [field.info.positions.X, field.info.positions.Y];
            this.lastFieldsCoordinates.push(coordinatesActualField); //saving the actual coordinates or the backtracking algorithm

            if (this.counterUnvisitedFields > 0){
                this.moveFieldAlgorithm(this.maze[nextFieldY][nextFieldX]);
            }


        } else {
            let coordinatesLastField = this.lastFieldsCoordinates.shift(); //array with the format [x,y]
            //returning back to the last visited fields until one has 1 or more possible neighbouring field
            this.moveFieldAlgorithm(this.maze[coordinatesLastField[1]][coordinatesLastField[0]]);
        }



    }




    getDivElement(){
        return this.mazeJSX;
    }
}

export default Maze;