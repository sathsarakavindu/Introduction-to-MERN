

//create gallery item

import GalleryItems from "../Models/galleryItem.js";

export function createGalleryItem(req, res){
const user = req.body.user;
    if(user == null){
       res.status(403).json({message: "Please login to create a gallery item."});
       return;
      }
    if(user.type != "admin"){
         res.status(403).json({message: "You don't have permission to create a gallery item"});
         return;
        }
    const galleryItem = req.body;
    

    const newGalleryItem = new GalleryItems(galleryItem);
    newGalleryItem.save().then((list)=>{
               res.json({
                messager: "Gallery item created",
                Gallery: list
               })
    }).catch((err)=>{
          res.status(500).json({
            message: "Gallery item not created.",
            error: err
          })
    });
}

export function getGalleryItems(req, res){
    GalleryItems.find().then((gallaryListData)=>{
      if(gallaryListData != null){
        res.json({
              data: gallaryListData
        });
      }
        else {res.status(404).json({msg: "No Gallery Items"});}
    }).catch(()=>{
      res.json({
        errorMsg: "Can't be found that your data"
      })
    })
}


export function deleteGalleryItem(req, res){
  const id = req.params.id;
  const user = req.body.user;
    if(user == null){
       res.status(403).json({message: "Please login to create a gallery item."});
       return;
      }
    if(user.type != "admin"){
         res.status(403).json({message: "You don't have permission to create a gallery item"});
         return;
      }

    GalleryItems.findByIdAndDelete(id).
    then(()=>{
      res.json({message:"Gallery item successfully deleteModel."});
    })
    .catch(()=>{
      res.status(500).json({message: "Gallery item deletion failed."});
    })
}

export function updateGalleryItem(req, res){

    const id = req.params.id;
    const user = req.body.user;

    if(user == null){
      res.status(403).json({message: "Please login to create a gallery item"});
    return;
    }

    if(user.type != "admin"){
      res.status(403).json({message: "You are not authorized to create a gallery item."})
      return;
    }

    const galleryItem = req.body;
    GalleryItems.findByIdAndUpdate(id, galleryItem).then(
      ()=>{
        res.json({
          message: "Gallery item updated successfully."
        });
      }
    ).catch(()=>{
       res.status(500).json({
        message: "Gallery item update failed"
       });
    })

}