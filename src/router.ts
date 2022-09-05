import twilio from 'twilio';
import express, { Router, Request, Response } from 'express';
import ivrRouter from './ivr/router';

const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.json({ 'hello': 'world' });
});

router.use('/ivr', twilio.webhook({ validate: false }), ivrRouter);

export default router;