import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Maze from "./mazebuilder-components/Maze";
import Gameplay from "./mazebuilder-components/Gameplay";

let maze = new Maze(40, 40); //changes of the maze-size have to be made in "./mazebuilder-components/Maze.css" too

ReactDOM.render(
    App(maze),
    document.getElementById('root')
);

let root = document.getElementById("root");
root.addEventListener("keydown", (event) => {
    Gameplay(maze, event);
});


