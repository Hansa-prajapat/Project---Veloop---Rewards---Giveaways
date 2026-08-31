import { Router } from "express";
import { current, byId, previous } from "../controllers/giveawayController.js";
import { validateGiveawayId } from "../middleware/validationMiddleware.js";
const router=Router();
router.get("/current",current);
router.get("/previous",previous);
router.get("/:id",validateGiveawayId,byId);
export default router;
