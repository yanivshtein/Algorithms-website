import React, { useState } from 'react';
import './BFSVisualizer.css';

function BFSVisualizer() {
  const nodes = [
    { id: 0, x: 100, y: 100 },
    { id: 1, x: 300, y: 100 },
    { id: 2, x: 200, y: 200 },
    { id: 3, x: 100, y: 250 },
    { id: 4, x: 300, y: 250 },
    { id: 5, x: 400, y: 100 }, 
    { id: 6, x: 400, y: 250 }, 
    { id: 7, x: 500, y: 200 },
  ];

  const edges = [
    [0, 1],
    [1, 2],
    [0, 2],
    [0, 3],
    [3, 4],
    [2, 4],
    [1, 5], 
    [5, 7], 
    [4, 6], 
    [6, 7],
    
  ];

  const [visited, setVisited] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [startNode, setStartNode] = useState(0);
  const [distances, setDistances] = useState({});



  const bfs = async (start) => {
    const queue = [start];
    const seen = new Set([start]);
    setDistances({ [start]: 0 });

    while (queue.length > 0) {
      const node = queue.shift();
      setCurrentNode(node);
      setVisited((prev) => [...prev, node]);
      await new Promise((res) => setTimeout(res, 500)); 

      for (const [from, to] of edges) {
        if (from === node && !seen.has(to)) {
          queue.push(to);
          seen.add(to);
          setDistances((prev) => ({ ...prev, [to]: prev[node] + 1 }));

        }
        if (to === node && !seen.has(from)) {
          queue.push(from);
          seen.add(from);
          setDistances((prev) => ({ ...prev, [from]: prev[node] + 1 }));

        }
      }
    }
  };

  return (
<div
  className="visualizer-container"
  style={{
    width: "fit-content",
    maxWidth: "90%",
    margin: "40px auto",
    padding: "30px 40px",
    backgroundColor: "white",
    borderRadius: "16px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }}
>


      <h2>BFS Visualizer</h2>
      <select
  value={startNode}
  onChange={(e) => setStartNode(Number(e.target.value))}
  style={{
    margin: '10px',
    padding: '12px 18px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #007bff',
    backgroundColor: 'white',
    color: '#007bff',
    fontWeight: 'bold',
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' fill=\'%23007bff\' class=\'bi bi-caret-down-fill\' viewBox=\'0 0 16 16\'> <path d=\'M7.247 11.14 2.451 5.658c-.566-.65-.106-1.658.753-1.658h9.592c.86 0 1.32 1.008.753 1.658L8.753 11.14a1 1 0 0 1-1.506 0z\'/> </svg>")',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 0.2rem center',
    backgroundSize: '16px 16px',
    cursor: 'pointer'
  }}
>
  {nodes.map((node) => (
    <option key={node.id} value={node.id} style={{ color: 'black' }}>
      Node {node.id}
    </option>
  ))}
  </select>

  <button
  onClick={() => bfs(startNode)}
  style={{
    margin: '10px',
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #007bff',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer'
  }}
>
    Start BFS
    </button>
    <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '20px'
}}>
  <svg width="650" height="300" style={{ border: "1px solid black", borderRadius: "10px", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
    
    {edges.map(([from, to], idx) => (
      <line
        key={idx}
        x1={nodes[from].x}
        y1={nodes[from].y}
        x2={nodes[to].x}
        y2={nodes[to].y}
        stroke="black"
      />
    ))}

    {nodes.map((node) => (
      <g key={node.id}>
        <circle
          cx={node.x}
          cy={node.y}
          r="20"
          fill={node.id === currentNode ? "orange" : visited.includes(node.id) ? "lightblue" : "white"}
          stroke="black"
        />
        <text
          x={node.x}
          y={node.y - 5}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="14"
          fontWeight="bold"
          fill="black"
        >
          {node.id}
        </text>
        <text
          x={node.x}
          y={node.y + 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
          fill="light blue"
        >
          {distances[node.id] !== undefined ? `d=${distances[node.id]}` : ""}
        </text>
      </g>
    ))}

  </svg>
</div>

    </div>
  );
}

export default BFSVisualizer;

