import React, { useEffect, useRef, useState } from "react";
import "./QuickSortVisualizer.css";  // Import the CSS file
function QuickSortVisualizer(){

  const [array, setArray] = useState([10,20,30,70,20,70,50,20,90,50]);
  //const [colorsMap,setColorsMap] = useState({});
  const [colors, setColors] = useState(new Array(10).fill("gray"));



  function generateArray() {
  const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)); // Declare newArray
  setArray(newArray); // Update the state
  //setColorsMap({}); // Reset colorsMap
  setColors(new Array(10).fill("gray")); // Reset colors
 
}

const quickSort = async (arr, left, right) => {
  if(left>right){
    return;
  }
  if (left === right) {
    setColors((prev) => {
     let newColors = [...prev];
    newColors[left] = "orange"; // Highlight sorted element
    return newColors;
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setColors((prev) => {
      let newColors = [...prev];
      newColors[left] = "blue"; // Reset color
      return newColors;
    });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return;
}

  // Partition and get pivot indices
  let [pivotStart, pivotEnd] = await partition(arr, left, right);

  // Recursively sort left and right partitions
  await quickSort(arr, left, pivotStart - 1);
  await quickSort(arr, pivotEnd + 1, right);
};

const partition = async (arr, left, right) => {
  let pivot = arr[right]; // Choose pivot
  setColors((prev)=>{
    let newColors = [...prev];
    newColors[right] = "orange"; // Highlight pivot
    return newColors;
  });

  let leftArr = [], middleArr = [], rightArr = [];

  // Separate elements into three categories
  for (let k = left; k <= right; k++) {
    setColors((prev) => {
      let newColors = [ ...prev ];
      if (arr[k] < pivot) {
        newColors[k] = "green"; // Less than pivot
      } else if (arr[k] > pivot) {
        newColors[k] = "red"; // Greater than pivot
      } else {
        newColors[k] = "blue"; // Equal to pivot
      }
      return newColors;
    });
      if (arr[k] < pivot) leftArr.push(arr[k]);
      else if (arr[k] === pivot) middleArr.push(arr[k]);
      else rightArr.push(arr[k]);
      await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  // Rebuild the array in place
  let sortedPart = [...leftArr, ...middleArr, ...rightArr];
  for (let k = left; k <= right; k++) {
      arr[k] = sortedPart[k - left];
  }

  // Update state to trigger re-render
  setArray([...arr]);

  for (let k = left; k <= right; k++) {
    setColors((prev) => {
      let newColors = [ ...prev ];
      if (arr[k] < pivot) {
        newColors[k] = "green"; // Less than pivot
      } else if (arr[k] > pivot) {
        newColors[k] = "red"; // Greater than pivot
      } else {
        newColors[k] = "blue"; // Equal to pivot
      }
      return newColors;
    });
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  //anything not blue, turn to gray
  for (let k = left; k <= right; k++) {
    setColors((prev) => {
      let newColors = [ ...prev ];
      if(newColors[k] !== "blue"){
        newColors[k] = "gray"; // Less than pivot
      }
      return newColors;
    });
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let pivotStart = left + leftArr.length;
  let pivotEnd = pivotStart + middleArr.length - 1;


  return [pivotStart, pivotEnd];
};

  
  // async function rearrangeArray(arr, left, right, leftArr, rightArr, middleArr, pivot) {
  

  //   //let newColors = [...colorsRef.current]; // Copy current colors
  
  //   for (let i = left; i < right + 1; i++) {
  //     // if (arr[i] > pivot) {
  //     //   newColors[i] = "red";
  //     // } else if (arr[i] < pivot) {
  //     //   newColors[i] = "green";
  //     // } else {
  //     //   newColors[i] = "blue";
  //     // }
      
  //     if (arr[i] > pivot) {
  //       setColors((prevColors) => {
  //         prevColors[i] = "red";
  //         return [...prevColors];
  //     }); // Update colors
  //     } else if (arr[i] < pivot) {
  //       setColors((prevColors) => {
  //         prevColors[i] = "green";
  //         return [...prevColors];
  //     }); // Update colors
  //     } else {
  //       setColors((prevColors) => {
  //         prevColors[i] = "blue";
  //         return [...prevColors];
  //     }); // Update colors
  //     }
  //   //   setColors((prevColors) => {
  //   //     let newColorsI = [...prevColors];
  //   //     newColorsI[i] = newColors[i];
  //   //     colorsRef.current = newColorsI; // Update the ref
  //   //     return newColorsI;
  //   // }); // Update colors
  //     //console.log("Updated colors:", newColors);
      
  //     await new Promise((resolve) => setTimeout(resolve, 1000)); // Delay for visualization
  //     console.log("colors:", colors);
  //   }
  
  //   // Update array order
  //   const newArray = [...leftArr, ...middleArr, ...rightArr];
  //   setArray(newArray);
  //   //arrayRef.current = newArray; // Update the ref
    
  //   // // Reorder colors based on the new array order
  //   // const newColorsOrdered = newArray.map(value => {
  //   //   let originalIndex = arr.indexOf(value); // Find original index of the value
  //   //   return newColors[originalIndex]; // Assign its previous color
  //   // });

  //   setColors((prevColors) => {
     
  //   });
  
  
  //   setColors(newColorsOrdered); // Apply reordered colors
  //   //colorsRef.current = newColorsOrdered; // Update the ref
  //   console.log("Reordered colors:", newColorsOrdered);
  //   await new Promise((resolve) => setTimeout(resolve, 100)); // Delay for visualization
  //   return newArray;
  // }
  
  // useEffect(() => {
  //   console.log(colors); // Generate array on component mount
  // }
  // , [colors]);
  

  function stop(){

  }

  function stepQuickSort(){

  }

  return(
    <div className="visualizer-container">
      <h2>QuickSort Visualization</h2>
      <div className="button-container">
        <button onClick={generateArray} >Generate new Array</button>
        <button onClick={() => quickSort([...array],0,array.length-1)} >Quick Sort</button>
        {/* <button onClick={stop} disabled={isStopBtn}>stop</button> */}
        {/* <button onClick={stepQuickSort} disabled={isRunning}>Continue</button> */}
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
