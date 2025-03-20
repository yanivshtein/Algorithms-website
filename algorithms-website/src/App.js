import React from "react";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import BubbleSortVisualizer from "./BubbleSortVisualizer";
import QuickSortVisualizer from "./QuickSortVisualizer";
import "./App.css"; // Import the updated styles

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* Sidebar with animated glass effect */}
        <nav className="sidebar">
          <h2>Algorithm Visualizer</h2>
          <NavLink to="/" className="nav-link" end>
            Bubble Sort
          </NavLink>
          <NavLink to="/quicksort" className="nav-link">
            Quick Sort
          </NavLink>
        </nav>

        {/* Main content area */}
        <div className="content">
          <header className="app-header">Sorting Algorithm Simulator</header>

          {/* Routes to different sorting visualizers */}
          <Routes>
            <Route path="/" element={<BubbleSortVisualizer />} />
            <Route path="/quicksort" element={<QuickSortVisualizer />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
