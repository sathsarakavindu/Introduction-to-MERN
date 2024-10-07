

//create gallery item

import GalleryItems from "../Models/galleryItem";

export function postGalleryItem(req, res){
    const galleryItem = req.body;
    const newGalleryItem = new GalleryItems(galleryItem);
    newGalleryItem.save().then(()=>{
               res.json({
                messager: "Gallery item created"
               })
    }).catch(()=>{
          res.status(500).json({
            message: "Gallery item not created."
          })
    });
}

export function getGalleryItems(req, res){
    GalleryItems.find().then(()=>{
        
    })
}