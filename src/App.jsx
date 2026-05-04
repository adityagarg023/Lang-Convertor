import { Routes, Route } from "react-router-dom"
import Kyo from "./pages/kyo"
import './App.css'

function App() {
  return (

    <Routes>
      <Route path="/" element={<Kyo />} />
    </Routes>
  )
}

export default App
