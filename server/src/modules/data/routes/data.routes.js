import { Router } from "express";
import { authentication } from "../../../middlewares/auth.middlewares.js";
import { fetchData } from "../controllers/fetchData.controllers.js";
import { createNewWeek } from "../controllers/createNewWeek.controllers.js";
import { deleteWeek } from "../controllers/deleteWeek.controllers.js";
import { changeCheckInStatus } from "../controllers/changeCheckInStatus.controllers.js";
import { authomaticCheckIn } from "../../../middlewares/authomaticCheckIn.middlewares.js";

const router = Router();

router.use(authentication);
router.use(authomaticCheckIn);

router.route("/").get(fetchData).post(createNewWeek);
router.route("/:checkInId").patch(changeCheckInStatus);
router.route("/:weekId").delete(deleteWeek);

export default router;
