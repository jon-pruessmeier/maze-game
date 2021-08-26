import './App.css';
import Maze from "./maze-components/Maze";

function App() {
  let maze = new Maze(5, 5);
  return (
    <div className="App">
        {maze.getDivElement()}
    </div>
  );
}

export default App;
