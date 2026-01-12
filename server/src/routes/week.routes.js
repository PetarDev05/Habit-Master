import { Router } from "express";
import { authentication } from "../middlewares/authentication.middlewares.js";
import {
  getAllWeekData,
  createNewWeek,
  changeCheckInStatus,
  deleteWeek,
} from "../controllers/week.controllers.js";

const router = Router();

router.use(authentication);

router.route("/:userId").get(getAllWeekData).post(createNewWeek);
router.route("/:checkInId/check-in").patch(changeCheckInStatus);
router.route("/:weekId").delete(deleteWeek);

export default router;
