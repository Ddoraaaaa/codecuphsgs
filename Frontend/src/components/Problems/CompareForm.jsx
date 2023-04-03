export default function CompareForm() {
  return (
    <div> 
    <div className="font-bold text-3xl text-center mt-5 mb-5">Compare two strategies</div>
    <form action="" method="GET" 
      className="mx-auto p-3 rounded-lg w-fit border-2 border-black">
      <div className="mx-auto w-fit">
        <legend className="font-bold mt-3 text-xl text-center">Strategy 1 </legend>
        <input type="file" className="rounded-lg bg-black text-white p-2 mt-2"></input>  
      </div>
      <br />
      <div className="mx-auto w-fit">
        <legend className="font-bold mt-3 text-xl text-center">Strategy 2 </legend>
        <input type="file" className="rounded-lg bg-black text-white p-2 mt-2"></input>
      </div>
      <br />
      <button type="submit" 
        className="bg-blue-500 text-white rounded-lg p-3 mt-3 font-bold mx-auto w-fit content-center flex"
      >Compare</button>      
    </form>
    </div> 
  )
}