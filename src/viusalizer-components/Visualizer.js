import PartialMaze from "./PartialMaze";
import * as ReactDOM from "react-dom";

class Visualizer{
    constructor(m, n) {
        this.partialMazeArray = [];
        let partialMaze = new PartialMaze(m, n, true);
        partialMaze.maze[0][0].algo = true;

        this.partialMazeArray.push(partialMaze);

        let isWorking = true;
        let newCoordinates = partialMaze.moveFieldAlgorithm(partialMaze.maze[0][0], null);

        while (isWorking){
            console.log("Jippie");
            let newPartialMaze = this.partialMazeArray[this.partialMazeArray.length-1]; //duplicate of the last PartialMaze in the Array
            let coordinatesLastField = newCoordinates[1];
            let coordinatesNextField = newCoordinates[0];

            newCoordinates = newPartialMaze.moveFieldAlgorithm(newPartialMaze.maze[coordinatesNextField[1]][coordinatesNextField[0]],
                                                                newPartialMaze.maze[coordinatesLastField[1]][coordinatesLastField[0]] );
            this.partialMazeArray.push(newPartialMaze);
            if (newCoordinates === null){
                isWorking = false;
            }

        }

        console.log(this.partialMazeArray);

    }

    showVisualization(){
        let length = this.partialMazeArray.length;
        for (let i = 0; i < length; i++){
            setTimeout( function (){
                ReactDOM.render(
                    this.partialMazeArray[i].getDivElement(),
                    document.getElementById("root")
                )
                }, 2000
            );
        }
    }

}

export default Visualizer;