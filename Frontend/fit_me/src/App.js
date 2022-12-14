/* Authors: Tomas Fiser, xfiser16
           Vasil Poposki,  xpopos00*/
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./components/Home";
import useToken from "./components/auth/useToken";
import AuthService from "./components/auth/AuthService";
import Header from "./components/Header";
import ClientHeader from "./components/ClientHeader";
import Stats from "./components/Stats";
import TrainerStats from "./components/TrainerStats";
import Clients from "./components/Clients";

function App() {
  const { token, setToken } = useToken();

  if (!token) {
    /*Redirect user to the authentication */
    return <AuthService setToken={setToken} />;
  }

  const getUserIsTrainer = () => {
    /* User role is stored in localStorage */
    return localStorage.getItem("is_trainer");
  };

  return (
    <div>
      <BrowserRouter>
        {getUserIsTrainer() == "true" ? <Header /> : <ClientHeader />}
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/stats"
            element={
              getUserIsTrainer() == "true" ? <TrainerStats /> : <Stats />
            }
          />
          <Route path="/clients" element={<Clients />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
