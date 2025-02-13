import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, Signup, UserDashBoard, ProfilePage, UpdateProfile,OrganiserForm,RegisrationForm } from '../pages'
import { useAuthStore } from "../store/useAuthStore";
import VideoChatInterFace from "../pages/VideoChatInterFace";

export const AllRoutes = () => {
  const {authUser,isCheckingAuth} = useAuthStore();
  if(isCheckingAuth){
    return <div>Loading.....</div>
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={authUser ? <Navigate to={"/"}/> :<Signup />} />
      <Route path="/login" element={authUser ? <Navigate to={"/"}/> :<Login />} />
      <Route path="/dashboard" element={!authUser ? <Navigate to={"/login"}/> :<UserDashBoard />} />
      <Route path="/profile" element={!authUser ? <Navigate to={"/login"}/> :<ProfilePage />} />
      <Route path="/update" element={!authUser ? <Navigate to={"/login"}/> :<UpdateProfile />} />
      <Route path="/register" element={!authUser ? <Navigate to={"/login"}/> :<RegisrationForm />} />
      <Route path="/create" element={!authUser ? <Navigate to={"/login"}/> :<OrganiserForm />} />
      <Route path="/Web-Rtc" element={<VideoChatInterFace/>} />

    </Routes>
  );
};
