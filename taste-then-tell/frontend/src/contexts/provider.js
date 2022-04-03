import React, { useState, useCallback } from "react";

import { instance } from "../api";

import { AuthContext, useAuth } from "./context";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const login = useCallback(async (email, password) => {
    try {
      const res = await instance.post("/students/login", { email, password });
      setUser(res.data.result[0]);
      localStorage.setItem("user", JSON.stringify(res.data.result[0]));
      console.log(res);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth };
export default AuthProvider;
