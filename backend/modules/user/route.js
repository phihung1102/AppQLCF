import express from "express";
import { getAllCTL, createUserCTL, updateUserCTL, deleteUserCTL } from "./controller.js";

const router = express.Router();

router.get("/", getAllCTL);
router.post("/", createUserCTL);
router.put("/:id/role", updateUserCTL);
router.delete("/:id", deleteUserCTL);

export default router;