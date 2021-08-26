import './App.css';

function App(maze) {
  return (
    <div className="App">
        {maze.getDivElement()}
    </div>
  );
}

export default App;
