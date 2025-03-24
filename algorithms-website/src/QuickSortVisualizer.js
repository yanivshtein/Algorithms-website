import React, { useRef, useState } from "react";

function QuickSortVisualizer(){

  const [array, setArray] = useState([10,60,30,50,20,70,40,80,90,100]);
  const [colors,setColors]  = useState(new Array(10).fill("blue"));
  const [isRunning, setIsRunning] = useState(false);
  const isStopBtn = useRef(false);


  function generateArray(){
    setArray(Array.from({length: 10}, () => Math.floor(Math.random() * 100)));
    setColors(new Array(10).fill("blue"));

  }


  async function quickSortVisualization(arr, start, end) {
    setIsRunning(true);
    if (start >= end) return; // Base case
  
    let pivotIndex = end; // Choosing the first element as pivot
    let pivot = arr[pivotIndex];
  
    setColors((prevColors) => {
      let newColors = [...prevColors];
      newColors[pivotIndex] = "yellow"; // Highlight pivot
      return newColors;
    });
  
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    let left = start;
    let right = end - 1;
  
    while (left <= right) {
      while (left <= end && arr[left] < pivot) left++;
      while (right > start && arr[right] > pivot) right--;
  
      if (left <= right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]; // Swap
        setArray([...arr]);
  
        setColors((prevColors) => {
          let newColors = [...prevColors];
          newColors[left] = "green"; // Left partition
          newColors[right] = "red"; // Right partition
          return newColors;
        });
  
        await new Promise((resolve) => setTimeout(resolve, 500));
        left++;
        right--;
      }
    }
  
    // Move pivot to its final position
    [arr[start], arr[right]] = [arr[right], arr[start]];
    setArray([...arr]);
  
    await new Promise((resolve) => setTimeout(resolve, 500));
  
    // Recursive calls
    await quickSortVisualization(arr, start, right - 1);
    await quickSortVisualization(arr, right + 1, end);
  }
  
  

  function stop(){

  }

  function stepQuickSort(){

  }

  return(
    <div className="visualizer-container">
      <h2>QuickSort Visualization</h2>
      <div className="button-container">
        <button onClick={generateArray} disabled={isRunning}>Generate new Array</button>
        <button onClick={() => quickSortVisualization([...array],0,array.length-1)} disabled={isRunning}>Quick Sort</button>
        <button onClick={stop} disabled={isStopBtn}>stop</button>
        <button onClick={stepQuickSort} disabled={isRunning}>Continue</button>
      </div>

      <div className="bars-container">
        {array.map((value,index) => (
          <div key={index}
          className="bar"
          style={{
            height : `${value*3}px` ,
            background : colors[index],
          }}
          >
            {value}
            </div>
        ))}
      </div>
    </div>
  )


}


export default QuickSortVisualizer;
