
import mongoose from "mongoose";

const categoryData = mongoose.Schema({
    category_name:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true
    },
    features:[
        {
            type: String,
        }
    ],
    image: {
        type: String
    }
});

const category = mongoose.model("category", categoryData);
export default category;