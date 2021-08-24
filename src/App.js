import './App.css';
import Maze from "./maze-components/Maze";

function App() {
  let maze = new Maze(40, 40);
  return (
    <div className="App">
        {maze.getDivElement()}
    </div>
  );
}

export default App;
