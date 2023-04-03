export function LoginForm() {
  return (
    <div className="m-3 p-3 border-black border-2">
      <div className="text-3xl font-bold">Login</div>
      <form method="GET" action="" className="border-2 border-black rounded-lg p-3 m-2 w-fit">
        <legend>Username: </legend> 
        <input type="text" placeholder="Enter your username" className=
          "border-black border-2"
        ></input>
        <legend>Password: </legend>
        <input type="password" placeholder="Enter your password" className=
          "border-black border-2"
        ></input>
        <br />
        <button className="rounded-md bg-blue-600 p-2 my-1 text-white">Login</button>
      </form>
      <div>Not yet have an account? <a href="#" className="text-blue-600">Register now!</a></div>
    </div>
  )
}