import { Router } from "express";
import { createAccount } from "../controllers/createAccount.controllers.js";
import { signInToAccount } from "../controllers/signInToAccount.controllers.js";
import { extendUserSession } from "../controllers/extendUserSession.controllers.js";
import { signOutFromTheAccount } from "../controllers/signOutFromTheAccount.controllers.js";
import { deleteAccount } from "../controllers/deleteAccount.controllers.js";

const router = Router();

router.route("/create-account").post(createAccount);
router.route("/sign-in").post(signInToAccount);
router.route("/extend-session").post(extendUserSession);
router.route("/sign-out").post(signOutFromTheAccount);
router.route("/:userId").delete(deleteAccount);

export default router;
