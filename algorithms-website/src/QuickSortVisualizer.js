import React, { useRef, useState } from "react";
import "./QuickSortVisualizer.css";  // Import the CSS file
function QuickSortVisualizer(){

  const [array, setArray] = useState([10,20,30,70,20,70,50,20,90,50]);
  //const [colorsMap,setColorsMap] = useState({});
  const [colors, setColors] = useState(new Array(10).fill("gray"));
  const stopSort = useRef(false);
  const [stopBtnTxt, setIsStopBtn] = useState("Stop");
  const [isRunning, setIsRunning] = useState(false); // True if sorting is in progress
  const [generateBtnRef,setGenerateBtnRef] = useState(false);
  const resetGenerateBtnRef = useRef(false);
  const quickSortFlag = useRef(false);
  
  
  function generateArray() {
  resetGenerateBtnRef.current = true;
  const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)); // Declare newArray
  setArray(newArray); // Update the state
  //setColorsMap({}); // Reset colorsMap
  setColors(new Array(10).fill("gray")); // Reset colors
  setIsStopBtn("Stop");
  stopSort.current = false;
  setIsRunning(false); // Reset isRunning state
  quickSortFlag.current = false;
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
  if(resetGenerateBtnRef.current){
    return;
  }
  // Recursively sort left and right partitions
  await quickSort(arr, left, pivotStart - 1);
  await quickSort(arr, pivotEnd + 1, right);
};

const partition = async (arr, left, right) => {
  let pivot = arr[right]; // Choose pivot
  await wait();
  if(resetGenerateBtnRef.current){
    return [0,0];
  }
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
    await wait();
    if(resetGenerateBtnRef.current){
      return [0,0];
    }
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
  await wait();
  if(resetGenerateBtnRef.current){
    return [0,0];
  }
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
    await wait();
    if(resetGenerateBtnRef.current){
      return [0,0];
    }
  }
  await new Promise((resolve) => setTimeout(resolve, 1000));
  let pivotStart = left + leftArr.length;
  let pivotEnd = pivotStart + middleArr.length - 1;


  return [pivotStart, pivotEnd];
};

async function wait(){
  while(stopSort.current){
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for 100ms
    if(generateBtnRef.current){
      return;
    }
  }
}  

function stop(){
  if(stopSort.current){
    setIsStopBtn("Stop");
    stopSort.current = false;
    setGenerateBtnRef(true);
  }else{
    setIsStopBtn("Continue");
    stopSort.current = true;
    setGenerateBtnRef(false);
    setIsRunning(false);
  }
}
  
  return(
    <div className="visualizer-container">
      <h2>QuickSort Visualization</h2>
      <div className="button-container">
        <button onClick={() => {
          generateArray();
        }
          } disabled = {generateBtnRef} >Generate new Array</button>
        <button onClick={() =>{
          resetGenerateBtnRef.current = false; // Reset generate button state
          setGenerateBtnRef(true);
          setIsRunning(true);
          if(!quickSortFlag.current){
            quickSortFlag.current = true;
            quickSort([...array],0,array.length-1)
          }else{
            stop();
          }
          }
        }
            disabled = {isRunning} >Quick Sort</button>
        { <button id="stopBtn" onClick={stop} >{stopBtnTxt}</button> }
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
