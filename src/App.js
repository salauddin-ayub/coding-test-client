import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import View_Info from "./pages/View_Info";
import Update_Info from "./pages/Update_Info";
import Create_Info from "./pages/Create_Info";
import { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
export const AppContext = createContext();

function App() {
  const [updatedData, setUpdatedData] = useState({});
  return (
    <div className="App">
      <AppContext.Provider value={{ updatedData, setUpdatedData }}>
        <Router>
          <Routes>
            <Route path="view-information" element={<View_Info />} />
            <Route path="update-information/:id" element={<Update_Info />} />
            <Route path="/" element={<Create_Info />} />
          </Routes>
        </Router>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <ToastContainer />
      </AppContext.Provider>
    </div>
  );
}

export default App;
