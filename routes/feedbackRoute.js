import express from 'express';
import { AddFeedback, ApproveFeedback, DisapproveFeedback, getAllFeedback } from '../controllers/feedbackController.js';

const feedbackRouter = express.Router();

feedbackRouter.post('/', AddFeedback);
feedbackRouter.get('/', getAllFeedback);
feedbackRouter.put('/approve', ApproveFeedback);
feedbackRouter.put('/disapprove-feedback/', DisapproveFeedback);

export default feedbackRouter;