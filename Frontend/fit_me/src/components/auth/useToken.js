/* Author: Vasil Poposki,  xpopos00*/
/* https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications */
import { useState } from "react";

export default function useToken() {
  /* Token hook for retreiving and saving tokens.*/
  const getToken = () => {
    const tokenString = localStorage.getItem("token");
    if (tokenString) {
      const userToken = JSON.parse(tokenString);
      return userToken?.access;
    }
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    localStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken?.access);
  };

  return {
    setToken: saveToken,
    token,
  };
}
