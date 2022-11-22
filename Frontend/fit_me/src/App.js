import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import "./App.css";
import Home from "./components/Home";
import useToken from "./components/auth/useToken";
import AuthService from "./components/auth/AuthService";
import Stats from "./components/Stats";
import Header from "./components/Header";

function App() {
  
  const { token, setToken } = useToken();
  const { user, setUser } = useState([]);

  if (!token) {
    return <AuthService setToken={setToken} />;
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/stats" element={<Stats/>} />
        </Routes>
      </BrowserRouter>
    </div>
    );
}

export default App;
