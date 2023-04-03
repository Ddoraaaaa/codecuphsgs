import { useEffect, useState } from "react";

export default function ProblemList() {
  // for demo only. 
  const [problemList, updateProblemList] = useState([]); 
  const update = () => { 
    console.log("bruh moment"); 
    let newProblemList = [...problemList]; // newProblemList = problemList => bug
    for (let i = 0; i < 3; i++) {
      newProblemList.push(`Problem #${i+1}: Beat the meat level ${i+1}`); 
    }
    updateProblemList(newProblemList); 
  }; 
  let list = problemList.map((problem) => <div className="text-white bg-black m-2 p-2">{problem}</div>)
  return ( 
    <div className="m-3 p-3 border-black border-2">
      <div className="font-bold text-3xl">Problem list</div>
      {list} 
      <button 
        onClick={update}
        className="text-white m-2 p-2 bg-blue-600 rounded-md"
      >More</button> 
    </div> 
  )
}