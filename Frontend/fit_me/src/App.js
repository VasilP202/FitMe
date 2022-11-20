import "./App.css";
import Home from "./components/Home";
import Header from "./components/Header";
import Stats from "./components/Stats";
import { Route, Routes } from "react-router-dom";


function App() {
  
  return (
    <div>
      <Header/>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/stats" element={<Stats/>} />
      </Routes>
    </div>
    );
}

export default App;
