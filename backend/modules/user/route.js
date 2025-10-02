import express from "express";
import { getAllCTL, getUserByIdCTL, createUserCTL, updateUserCTL, updateUserInfoCTL , deleteUserCTL } from "./controller.js";

const router = express.Router();

router.get("/", getAllCTL);
router.get("/:id", getUserByIdCTL);
router.post("/", createUserCTL);
router.put("/:id/role", updateUserCTL);
router.put("/:id/info", updateUserInfoCTL);
router.delete("/:id", deleteUserCTL);

export default router;