import Dashboard from "./Users/Dashboard"
import Settings from "./Users/Settings"
import { LoginForm } from "./Users/AuthComponents"
import CompareForm from "./Problems/CompareForm"
import ContestList from "./Problems/ContestList"

export function HeaderComponent() {
  return (
    <header 
      className="w-screen bg-black text-white p-3 font-bold flex 
      justify-between   
      fixed top-0 left-0 
    ">
      <div className="text-2xl">
        Codecup<span className="text-blue-500">HSGS</span>
      </div>
      <div className="flex space-x-5">
        <a href="#">Problems</a>
        <a href="#">User</a>
        <a href="#">Settings</a>
      </div>
    </header>
  )
}

export function FooterComponent() {
  return (
    <footer 
      className="p-3 font-bold text-white bg-black w-screen text-2xl">
      User: Balls
    </footer>
  )
}

export function BodyComponent() {
  return (
    <body className="my-20">
      <Dashboard name="Giap Vu" user_id="1000"/>
      <LoginForm />
      <ContestList />
      <Settings />
      <CompareForm />
    </body>
  )
}
