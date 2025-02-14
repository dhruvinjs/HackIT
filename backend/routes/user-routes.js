import e from "express";
import {checkAuth, getActiveEvents, getAppliedHackathons, getEventDetails, getParticipants, getUsers, hostEvents, registerEvents,  updateProfile, userLogin, userLogout, userSignUp}  from "../controllers/user-controllers.js";
// import passport from "passport";
import { authProtection } from "../middlewares/authProtection.js";
import { hostProtection } from "../middlewares/hostProtection.js";

const useroutes = e.Router()
useroutes.route('/signup').post(userSignUp)
useroutes.post('/signUp', userSignUp)
useroutes.post('/login', userLogin)
useroutes.post('/logout', authProtection, userLogout)
  useroutes.post('/update',authProtection,updateProfile)
  useroutes.get('/checkAuth' , authProtection , checkAuth)
  useroutes.post('/hostEvent',authProtection,hostEvents)
  useroutes.get('/events',authProtection,getActiveEvents)
  useroutes.get('/getParticipants/:eventID',authProtection,hostProtection,getParticipants)  
  useroutes.post('/register/:id',authProtection,registerEvents)
  useroutes.get('/getEventDetails/:id', authProtection , getEventDetails)
  useroutes.post("/getUsers" , authProtection , getUsers)
  useroutes.post("/eventsParticipated" , authProtection ,getAppliedHackathons)

export { useroutes }
