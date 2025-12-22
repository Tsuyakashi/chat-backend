import express, { Router } from 'express';
import { chatRoutes } from './api/chatRoutes';

const router: Router = express.Router();

router.use('/chats', chatRoutes);

export { router }
