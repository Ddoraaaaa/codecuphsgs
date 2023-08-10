export default function Settings() {
  return (
    <div className="border-black border-2 m-3 p-3">
      <div className="font-bold text-3xl">Settings</div>
      <div className="font-bold text-2xl mt-3">User information</div>
      <span className="mr-4">Username: John</span>
      <button>Change</button> 
      <br />
      <span className="mr-4">Email: random_email1234@gmail.com</span>
      <button>Change</button>
      <br />
      <span className="mr-4">Password</span>
      <button>Change</button>
      <div className="font-bold text-2xl mt-3">Preferences</div>
      <div>Idk add something here</div>
    </div>
  )
}