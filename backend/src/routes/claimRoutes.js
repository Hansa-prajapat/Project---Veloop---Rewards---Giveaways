import { Router } from "express";
import { myClaim, submitClaim } from "../controllers/claimController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { sensitiveLimiter } from "../middleware/rateLimitMiddleware.js";
const router=Router();
router.get("/:id/my-claim",requireAuth,myClaim);
router.post("/:id/claim",requireAuth,sensitiveLimiter,submitClaim);
export default router;
