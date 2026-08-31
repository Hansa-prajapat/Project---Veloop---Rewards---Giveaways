import { Router } from "express";
import { myStatus, join } from "../controllers/participationController.js";
import { requireAuth } from "../middleware/authMiddleware.js";
import { sensitiveLimiter } from "../middleware/rateLimitMiddleware.js";
import { fraudCheck } from "../middleware/fraudMiddleware.js";
const router=Router();
router.get("/:id/my-status",requireAuth,myStatus);
router.post("/:id/join",requireAuth,sensitiveLimiter,fraudCheck,join);
export default router;
