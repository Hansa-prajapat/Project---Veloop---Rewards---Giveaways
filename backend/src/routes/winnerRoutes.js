import { Router } from "express";
import { winners, previousWinners } from "../controllers/winnerController.js";
const router=Router();
router.get("/previous/winners",previousWinners);
router.get("/:id/winners",winners);
export default router;
