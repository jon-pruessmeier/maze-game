import ReactDOM from "react-dom";
import React from "react";
import Description from "./Description";
import PlayableMaze from "./PlayableMaze";
import "./GameScreen.css"

import arrowUp from "./buttons/arrow_up.png";
import arrowRight from "./buttons/arrow_right.png";
import arrowDown from "./buttons/arrow_down.png";
import arrowLeft from "./buttons/arrow_left.png";

class GameScreen {

    constructor(){

        this.descriptionDiv = Description;
        this.playableMaze = new PlayableMaze(20, 20);


        this.up = (e) => {
            this.playableMaze.play("up");
            this.mazeDiv = this.playableMaze.getDivElement();
            this.render();
        }

        this.right = (e) => {
            this.playableMaze.play("right");
            this.mazeDiv = this.playableMaze.getDivElement();
            this.render();
        }

        this.down = (e) => {
            this.playableMaze.play("down");
            this.mazeDiv = this.playableMaze.getDivElement();
            this.render();
        }

        this.left = (e) => {
            this.playableMaze.play("left");
            this.mazeDiv = this.playableMaze.getDivElement();
            this.render();
        }

        this.buttonUp = <button onClick={this.up} key={"upButton"}><img src={arrowUp} className={"buttonTopDown"} alt={"arrow-up button"} /*width="70" height="105"*//></button>;
        this.buttonRight = <button onClick={this.right} key={"rightButton"}><img src={arrowRight} className={"buttonRightLeft"} alt={"arrow-right button"} /*width="70" height="105"*//></button>;
        this.buttonDown = <button onClick={this.down} key={"leftButton"}><img src={arrowDown} className={"buttonTopDown"} alt={"arrow-down button"} /*width="70" height="105"*//></button>;
        this.buttonLeft = <button onClick={this.left} key={"downButton"}><img src={arrowLeft} className={"buttonRightLeft"} alt={"arrow-left button"} /*width="70" height="105"*//></button>;
        this.navField = this.createButtonDiv();

        this.updateDiv = () => {
            this.mazeDiv = this.playableMaze.getDivElement();
            return (<div className={"gameScreen"}>
                {this.descriptionDiv}
                <div className={"mazeContainer"}>
                    {this.mazeDiv}
                </div>
                {this.navField}
            </div>)
        };

        this.elementJSX = this.updateDiv();
    }

    getDiv(){
        this.elementJSX = this.updateDiv();
        return this.elementJSX;
    }

    checkWin = () => {
        setTimeout(() => {
            //checks if the player is on the same field as the goal (then the div of the field has the additional className "win"
            let winner = document.getElementsByClassName("win");
            console.log(winner);
            console.log(winner.length);
            if (winner.length > 0) {
                let okay = window.confirm("You won! Do you want to play again?");
                if (okay){
                    this.refresh();
                }
            }
        }, 500);
    }

    createButtonDiv(){
        let div = (
            <div className = "buttonContainer">
                <div id={"leftButton"}>
                    {this.buttonLeft}
                </div>
                <div id={"upDownButton"}>
                    {this.buttonUp}
                    {this.buttonDown}
                </div>
                <div id={"rightButton"}>
                    {this.buttonRight}
                </div>
            </div>
        );
        return div;
    }

    render(){
        ReactDOM.render(
            this.getDiv(),
            document.getElementById("root")
        );
        this.checkWin();
    }

    refresh(){
        this.playableMaze = new PlayableMaze(20,20);
        this.render();
    }

}


export default GameScreen;