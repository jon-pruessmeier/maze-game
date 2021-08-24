import Field from './Field.js'
import './Maze.css'


//adds n-times a Field into an array that represents the rows in the maze
//the parameter n represents the number of elements in the row and therefore the number columns
//this function enables to use a 2D-Array within the Maze-class though JavaScript does not provide a 2D-Array
function createRow(n){
    let arr = [];
    for (let i = 0; i < n; i++){
        arr.push(new Field(i, n));
    }
    return arr;
}


class Maze {
    constructor(m, n) {
        this.rows = m; //number of rows in the Maze (and the number of arrays in this.fields)
        this.columns = n; //number of columns in the Maze (and the number of elements in a subarray of this.fields)
        this.maze = []; //array that contains subarrays with Fields; it is the array which samples the Fields to a maze



        for (let i = 0; i < this.rows; i++) {
            let row = createRow(this.columns);
            this.maze.push(row);
            /* for (let j = 0; j < row.length; j++) {
                this.allFieldsJSX.push(row[j].getDivElement());
            } */
        }
        /*

        /*
        This code-block assigns a random field in the maze as the field with the player on it.
        Since JavaScript does not provide 2d arrays, the field has to be saved in a local variable with intermediate steps.
        After that, the original variable has to be replaced with the local variable.
        This also happens with intermediate steps.
         */
        /*

        <---HIER IST IRGENDWO EIN FEHLER!!!--->
        let randomRowIndex = Math.floor(Math.random()*this.rows.length);
        let randomColumnIndex = Math.floor(Math.random()*this.columns.length);
        let randomRow = this.maze[randomRowIndex];
        let randomField = randomRow[randomColumnIndex];
        randomField.info.containsPlayer = true;
        randomRow[randomColumnIndex] = randomField;
        this.maze[randomRowIndex] = randomRow;
         */

        /*
        This code-block does the same as the block above just for the assignment of the goal in the maze.
         */

        /*
        randomRowIndex = Math.floor(Math.random()*this.rows.length);
        randomColumnIndex = Math.floor(Math.random()*this.columns.length);
        randomRow = this.maze[randomRowIndex];
        randomField = randomRow[randomColumnIndex];
        randomField.info.containsGoal = true;
        randomRow[randomColumnIndex] = randomField;
        this.maze[randomRowIndex] = randomRow;
         */


        this.allFieldsJSX=[]; //contains all fields of all subarrays
        for (let i = 0; i < this.maze.length; i++){
            let actualRow = this.maze[i];
            for (let j = 0; j < actualRow.length; j++){
                this.allFieldsJSX.push(actualRow[j].getDivElement());
            }
        }


        this.mazeJSX = (
            <div id="maze">
                {this.allFieldsJSX}
            </div>
        );

    }

    getDivElement(){
        return this.mazeJSX;
    }
}

export default Maze;