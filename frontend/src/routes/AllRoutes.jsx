import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup } from '../pages'
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};
