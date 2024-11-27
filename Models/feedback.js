import mongoose from "mongoose";

const feedbacks = mongoose.Schema({
    Feedback_id:{
        type: Number,
        required: true
    },
    User_id:{
        type: String,
        required: true
    },
    User_name: {
        type: String,
        required: true
    },
    Room_id: {
        type: Number,
        required: true
    },
    Room_name: {
        type: String,
        required: true
    },
    Feedback: {
        type: String,
        required: true
    },
    Approvel: {
        type: Boolean,
        required: true,
        default: false
    }
})

const FeedbackData = mongoose.model("Feedback", feedbacks);
export default FeedbackData;