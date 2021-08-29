//info: CSS-properties are defined in GameScreen.css

const Description = (
        <div className={"description"} key={"description"}  >
            <h2>The Maze Game</h2>

            <p>The player (green field) and the goal (red field) appear at random positions. Using the arrow buttons,
                the player can move inside the maze. Have fun!
            </p>
            <p>
                The maze-generating algorithm is a backtracking algorithm that uses recursion.
                This algorithm is used for heuristic problem solving and is based on the trial and error principle.
            </p>
            <p>
                The maze starts as a grid and each square has walls on all sides.
                The algorithm starts in the top-left field and now switches to a random adjacent and visitable field.
                Each field stores whether it has already been visited and whether the algorithm has changed anything within the wall properties.
                If the algorithm encounters a field which is surrounded only by already visited fields,
                it backtracks until a field is found that has at least one unvisited adjacent field.
                This is how dead ends in the maze are created. The termination condition of the recursion is a counter of all unvisited fields.
            </p>
            <p id={"link"}>
                See also:  <a href="https://en.wikipedia.org/wiki/Backtracking#:~:text=Backtracking%20is%20a%20general%20algorithm,completed%20to%20a%20valid%20solution.">
                wikipedia.org/wiki/Backtracking</a>
            </p>

        </div>

);

export default Description;
