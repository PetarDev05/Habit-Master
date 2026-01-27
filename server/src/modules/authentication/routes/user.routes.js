import { Router } from "express";
import { createAccount } from "../controllers/createAccount.controllers.js";
import { signInToAccount } from "../controllers/signInToAccount.controllers.js";
import { extendUserSession } from "../controllers/extendUserSession.controllers.js";
import { signOutFromTheAccount } from "../controllers/signOutFromTheAccount.controllers.js";
import { deleteAccount } from "../controllers/deleteAccount.controllers.js";
import { authentication } from "../../../middlewares/auth.middlewares.js";

const router = Router();

router.route("/create-account").post(createAccount);
router.route("/sign-in").patch(signInToAccount);
router.route("/extend-session").get(extendUserSession);

router.use(authentication);

router.route("/sign-out").patch(signOutFromTheAccount);
router.route("/delete-account").delete(deleteAccount);

export default router;
