import mongoose from "mongoose";

const galleryItemSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
         image: {
            type: String,
            required: false
         },
         description: {
            type: String,
            required: true
         }   
    }
);

const GalleryItems = mongoose.model("galleryItems", galleryItemSchema);

export default GalleryItems;