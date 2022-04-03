import React, { useState, useEffect, useCallback } from "react";

import { instance } from "../api";

import { AuthContext, initialValues, useAuth } from "./context";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialValues);

  const login = useCallback(async (email, password) => {
    try {
      const res = await instance.post("/students/login", { email, password });
      setAuth({ user: res.data.result[0] });
      console.log(res);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth };
export default AuthProvider;
