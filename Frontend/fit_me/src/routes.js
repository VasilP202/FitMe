import React from "react";
import { Navigate, Routes, Route, Router } from "react-router-dom";

//history
//import { history } from "./helpers/history";

//pages
import Home from "./components/Home";
import App from "./App";
//import LoginPage from "./pages/Login";

function PageRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" component={<App/>} />
        {/* <Route path="/login" component={LoginPage} /> */}
        <Navigate to="/" />
      </Routes>
    </Router>
  );
}

export default PageRouter;
