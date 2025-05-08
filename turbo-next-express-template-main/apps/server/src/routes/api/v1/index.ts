import { Router } from "express";
import authRouter from "./auth.router";
import eventRoutes from "./event.routes";
import ticketRoutes from "./ticket.routes";

const v1Router = Router();

v1Router.use("/auth", authRouter);
v1Router.use("/events", eventRoutes);
v1Router.use("/tickets", ticketRoutes);

export { v1Router };
