import { createContext, useContext } from "react";

const initialValues = {
  user: null,
  login: () => undefined,
};

const AuthContext = createContext(initialValues);

const useAuth = () => useContext(AuthContext);

export { AuthContext, useAuth, initialValues };
