import "./App.css";
import Home from "./scenes/Home";
import About from "./scenes/About";
import Employee from "./scenes/Employee";
import Register from "./scenes/Register";
import Login from "./scenes/Login";
import EmpDepDsg from "./scenes/EmpDepDsg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/employee" element={<Employee />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/empdepdsg" element={<EmpDepDsg />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
