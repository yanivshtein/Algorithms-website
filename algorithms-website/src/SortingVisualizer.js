import React, { useState, useRef } from "react";

const SortingVisualizer = () => {
  // State to hold the array of numbers we will sort and visualize
  const [array, setArray] = useState([30, 10, 50, 20, 60, 40, 70, 90, 80, 100]);  
  const [colors, setColors] = useState(new Array(10).fill("blue"));  // Default color for all bars
  const iIndex = useRef(0);  // Track outer loop index
  const jIndex = useRef(0);  // Track inner loop index
  const [isRunning, setIsRunning] = useState(false);  // If true, Bubble Sort runs automatically
  const isStop = useRef(false);  // If true, Bubble Sort runs automatically
  const [isStopBtn, setIsStopBtn] = useState(false);

  // Generate new array
  // Function to generate a new random array with 10 elements
  const generateArray = () => {
    setArray(Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)));
    jIndex.current = 0; // Reset j index
    iIndex.current = 0; // Reset j index
    setIsRunning(false);
    isStop.current = false;
    setColors(new Array(10).fill("blue"));
  };

  // Function to perform bubble sort and animate it
  const bubbleSort = async () => {
    if (isRunning) return; // Prevent multiple clicks
    setIsRunning(true);
    isStop.current = false; // ✅ Reset stop flag before starting
    let arr = [...array];  // Create a copy of the array to avoid direct mutation of the state
    let n = arr.length;    // Get the length of the array

    // Outer loop: goes through the entire array n times
    for (let i = iIndex.current; i < n - 1; i++) {
      // Inner loop: compares each pair of adjacent elements
      for (let j = jIndex.current; j < n - i - 1; j++) {
        if(isStop.current){
          setIsRunning(false);
          return;
        }
        await highlight(arr,j,j+1);
        //await waitForClick("continue"); 
        // If the current element is greater than the next, swap them
        if (arr[j] > arr[j + 1]) {
          // Swap elements using destructuring assignment
          await swap(arr,j,j+1);

          // Update the state with the new array to trigger a re-render
          setArray([...arr]);

          // Add a delay for the animation (200ms here)
          //await waitForClick("continue");
        } else{
          await unHighlight(arr,j,j+1);
          //await waitForClick("continue");
        }
        jIndex.current += 1;
      }
      jIndex.current = 0;
      iIndex.current += 1;
    }
    setIsRunning(false);
  };

  // Step-by-step sorting
  const stepBubbleSort = async () => {
    setIsRunning(true);
    setIsStopBtn(true);
    let arr = [...array];
    let n = arr.length;

    if (iIndex >= n - 1) return; // Stop if sorting is finished

    await highlight(arr,jIndex.current, jIndex.current + 1);
    if (arr[jIndex.current] > arr[jIndex.current + 1]) {
      await swap(arr, jIndex.current, jIndex.current + 1);
      setArray([...arr]);
    }
    await unHighlight(arr,jIndex.current, jIndex.current + 1);

    // Move to next step
    if (jIndex.current < n - iIndex.current - 2) {
      jIndex.current += 1;
    } else {
      jIndex.current = 0;
      iIndex.current += 1;
    }
    setIsRunning(false);
    setIsStopBtn(false);
    };
  
  function stop(){
    isStop.current = true; // ✅ Immediately stop sorting
    setIsRunning(false);
  }

async function highlight(arr, i, j) {
  setColors((prevColors) => {
    let newColors = [...prevColors];
    newColors[i] = "yellow";
    newColors[j] = "yellow";
    return newColors;
  });
  await new Promise((resolve) => setTimeout(resolve, 500));
}


async function unHighlight(arr, i, j) {
  setColors((prevColors) => {
    let newColors = [...prevColors];
    newColors[i] = "blue";
    newColors[j] = "blue";
    return newColors;
  });
}


async function swap(arr, i, j) {
  setColors((prevColors) => {
    let newColors = [...prevColors];
    newColors[i] = "red";
    newColors[j] = "red";
    return newColors;
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  [arr[i], arr[j]] = [arr[j], arr[i]];
  setArray([...arr]);

  await new Promise((resolve) => setTimeout(resolve, 500));

  setColors((prevColors) => {
    let newColors = [...prevColors];
    newColors[i] = "blue";
    newColors[j] = "blue";
    return newColors;
  });
}





  return (
    <div>
      {/* Button to generate a new random array */}
      <button onClick={generateArray}>Generate New Array</button>

      {/* Button to trigger the sorting algorithm */}
      <button onClick={bubbleSort} disabled={isRunning}>Bubble Sort</button>

       {/* Button to stop the sorting algorithm */}
       <button onClick={stop} disabled={isStopBtn}>stop</button>

      {/* Button to trigger the sorting algorithm */}
      <button id = "continue" onClick={stepBubbleSort} disabled={isRunning}>continue</button>

      {/* Visualize the array as a series of bars */}
      <div style={{ display: "flex", gap: "5px", marginTop: "20px" }}>
        {array.map((value, index) => (
          // Each bar represents an element in the array
          <div
            key={index}
            style={{
              // Set the height of the bar based on the value of the element
              height: `${value * 3}px`,  // Multiply by 3 to make the bars more visible
              width: "30px",
              backgroundColor: colors[index],
              textAlign: "center",      // Center the value in the bar
            }}
          >
            {value}  {/* Display the value of the element inside the bar */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingVisualizer;
