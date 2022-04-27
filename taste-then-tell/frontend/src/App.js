import { Route, Routes } from "react-router-dom";
import DiningHalls from "./pages/DiningHalls";
import Foods from "./pages/Foods";
import FoodItem from "./pages/FoodItem";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PersonalReviews from "./pages/PersonalReviews";
import Universities from "./pages/Universities";
import ProtectedRoute from "./wrappers/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route path="" element={<ProtectedRoute Component={Login} />} />
      <Route path="/profile" element={<ProtectedRoute Component={Profile} />} />
      <Route
        path="/profile/reviews"
        element={<ProtectedRoute Component={PersonalReviews} />}
      />
      <Route
        path="/dininghalls"
        element={<ProtectedRoute Component={DiningHalls} />}
      />
      <Route
        path="/universities"
        element={<ProtectedRoute Component={Universities} />}
      />
      <Route path="/foods" element={<ProtectedRoute Component={Foods} />} />
      <Route
        path="/foods/:food_id"
        element={<ProtectedRoute Component={FoodItem} />}
      />
    </Routes>
  );
};

export default App;
