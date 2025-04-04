import { RequestHandler } from "express";
import { v1Response } from "@repo/backend/lib/utils/responseHandler";
import { authService } from "../../../services/auth.service";

class AuthController {
  signup: RequestHandler = async (req, res) => {
    try {
      console.log("req.body",req.body);
      
      const { name, email, password, role } = req.body;
      const user = await authService.registerUser(name, email, password, role);
      return res.status(201).json(v1Response(user, "User registered successfully"));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong";
      return res.status(500).json(v1Response(null, errorMessage));
    }
  };
}

export const authController = Object.freeze(new AuthController());
