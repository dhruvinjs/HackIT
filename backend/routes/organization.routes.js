import express from "express";
import { createOrganization  ,addMember , hostHackathon} from "../controllers/organization.controller.js";
import { authProtection } from "../middlewares/authProtection.js";
import { organizerProtected } from "../middlewares/organizerProtected.js";

const router = express.Router();

router.post("/create",authProtection,createOrganization);
router.post("/add-member/:orgId",authProtection ,organizerProtected,addMember)
router.post("/hostHackathon/:orgId" , authProtection , organizerProtected , hostHackathon);

export default router;