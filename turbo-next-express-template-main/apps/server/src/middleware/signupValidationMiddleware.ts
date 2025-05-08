import { Request, Response, NextFunction } from "express";
import { z } from "zod";

const schema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["user", "organizer", "admin"]),
});

export const signupValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (error: any) {
    return res.status(400).json({ success: false, message: error.errors[0]?.message });
  }
};
