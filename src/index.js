import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Maze from "./mazebuilder-components/Maze";
import GameScreen from "./gameplay-components/GameScreen";
import VisualizeScreen from "./viusalizer-components/VisualizeScreen";

/*
let game = new GameScreen();

game.render();
console.log(game.playableMaze);
if (game.playableMaze ===  undefined){
    console.log("true");
}
console.log(game);
*/

let visualization = new VisualizeScreen();
console.log(visualization.arrayJSX[visualization.arrayJSX - 1]);
ReactDOM.render(
    visualization.arrayJSX[visualization.arrayJSX - 1],
    document.getElementById("root")
);

