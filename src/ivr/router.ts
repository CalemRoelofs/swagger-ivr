import express, { Router, Request, Response } from 'express';
import { welcome, menu } from './handler';

const router: Router = express.Router();

router.post('/welcome', (req: Request, res: Response) => {
  res.send(welcome());
});

router.post('/menu', (req: Request, res: Response) => {
  const digit = req.body.Digits;
  return res.send(menu(digit));
});

router.post('/analytics', (req: Request, res: Response) => {
  console.log(req.body);
  return res.end();
});

router.get('/', (req: Request, res: Response) => {
  res.json({ 'swagger': 'ivr' });
});

router.get('/error', (req: Request, res: Response) => {
  res.json({ 'error': 'kurwa' });
});

export default router;