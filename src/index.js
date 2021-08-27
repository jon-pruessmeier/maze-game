import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Maze from "./mazebuilder-components/Maze";
import Gameplay from "./gameplay-components/Gameplay";

let game = new Gameplay();

game.render();
console.log(game.playableMaze);
if (game.playableMaze ===  undefined){
    console.log("true");
}
console.log(game);

