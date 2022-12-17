
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import View_Info from "./pages/View_Info"
import Update_Info from "./pages/Update_Info"
import Create_Info from "./pages/Create_Info"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="view-information" element={<View_Info />} />
          <Route path="update-information/:id" element={<Update_Info />} />
          <Route path="/" element={<Create_Info />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
