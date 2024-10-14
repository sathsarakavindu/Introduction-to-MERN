
import category from "../Models/category.js";
import { isAdminValid } from "./userControllers.js";

export function createCategory(req, res){
     const user = req.user;
       if(user == null){
        res.status(403).json({
            message: "Please login to create categories."
        });
        return;
       }
       console.log(`User's type ${user.type}`);
       if(user?.type != "admin"){
          res.status(403).json({
            msg: "You don't have permission to create categories"
          });
          return;
       }

       const categories = req.body.categories;

       const adding = new category(categories);
       adding.save().then((result)=>{
           res.status(200).json({
            message: "You successfully created a category.",
            Saved: result
           })
       }).catch((err)=>{
          res.status(500).json({
            message: "Your category wasn't added.",
            error: err
          })
       })

}

export function viewCategory(req, res){

      category.find().then((cat_list)=>{
         if(cat_list != null)
           res.status(200).json({
            categories: cat_list
           });
           else res.status(404).json({
            message: "Not found"
           });
      }).catch(()=>{
         res.status(403).json({
            message: "Category can't be found."
         })
      })

}

export function deleteCategory(req, res){

   const name = req.params.name;

   //const item = req.body.name;

   if(name != null){
      category.findOne({category_name: name}).then((result)=>{
         if(result != null){
            category.deleteOne({category_name: name}).then(()=>{
               res.status(200).json({message: "Category Successfully Deleted"});
               return;
            }).catch(()=>{
               res.status(404).json({message: "Category can't be Deleted"})
            })
         }
         else{
            res.status(200).json({message: "Can't be found."});
         }
      });
   }
}

export function getCategoryByName(req, res){
   const name = req.params.name;
   category.findOne({category_name: name}).then((cat)=>{
              if(cat != null){
               res.status(200).json({
                 category: cat
               });
              }
              else{
               res.status(404).json({
                  msg: "Not found."
                });
              }
   }).catch(()=>{
      res.status(500).json({
         error: "Faled to get category"
       });
   });
}

export function getCategoryByPrice(req, res){
   const price_search = req.params.price;
   category.findOne({price: price_search}).then((list)=>{
          if(list != null){
            res.status(200).json({
               price_list: list
            });
          }
          else{
            res.status(403).json({
               status: "No categories are available."
            });
          }
   }).catch(()=>{
      res.status(500).json({
         status: "Can't find category."
      });
   });
}

export function updateCategory(req, res){


  if(!isAdminValid(req)){
  res.status(403).json({
   msg: "Unauthorized"
  });
  return;
  }
  const name = req.params.name;

  category.updateOne({category_name: name}, req.body).then((updateList)=>{
  res.json({
    message: "Category updated successfully.",
    list: updateList
  });
  }).catch(()=>{
   res.json({error: "Failed to update"});
  });

}

