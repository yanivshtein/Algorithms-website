import React, { useState } from "react";

const SortingVisualizer = () => {
  // State to hold the array of numbers we will sort and visualize
  const [array, setArray] = useState([30, 10, 50, 20, 60, 40]);

  // Function to generate a new random array with 10 elements
  const generateArray = () => {
    setArray(Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)));
  };

  // Function to perform bubble sort and animate it
  const bubbleSort = async () => {
    let arr = [...array];  // Create a copy of the array to avoid direct mutation of the state
    let n = arr.length;    // Get the length of the array

    // Outer loop: goes through the entire array n times
    for (let i = 0; i < n - 1; i++) {
      // Inner loop: compares each pair of adjacent elements
      for (let j = 0; j < n - i - 1; j++) {
        // If the current element is greater than the next, swap them
        if (arr[j] > arr[j + 1]) {
          // Swap elements using destructuring assignment
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];

          // Update the state with the new array to trigger a re-render
          setArray([...arr]);

          // Add a delay for the animation (200ms here)
          await new Promise((resolve) => setTimeout(resolve, 200));
        }
      }
    }
  };

  return (
    <div>
      {/* Button to generate a new random array */}
      <button onClick={generateArray}>Generate New Array</button>

      {/* Button to trigger the sorting algorithm */}
      <button onClick={bubbleSort}>Bubble Sort</button>

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
              backgroundColor: "blue",  // Blue color for the bars
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
