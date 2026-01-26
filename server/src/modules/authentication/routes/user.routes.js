import { Router } from "express";
import { createAccount } from "../controllers/createAccount.controllers.js";
import { signInToAccount } from "../controllers/signInToAccount.controllers.js";
import { extendUserSession } from "../controllers/extendUserSession.controllers.js";
import { signOutFromTheAccount } from "../controllers/signOutFromTheAccount.controllers.js";
import { deleteAccount } from "../controllers/deleteAccount.controllers.js";
import { authentication } from "../../../middlewares/auth.middlewares.js";

const router = Router();

router.route("/create-account").post(createAccount);
router.route("/sign-in").post(signInToAccount);
router.route("/extend-session").post(extendUserSession);

router.use(authentication);

router.route("/sign-out").post(signOutFromTheAccount);
router.route("/delete-account").delete(deleteAccount);

export default router;
