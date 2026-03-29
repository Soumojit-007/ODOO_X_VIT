import express from "express";
import * as userController from "../modules/users/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { allowRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", allowRoles("ADMIN"), userController.createUser);
router.get("/", userController.getUsers);
router.put("/:id/role", allowRoles("ADMIN"), userController.updateRole);
router.put("/:id/manager", allowRoles("ADMIN"), userController.assignManager);

export default router;