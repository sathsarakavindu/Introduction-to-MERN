

//create gallery item

import GalleryItems from "../Models/galleryItem.js";

export function createGalleryItem(req, res){
const user = req.user;
    if(user == null){
       res.status(403).json({message: "Please login to create a gallery item."});
       return;
      }
    if(user?.type != "admin"){
         res.status(403).json({message: "You don't have permission to create a gallery item"});
         return;
        }
    const galleryItem = req.body.item;
    

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
