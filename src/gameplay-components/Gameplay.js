import ReactDOM from "react-dom";
import React from "react";
import Description from "./Description";
import PlayableMaze from "./PlayableMaze";
import "./Gameplay.css"

class Gameplay{

    up(){
        console.log("up");
        if(typeof this.playableMaze != undefined){
            this.playableMaze.play("up");
        }
        this.mazeDiv = this.playableMaze.getDivElement();
    }

    right(){
        console.log("right");
        if(typeof this.playableMaze != undefined){
            this.playableMaze.play("right");
        }
        this.mazeDiv = this.playableMaze.getDivElement();
    }

    down(){
        console.log("up");
        if(typeof this.playableMaze != undefined){
            this.playableMaze.play("down");
        }
        this.mazeDiv = this.playableMaze.getDivElement();
    }

    left(){
        console.log("left");
        if(typeof this.playableMaze != undefined){
            this.playableMaze.play("left");
        }
        this.mazeDiv = this.playableMaze.getDivElement();
    }


    constructor(){

        this.descriptionDiv = Description;
        this.playableMaze = new PlayableMaze(5, 5);

        this.buttonUp = <button onClick={this.up} key={"upButton"}>Up</button>;
        this.buttonRight = <button onClick={this.right} key={"rightButton"}>Right</button>;
        this.buttonDown = <button onClick={this.down} key={"leftButton"}>Down</button>;
        this.buttonLeft = <button onClick={this.left} key={"downButton"}>Left</button>;
        this.navField = (
            <div className={"navField"}>
                {this.buttonUp}
                {this.buttonLeft}
                {this.buttonRight}
                {this.buttonDown}
            </div>
        );
        this.mazeDiv = this.playableMaze.getDivElement();

        this.elementJSX = (
            <div className={"window"}>
                {this.descriptionDiv}
                {this.mazeDiv}
                {this.navField}
            </div>
        );
    }

    getDiv(){
        return this.elementJSX;
    }

    render(){
        ReactDOM.render(
            this.getDiv(),
            document.getElementById("root")
        );
    }


}


export default Gameplay;