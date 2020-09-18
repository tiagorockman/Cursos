import express from 'express';
import transactionRouter = express.Router();
import controller from '../controllers/transactionController.js';

transactionRouter.get('/', controller.getTransaction);

export { transactionRouter as routes }
