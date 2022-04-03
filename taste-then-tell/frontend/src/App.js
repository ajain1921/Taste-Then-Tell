import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import ProtectedRoute from "./wrappers/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="" element={<ProtectedRoute Component={Login} />} />
      <Route path="/profile" element={<ProtectedRoute Component={Profile} />} />
    </Routes>
  );
};

export default App;
