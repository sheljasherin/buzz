import { Router } from "express";
import { authController } from "../../../controllers/api/v1/auth.controller";
import { validateRequest } from "../../../middleware/validaterequest";
import { signupSchema } from "../../../validation/auth.validation";
const authRouter = Router();
authRouter.post(
    "/register", 
    // validateRequest(signupSchema),
    authController.signup);
export { authRouter };
