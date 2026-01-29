import { Router } from "express";
import { authentication } from "../../../middlewares/auth.middlewares.js";
import { fetchData } from "../controllers/fetchData.controllers.js";
import { createNewWeek } from "../controllers/createNewWeek.controllers.js";

const router = Router();

router.use(authentication);

router.route("/").get(fetchData).post(createNewWeek);
// router.route("/:checkInId").patch();
// router.route("/:weekId").delete();

export default router;
