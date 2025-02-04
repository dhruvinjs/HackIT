import e from "express";
import {userLogin, userLogout, userSignUp}  from "../controllers/user-controllers.js";

const useroutes=e.Router()

useroutes.post('/signUp',userSignUp)
useroutes.post('/login',userLogin)
useroutes.post('/logout',userLogout)
export {useroutes}