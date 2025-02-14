import { Routes, Route, Navigate } from "react-router-dom";
import { Home, Login, Signup, UserDashBoard, ProfilePage, UpdateProfile, OrganiserForm, RegisrationForm, ParticipationHistory, ChatPage, Friends } from '../pages'
import { useAuthStore } from "../store/useAuthStore";
import VideoChatInterFace from "../pages/VideoChatInterFace";


export const AllRoutes = () => {
  const { authUser, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth) {
    return <div>Loading.....</div>
  }
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={authUser ? <Navigate to={"/dashboard"} /> : <Signup />} />
      <Route path="/login" element={authUser ? <Navigate to={"/dashboard"} /> : <Login />} />
      <Route path="/dashboard" element={<UserDashBoard />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/update" element={<UpdateProfile />} />
      <Route path="/register" element={<RegisrationForm />} />
      <Route path="/create" element={<OrganiserForm />} />
      <Route path="/history" element={<ParticipationHistory />} />
      <Route path="/friends" element={<Friends />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/apply" element={<RegisrationForm />} />
      <Route path="/webrtc" element={<VideoChatInterFace />} />
    </Routes>
  );
};
