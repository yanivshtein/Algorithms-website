import React, { useRef, useState } from "react";
import "./QuickSortVisualizer.css";  // Import the CSS file
function QuickSortVisualizer(){

  const [array, setArray] = useState([10,20,30,70,20,70,50,20,90,50]);
  const arrayRef = useRef(array); // Create a ref to hold the array
  const [colors,setColors]  = useState(new Array(10).fill("gray"));
  const colorsRef = useRef(colors);
  const [isRunning, setIsRunning] = useState(false);
  const isStopBtn = useRef(false);
  const [sortRanges, setSortRanges] = useState([]); // Stores multiple (left, right) pairs



  function generateArray() {
  const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)); // Declare newArray
  setArray(newArray); // Update the state
  const newColors = new Array(10).fill("gray")
  setColors(newColors); // Reset colors
  colorsRef.current = newColors;
  arrayRef.current = newArray; // Update the ref
}

  const quickSort = async (arr, left, right) => {
    if (left >= right){
      colorsRef.current[left] = "blue"; ;
      setColors(colorsRef.current);
       return;
    }
    // Partition the array and get the updated array and pivot range
    let [newArr, pivotStart, pivotEnd] = await partition(arrayRef.current, left, right);
  
    // Update the ref with the new array
    arrayRef.current = newArr;
  
    // Sort the left and right parts recursively
    await quickSort(arrayRef.current, left, pivotStart - 1);
    await quickSort(arrayRef.current, pivotEnd + 1, right);
  };
  


  const partition = async (arr, left, right) => {
    let pivot = arr[right]; // Choose the rightmost element as pivot
    
  let leftArr = arr.filter((el) => el < pivot);
  let middleArr = arr.filter((el) => el === pivot);
  let rightArr = arr.filter((el) => el > pivot);
  arr = await rearrangeArray(arr,left,right,leftArr,rightArr,middleArr,pivot);

  // Calculate the indices of the pivot range
  let pivotStart = leftArr.length;
  let pivotEnd = pivotStart + middleArr.length - 1;
  // Mark the pivot range as blue
 /* setColors((prevColors) => {
    let newColors = [...prevColors];
    for (let i = pivotStart; i <= pivotEnd; i++) {
      newColors[i] = "blue";
    }
    return newColors;
  });*/
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for visualization
  return [arr,pivotStart,pivotEnd];
  };
  
  async function rearrangeArray(arr, left, right, leftArr, rightArr, middleArr, pivot) {
    let newColors = [...colorsRef.current]; // Copy current colors
  
    for (let i = left; i < right + 1; i++) {
      if (arr[i] > pivot) {
        newColors[i] = "red";
      } else if (arr[i] < pivot) {
        newColors[i] = "green";
      } else {
        newColors[i] = "blue";
      }
      
      setColors((prevColors) => {
        let newColorsI = [...prevColors];
        newColorsI[i] = newColors[i];
        colorsRef.current = newColorsI; // Update the ref
        return newColorsI;
    }); // Update colors
      console.log("Updated colors:", newColors);
      
      await new Promise((resolve) => setTimeout(resolve, 500)); // Delay for visualization
      console.log("colors:", colors);
    }
  
    // Update array order
    const newArray = [...leftArr, ...middleArr, ...rightArr];
    setArray(newArray);
    arrayRef.current = newArray; // Update the ref
    
    // Reorder colors based on the new array order
    const newColorsOrdered = newArray.map(value => {
      let originalIndex = arr.indexOf(value); // Find original index of the value
      return newColors[originalIndex]; // Assign its previous color
    });
  
    setColors(newColorsOrdered); // Apply reordered colors
    colorsRef.current = newColorsOrdered; // Update the ref
    console.log("Reordered colors:", newColorsOrdered);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for visualization
    return newArray;
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
        <button onClick={() => quickSort([...array],0,array.length-1)} disabled={isRunning}>Quick Sort</button>
        <button onClick={stop} disabled={isStopBtn}>stop</button>
        <button onClick={stepQuickSort} disabled={isRunning}>Continue</button>
      </div>

      <div className="array-container">
        {array.map((value,index) => (
          <div key={index}
          className="bar"
          style={{
            height : `${40}px` ,
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
