

//create gallery item

import GalleryItems from "../Models/galleryItem.js";

export function createGalleryItem(req, res){
    const galleryItem = req.body;
    console.log(galleryItem);

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
    GalleryItems.find().then((gallaryListData)=>{
        res.json({
              data: gallaryListData
        });
    }).catch(()=>{
      res.json({
        errorMsg: "Can't be found that your data"
      })
    })
}