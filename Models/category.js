
import mongoose from "mongoose";

const categoryData = mongoose.Schema({
    category_name:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
    },
    price:{
        type: Number,
        require: true
    }
});

const category = mongoose.model("category", categoryData);
export default category;