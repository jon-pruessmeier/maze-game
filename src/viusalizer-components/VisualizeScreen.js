import Maze from "../mazebuilder-components/Maze";
import ReactDOM from 'react-dom';

class VisualizeScreen {
    

    constructor() {

        this.visualMaze = new Maze(20, 20);
        this.arrayJSX = this.visualMaze.arrayJSX;
        console.log(this.arrayJSX);

        this.doVisualization = (element) => {
            console.log(element);
            setTimeout(function (element) {
                ReactDOM.render(
                    element,
                    document.getElementById("root"));
            }, 500);
        }

        this.visualInterval = () => {
            let i = 0;
            const timer = setTimeout(
                (i) => {
                    this.doVisualization(this.arrayJSX[i])
                    i++;
                }, 500);
            if (i === this.arrayJSX.length - 1) {
                clearInterval(timer);
            }
        }

        console.log(typeof this.arrayJSX);
        let array = new Array(30);
        console.log(typeof array);


    }







}

export default VisualizeScreen;