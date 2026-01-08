import { Router } from "express";
import {
  createUserAccount,
  deleteUserAccount,
  signinUser,
  LogoutUser,
  extendUserSession,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/").post(createUserAccount);
router.route("/:userId").delete(deleteUserAccount);
router.route("/login").post(signinUser);
router.route("/logout").post(LogoutUser);
router.route("/refresh").post(extendUserSession);

export default router;
