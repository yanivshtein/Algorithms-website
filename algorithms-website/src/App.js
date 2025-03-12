import React from "react";
import SortingVisualizer from "./SortingVisualizer"; // Import the SortingVisualizer component
import './App.css'; // Keep your CSS styles if needed

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Algorithm Visualizer</h1> {/* Add your own header */}
        <SortingVisualizer /> {/* Render the SortingVisualizer component here */}
      </header>
    </div>
  );
}

export default App;
