import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import useToken from "./components/auth/useToken";
import AuthService from "./components/auth/AuthService";
import Header from "./components/Header";
import { useState } from "react";
import Stats from "./components/Stats";


function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <AuthService setToken={setToken} />;
  }

  return (
    <div>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
