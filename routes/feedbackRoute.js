import express from 'express';
import { AddFeedback, ApproveFeedback, DisapproveFeedback, getAllFeedback, getApproveFeedback, getNumberOfFeedbacks } from '../controllers/feedbackController.js';


const feedbackRouter = express.Router();

feedbackRouter.post('/', AddFeedback);
feedbackRouter.get('/', getAllFeedback);
feedbackRouter.get('/get-approved-feedback', getApproveFeedback)
feedbackRouter.get('/feedback-count', getNumberOfFeedbacks);
feedbackRouter.put('/approve', ApproveFeedback);
feedbackRouter.put('/disapprove-feedback/', DisapproveFeedback);

export default feedbackRouter;