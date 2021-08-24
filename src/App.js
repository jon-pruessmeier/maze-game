import './App.css';
import Maze from "./maze-components/Maze";

let maze = new Maze(75, 30);



function App() {
  return (
    <div className="App">
        {maze.getDivElement()}
    </div>
  );
}

export default App;
