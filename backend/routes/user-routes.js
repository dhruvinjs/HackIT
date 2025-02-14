import e from "express";
import {checkAuth, getActiveEvents, getParticipants, hostEvents, registerEvents,  updateProfile, userLogin, userLogout, userSignUp}  from "../controllers/user-controllers.js";
// import passport from "passport";
import { authProtection } from "../middlewares/authProtection.js";
import { hostProtection } from "../middlewares/hostProtection.js";

const useroutes=e.Router()
useroutes.route('/signup').post(userSignUp)
useroutes.post('/signUp',userSignUp)
useroutes.post('/login',userLogin)
useroutes.post('/logout',authProtection,userLogout)
// useroutes.get('/google',passport.authenticate('google',{scope:['profile','email']}))
// useroutes.get(
//     '/google/callback',
//     passport.authenticate('google', { session: false }),
//     (req, res) => {
//       if (!req.user) {
//         return res.status(401).json({ message: 'Authentication failed' });
//       }
  
//       // Send JWT to frontend
//       res.redirect(`http://localhost:5173?token=${req.user.token}`);
//     }
//   );
  useroutes.post('/update',authProtection,updateProfile)
  useroutes.get('/checkAuth' , authProtection , checkAuth)
  useroutes.post('/hostEvent',authProtection,hostEvents)
  useroutes.get('/events',authProtection,getActiveEvents)
  useroutes.get('/getParticipants/:eventID',authProtection,hostProtection,getParticipants)  
  useroutes.post('/apply/:id',authProtection,registerEvents)
export {useroutes}
