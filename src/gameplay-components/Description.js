const Description = (
        <div className={"description"} key={"description"}>
            <h2>The Maze Game by Jón Prüßmeier</h2>
            <h4>About the Game:</h4>
            <p>The player (green field) and the goal (red field) start on random fields. Using the arrow buttons,
                the player can be moved inside the maze.
                Have fun!
            </p>
            <h4>About the Algorithm of the Maze-creation:</h4>
            <p>
                The maze-generating algorithm is a backtracking algorithm that uses recursion.
                This algorithm is used for heuristic problem solving and is based on the trial and error principle.
            </p>
            <p>
                The maze starts as a grid and each square has walls on all sides.
                The algorithm starts in the top-left field and now switches to a random adjacent and visitable field.
                Each field stores whether it has already been visited and whether the algorithm has changed anything in the wall properties.
                If the algorithm encounters a field which is surrounded only by already visited fields,
                it steps back the last visited fields until a field has at least one unvisited adjacent field again.
                This is how the dead ends in the maze are created. The termination condition of the recursion is a counter of all unvisited fields.
            </p>
        </div>

);

export default Description;