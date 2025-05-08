import { Router } from 'express';
import { bookTicketController } from '../../../controllers/api/v1/ticket.controller';

const router = Router();

router.post('/book', bookTicketController);

export default router;
