import mongoose from "mongoose";

const feedbacks = mongoose.Schema({
    User_id:{
        type: String,
        require: true
    },
    User_name: {
        type: String,
        require: true
    },
    Room_id: {
        type: Number,
        require: true
    },
    Room_name: {
        type: String,
        require: true
    },
    Feedback: {
        type: String,
        require: true
    },
    Approvel: {
        type: Boolean,
        require: true,
        default: false
    }
})

const FeedbackData = mongoose.model("Feedback", feedbacks);
export default FeedbackData;