import express, { Request, Response } from "express";
import { userControllers } from "./user.controller";

const router = express.Router();

// post
router.post("/", userControllers.createUser);

// get users
router.get("/", userControllers.getUser);

// get single user
router.get("/:id", userControllers.getSingleUser);

// update user
router.put("/:id", userControllers.updateUser);

// delete user
router.delete("/:id", userControllers.deleteUser);

export const userRoutes = router;
