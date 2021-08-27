import Maze from "../mazebuilder-components/Maze";
import React from "react";
import ReactDOM from "react-dom";

class PlayableMaze extends Maze{
    constructor(m, n) {
        super(m, n);
        for (let i = 0; i < this.maze.length; i++){
            for (let j = 0; j < this.maze[i].length; j++){
                if (this.maze[i][j].info.containsPlayer){
                    this.actualPlayerX = j;
                    this.actualPlayerY = i;
                }
            }
        }
        this.JSX = this.getDivElement();
    }

    handlingKey(e){
        console.log("triggered");
        switch (e.key.toLowerCase()){

            case "arrowup" || "w":
                this.play("up");
                break;

            case "arrowright" || "d":
                this.play("right");
                break;

            case "arrowdown" || "s":
                this.play("down");
                break;

            case "arrowleft" || "a":
                this.play("left");
                break;
        }
    }

    play(direction){

        let x = this.actualPlayerX;
        let y = this.actualPlayerY;
        let walls = this.maze[y][x].info.walls;

        if(direction === "up"){
            if(y > 0 && walls.top === false){
                console.log("up");
                this.maze[y][x].changePlayer();
                this.maze[y-1][x].changePlayer();
                this.actualPlayerY = y-1;
            }
        } else if (direction === "right") {
            if (x < this.columns - 1 && walls.right === false) {
                console.log("right");
                this.maze[y][x].changePlayer();
                this.maze[y][x+1].changePlayer();
                this.actualPlayerX = x + 1;
            }


        } else if (direction === "down") {
            if (y < this.rows - 1 && walls.bottom === false) {
                console.log("down");
                this.maze[y][x].changePlayer();
                this.maze[y + 1][x].changePlayer();
                this.actualPlayerY = y + 1;
            }

        } else if (direction === "left") {
            if (x > 0 && walls.top === false) {
                console.log("left");
                this.maze[y][x].changePlayer();
                this.maze[y][x - 1].changePlayer();
                this.actualPlayerX = x - 1;
            }

        }

        this.JSX = this.getDivElement();
        ReactDOM.render(
            this.JSX,
            document.getElementById("root")
        );
    }


    createJSXElement(){
        let mazeJSX;
        let elementsJSX = [];
        for (let i = 0; i < this.maze.length; i++){
            for (let j = 0; j < this.maze[i].length; j++){
                elementsJSX.push(this.maze[i][j].getDivElement());
            }
        }

        mazeJSX = (
            <div id="maze" key={"playableMaze"}>
                {elementsJSX}
            </div>
        );

        return mazeJSX;

    }

    getDivElement(){
        return this.createJSXElement();
    }


}

export default PlayableMaze;