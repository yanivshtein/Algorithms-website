import React, { useState, useRef } from "react";
import "./BubbleSortVisualizer.css";  // Import the CSS file

function BubbleSortVisualizer() {
  // State for the array that will be sorted and displayed
  const [array, setArray] = useState([30, 10, 50, 20, 60, 40, 70, 90, 80, 100]);

  // State for bar colors during sorting (default: blue)
  const [colors, setColors] = useState(new Array(10).fill("blue"));

  // Refs to keep track of sorting progress
  const iIndex = useRef(0);  // Outer loop index
  const jIndex = useRef(0);  // Inner loop index

  // Flags to control sorting state
  const [isRunning, setIsRunning] = useState(false);  // True if sorting is in progress
  const isStop = useRef(false);  // True if sorting is manually stopped
  const [isStopBtn, setIsStopBtn] = useState(false);  // Controls the Stop button state

  const [stopBtnText, setStopBtnText] = useState("Stop");

  // Function to generate a new random array
  const generateArray = () => {
    setArray(Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)));
    jIndex.current = 0;
    iIndex.current = 0;
    setIsRunning(false);
    isStop.current = false;
    setColors(new Array(10).fill("blue"));  // Reset all bar colors to blue
  };

  // Function to perform the Bubble Sort algorithm with animation
  const bubbleSort = async () => {
    if (isRunning) return; // Prevent multiple sorting instances
    setIsRunning(true);
    isStop.current = false; // Reset stop flag

    let arr = [...array];  // Create a copy of the array to avoid modifying state directly
    let n = arr.length;

    // Bubble Sort algorithm with visualization
    for (let i = iIndex.current; i < n - 1; i++) {
      for (let j = jIndex.current; j < n - i - 1; j++) {
        if (isStop.current) {
          setIsRunning(false);
          return;
        }
        await highlight(j, j + 1);
        if (arr[j] > arr[j + 1]) {
          await swap(arr, j, j + 1);
          setArray([...arr]);  // Update state to trigger re-render
        } else {
          await unHighlight(j, j + 1);
        }
        jIndex.current += 1;
      }
      jIndex.current = 0;
      iIndex.current += 1;
    }
    setIsRunning(false);
  };

  // Function to perform step-by-step sorting
  const stepBubbleSort = async () => {
    setIsRunning(true);
    setIsStopBtn(true);

    let arr = [...array];
    let n = arr.length;

    if (iIndex >= n - 1) return;  // Stop when sorting is complete

    await highlight(jIndex.current, jIndex.current + 1);
    if (arr[jIndex.current] > arr[jIndex.current + 1]) {
      await swap(arr, jIndex.current, jIndex.current + 1);
      setArray([...arr]);
    }
    await unHighlight(jIndex.current, jIndex.current + 1);

    // Move to next step in the algorithm
    if (jIndex.current < n - iIndex.current - 2) {
      jIndex.current += 1;
    } else {
      jIndex.current = 0;
      iIndex.current += 1;
    }

    setIsRunning(false);
    setIsStopBtn(false);
  };

  // Function to stop the sorting animation
  function stop() {
    if(!isStop.current) {
      setIsStopBtn("Continue");
      isStop.current = true;
    } else {
      setIsStopBtn("Stop");
      isStop.current = true;
      bubbleSort();
    }
    isStop.current = true;
    setIsRunning(false);
  }

  // Function to highlight two elements (yellow)
  async function highlight(i, j) {
    setColors((prevColors) => {
      let newColors = [...prevColors];
      newColors[i] = "yellow";
      newColors[j] = "yellow";
      return newColors;
    });
    await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for animation
  }

  // Function to remove highlight (back to blue)
  async function unHighlight(i, j) {
    setColors((prevColors) => {
      let newColors = [...prevColors];
      newColors[i] = "blue";
      newColors[j] = "blue";
      return newColors;
    });
  }

  // Function to swap two elements in the array with animation
  async function swap(arr, i, j) {
    setColors((prevColors) => {
      let newColors = [...prevColors];
      newColors[i] = "red";  // Red when swapping
      newColors[j] = "red";
      return newColors;
    });

    await new Promise((resolve) => setTimeout(resolve, 500));

    [arr[i], arr[j]] = [arr[j], arr[i]];  // Swap elements
    setArray([...arr]);  // Update state

    await new Promise((resolve) => setTimeout(resolve, 500));

    setColors((prevColors) => {
      let newColors = [...prevColors];
      newColors[i] = "blue";
      newColors[j] = "blue";
      return newColors;
    });
  }

  return (
    <div className="visualizer-container">
      <h2>Bubble Sort Visualization</h2>

      {/* Control Buttons */}
      <div className="button-container">
        <button onClick={generateArray} disabled={isRunning}>Generate New Array</button>
        <button onClick={bubbleSort} disabled={isRunning}>Bubble Sort</button>
        <button onClick={stop} disabled={isStopBtn}>{stopBtnText}</button>
        <button onClick={stepBubbleSort} disabled={isRunning}>Continue</button>
      </div>

      {/* Array Visualization */}
      <div className="bars-container">
        {array.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{
              height: `${value * 3}px`,  // Scale height for visibility
              backgroundColor: colors[index],  // Apply color state
            }}
          >
            {value}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BubbleSortVisualizer;
