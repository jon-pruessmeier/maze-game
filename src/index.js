import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Maze from "./mazebuilder-components/Maze";
import Gameplay from "./gameplay-components/Gameplay";
import Visualizer from "./viusalizer-components/Visualizer";
import PlayableMaze from "./gameplay-components/PlayableMaze";

/*
let maze = new Maze(40, 40); //changes of the maze-size have to be made in "./mazebuilder-components/Maze.css" too

ReactDOM.render(
    App(maze),
    document.getElementById('root')
);

let root = document.getElementById("root");
root.addEventListener("keydown", (event) => {
    Gameplay(maze, event);
});


let number = 6;
ReactDOM.render(
    <p>{number}</p>,
    document.getElementById("root")
);
setInterval(function(){
        number++;
        ReactDOM.render(
            <p>{number}</p>,
            document.getElementById("root")
        );
}, 2000);

//visualizer.showVisualization();


let maze = new PlayableMaze(5, 5);
let element = maze.JSX;

ReactDOM.render(
    element,
    document.getElementById("root")
);
*/

let game = new Gameplay();
console.log(game.playableMaze);
game.render();
