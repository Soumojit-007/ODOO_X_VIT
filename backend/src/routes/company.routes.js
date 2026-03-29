import express from "express";
import * as companyController from "../modules/company/company.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", companyController.getCompany);
router.put("/", companyController.updateCompany);

export default router;