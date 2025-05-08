import { Router } from "express";
import { authController } from "../../../controllers/api/v1/authController";
import { authenticate } from "../../../middleware/authmiddleware";
import { signupValidationMiddleware } from "../../../middleware/signupValidationMiddleware";

const router = Router();

router.post("/signup", signupValidationMiddleware, authController.signup);
router.post("/login", authController.login);
router.get("/account", authenticate, authController.account);

export default router;
