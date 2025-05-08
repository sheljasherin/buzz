import { Router } from "express";
import { eventController } from "../../../controllers/api/v1/event.controller";
import { validateEvent } from "../../../middleware/validateEventMiddleware";
import { getUserEvents } from "../../../controllers/api/v1/userEvent.controller";

const router = Router();

router.post("/", validateEvent, eventController.create);
router.get("/", eventController.list);
router.get("/:organizer_id", eventController.listByOrganizer);
router.put("/:id/status", eventController.updateStatus); // for status updates
router.put("/:id", eventController.updateEvent);         // for full event edits
router.get('/user/events',getUserEvents);





export default router;
