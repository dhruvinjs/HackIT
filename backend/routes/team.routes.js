import express from "express";
import { authProtection } from "../middlewares/authProtection.js";
import { createTeam , removeMember, sendInvitation, sendMessage } from "../controllers/team.controllers.js";
const router = express.Router();

router.post("/create",authProtection , createTeam);
router.post("/sendInvitation/:teamId",authProtection , sendInvitation);
router.post("/removeMember/:teamId",authProtection , removeMember);
router.post("/sendMessage/:teamId",authProtection , sendMessage);


export default router;