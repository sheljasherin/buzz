import "express-async-errors";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import swaggerUi from "swagger-ui-express";
import "dotenv/config";
import { router } from "./routes";
import { errorHandler } from "@repo/backend/lib/errors/errorHandler";
import { NotFoundError } from "@repo/backend/lib/errors/NotFoundError";
import { ForbiddenError } from "@repo/backend/lib/errors/ForbiddenError";
import swaggerSpec from "./swagger/swaggerSpec";
import { sequelize } from './helpers/sequelize';
import { applyAssociations } from './models/association';
import './models/event.model';
import './models/ticket.models';

const allowList = process.env.ALLOWED_IP_LIST?.split(",").map(ip => ip.trim()) || [];

const app = express();
applyAssociations();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }));
app.use(cors({
  origin: "http://localhost:3000", // ✅ your frontend URL
  credentials: true,               // ✅ allow cookies or credentials
}));

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const clientIP = req.ip;
  if (!allowList.length || allowList.includes(clientIP!)) next();
  else throw new ForbiddenError();
});

app.use("/", router);

app.use((req, res, next) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
