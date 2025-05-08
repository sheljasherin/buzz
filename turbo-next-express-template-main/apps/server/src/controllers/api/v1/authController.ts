import { Request, Response } from "express";
import { authService } from "../../../services/auth.service";
import { z } from 'zod';

// Define a Zod schema for signup validation on the backend.  This *must* match
// the schema on the frontend.  This is CRUCIAL for consistent validation.
const signupSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["user", "organizer", "admin"]),
});

export const authController = {
  signup: async (req: Request, res: Response) => {
    try {
        // 1.  Parse and validate the request body using the schema.
        const validatedData = signupSchema.parse(req.body);

        // 2.  Pass the validated data to your service.
      const user = await authService.signup(validatedData);
      res.status(201).json({ success: true, data: user, message: "User created successfully" });
    } catch (error: any) {
      // 3.  Handle errors consistently.  If it's a Zod error, we can extract
      //      the details.  Otherwise, handle it as a generic error.
      if (error instanceof z.ZodError) {
        res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors, // Send the Zod errors back
        });
      } else {
        res.status(400).json({ success: false, message: error.message || "Signup failed" });
      }
    }
  },

  login: async (req: Request, res: Response) => {
    try {
      const { token, user } = await authService.login(req.body.email, req.body.password);
      res.status(200).json({ success: true, data: { token, user }, message: "Login successful" });
    } catch (e: any) {
      res.status(401).json({ success: false, message: e.message });
    }
  },

  account: async (req: Request, res: Response) => {
    try {
      const user = await authService.getCurrentUser((req as any).user.id);
      res.json({ success: true, data: user, message: "Account data retrieved" });
    } catch (e: any) {
      res.status(404).json({ success: false, message: e.message });
    }
  }
};