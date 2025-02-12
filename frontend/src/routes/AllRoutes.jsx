import { Routes, Route } from "react-router-dom";
import { Home, Login, Signup, UserDashBoard, ProfilePage, UpdateProfile,OrganiserForm,RegisrationForm } from '../pages'

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<UserDashBoard />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/update" element={<UpdateProfile />} />
      <Route path="/register" element={<RegisrationForm />} />
      <Route path="/create" element={<OrganiserForm />} />
    </Routes>
  );
};
