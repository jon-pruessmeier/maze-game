import './Field.css';

class Field {

    constructor(x, y){ //x and y are the positions of the field in the maze

        //creating a variable for the info-object, since template-strings are not available in JSON
        let id = `field-${x}-${y}`;
        this.algo = false; //tracks if the algorithm is actually on this field

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

    //gives back all existing neighbours of the field by recognizing the size of the maze
    getExistingNeighbours(rows, columns){
        let possibleDirections = {
            "top": true,
            "right": true,
            "bottom": true,
            "left": true
        };

        let positions = this.info.positions;
        if (positions.Y === 0){
            possibleDirections.top = false;
        }
        if (positions.X === columns - 1){
            possibleDirections.right = false;
        }
        if (positions.Y === rows - 1){
            possibleDirections.bottom = false;
        }
        if (positions.X === 0){
            possibleDirections.left = false;
        }

        return possibleDirections;
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

    getVisitedStatus(){
        return this.info.visited;
    }

    setVisited(){
        this.info.visited = true;
    }

    //This method return information about the border-style of each wall of the field-div
    getBorderStyle(){
        let wallInfo = this.info.walls;
        let top = wallInfo.top;
        let right = wallInfo.right;
        let bottom = wallInfo.bottom;
        let left = wallInfo.left;
        let borderStyle = [];

        if (top){
            borderStyle.push("solid");
        } else {
            borderStyle.push("none");
        }

        if (right){
            borderStyle.push("solid");
        } else {
            borderStyle.push("none");
        }

        if (bottom){
            borderStyle.push("solid");
        } else {
            borderStyle.push("none");
        }

        if (left){
            borderStyle.push("solid");
        } else {
            borderStyle.push("none");
        }

        return borderStyle;

    }

    //returns the div that represents the visual Field
    getDivElement() {
        let wallInfoBorders = this.getBorderStyle();
        let top = wallInfoBorders[0];
        let right = wallInfoBorders[1];
        let bottom = wallInfoBorders[2];
        let left = wallInfoBorders[3];

        let borders = {
            borderStyle: `${top} ${right} ${bottom} ${left}`,
            borderWidth: "1px"
        }

        const playerJSX = (<div id="player"></div>);
        const goalJSX = (<div id="goal"></div>);
        const emptyJSX = (<div className="empty"></div>);

        let div;
        if (this.info.containsPlayer && this.info.containsGoal){
            div = (
                <div className={`field win`} id={this.info.id} key={this.info.id} style={borders}>
                        <div id="goal">
                            <div id="player"></div>
                        </div>
                </div>
            );
        } else {
            div = (
                <div className={`field`}  id={this.info.i} key={this.info.id} style={borders}>
                    {this.info.containsPlayer ? playerJSX : emptyJSX}
                    {this.info.containsGoal ? goalJSX : emptyJSX}
                </div>
            );
        }

        return div;
    }
}

export default Field;