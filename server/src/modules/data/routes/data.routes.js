import { Router } from "express";
import { authentication } from "../../../middlewares/auth.middlewares.js";
import { fetchData } from "../controllers/fetchData.controllers.js";

const router = Router();

router.use(authentication);

router.route("/").get(fetchData) //.post();
// router.route("/:checkInId").patch();
// router.route("/:weekId").delete();

export default router;
