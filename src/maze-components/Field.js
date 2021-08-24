import './Field.css'


//This function is used in the constructor-method for the initialization of the isWall-variable. It returns a boolean-value based on randomness.
const randomWall = () => {
    let random= Math.random();
    if (random < 0.5){
        return true;
    } else {
        return false;
    }
};

//Both variables are used for the className of the div inside the Field-Class. They are important for the styling in the CSS.
const isWallClassName = 'wallDiv'; //specifies the CSS-properties for Fields that are walls
const isNotWallClassName = 'notWallDiv'; //specifies the CSS-properties for Fields that aren't walls

//returns true, if he Field is a wall
const getDivClassName = (wall) => {
    if (wall){
        return isWallClassName;
    } else {
        return isNotWallClassName;
    }
};
/*
const playerJSX = <p>😁</p>;
const goalJSX = <p>🔥</p>;

const createFieldJSX = (wall, player, goal) => {
    if (wall){

}
*/

class Field {

    constructor(){
        this.isWall = randomWall(); //describes, if the Field contains a Wall or not
        this.containsGoal = false; //describes, if the Goal is actually on this Field
        this.containsPlayer = false; //describes, if the Player is actually on this Field
        this.wallClassName = getDivClassName(this.isWall); //used for the className of the div
    };

    //returns the div that represents the visual Field
    getDivElement() {
        return (
            <div className={`block-div ${this.wallClassName}`}>
            </div>
        );
    };

};

export default Field;