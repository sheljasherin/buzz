import express from "express";
import { apiRouter } from "./api";

const router = express.Router();

router.use("/api", apiRouter); // final route: /api/v1/auth

export { router };
