import { HeaderComponent, BodyComponent, FooterComponent } from "./components/Layout.jsx"
import "./App.css"

function App() {
  return (
    <html className="h-screen relative">
      <HeaderComponent/>
      <BodyComponent/>
      <FooterComponent/>
    </html>
  )
}

export default App
