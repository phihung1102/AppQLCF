import express from "express";
import { registerCTL, loginCTL, logoutCTL, refreshCTL  } from "./controller.js";
import { validateRegister, validateLogin } from "../../middlewares/validators.js";

const router = express.Router();

router.post("/register", validateRegister, registerCTL);
router.post("/login", validateLogin, loginCTL);
router.post("/refresh", refreshCTL);
router.post("/logout", logoutCTL);

export default router;