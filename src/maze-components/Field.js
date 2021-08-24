import './Field.css'
/*
const playerJSX = <p>😁</p>;
const goalJSX = <p>🔥</p>;

const createFieldJSX = (wall, player, goal) => {
    if (wall){

}
*/

const playerJSX = <div id="player"></div>;
const goalJSX = <div id="goal"></div>;
const emptyJSX = <div className="empty"></div>;

class Field {

    constructor(x, y){ //x and y are the positions of the field in the maze

        //creating a variable for the info-object, since template-strings are not available in JSON
        let id = `field-${x}-${y}`;

        //object with every important information about the field
        //the constructor sets the default values for all containing information
        this.info = {
            //contains information about the surrounding walls of the field
            "walls": {
                "top": true,
                "right": true,
                "bottom": true,
                "left": true
            },
            "visited": false, //if this field was visited by the maze-generating-algorithm
            "positions": {
                "X": x, //x-Position of the field in the maze (starting with 0 on the left)
                "Y": y  //y-Position of the field in the maze (starting with 0 at the top)
            },
            "containsPlayer": false, //if the player is on this field
            "containsGoal": false, //if the goal is on this field
            "id": id // Format: field-X-Y (e.g. "field-5-9") like in the first line of the constructor
        };
    };

    getWallInfo(){
        return this.info.walls;
    };


    //actualizes the border-style-properties of the field by checking the boolean-values in the walls-object in this.info
    actualizeWalls(){
        let walls = this.info.walls;
        let fieldCSS = document.getElementById(this.info.id);

        if (!walls.top){
            fieldCSS.style.borderTopStyle = "none";
        } else {
            fieldCSS.style.borderTopStyle = "solid";
        }

        if (!walls.right){
            fieldCSS.style.borderRightStyle = "none";
        } else {
            fieldCSS.style.borderRightStyle = "solid";
        }

        if (!walls.bottom){
            fieldCSS.style.borderBottomStyle = "none";
        } else {
            fieldCSS.style.borderBottomStyle = "solid";
        }

        if (!walls.left){
            fieldCSS.style.borderLeftStyle = "none";
        } else {
            fieldCSS.style.borderLeftStyle = "solid";
        }
    };

    changePlayer(){
        if(this.info.containsPlayer){
            this.info.containsPlayer = false;
        } else {
            this.info.containsPlayer = true;
        }
    }

    changeGoal(){
        if(this.info.containsGoal){
            this.info.containsGoal = false;
        } else {
            this.info.containsGoal = true;
        }
    }


    //returns the div that represents the visual Field
    getDivElement() {
        return (
        <div className={`field`} id={this.info.id}>
            {this.info.containsPlayer ? playerJSX : emptyJSX}
            {this.info.containsGoal ? goalJSX : emptyJSX}
        </div>
        );
    }
}

export default Field;