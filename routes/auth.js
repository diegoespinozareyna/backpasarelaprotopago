import { Router } from 'express';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { handleNewPayProntopago } from '../handlers/handleNewPayProntopago.js';
import { handleReceptionPayProntopago } from '../handlers/handleReceptionPayProntopago.js';

const app = express();

dotenv.config();

app.use(cors());

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(express.text({ limit: '200mb' }));

const router = Router();

// prontopago
router.post("/newPay", handleNewPayProntopago);
router.post("/receptionPay", handleReceptionPayProntopago);

export default router;