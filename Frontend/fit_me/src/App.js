import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import useToken from "./components/auth/useToken";
import AuthService from "./components/auth/AuthService";
import { useEffect, useState } from "react";

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
