
import category from "../Models/category.js";

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
       adding.save().then(()=>{
           res.status(200).json({
            message: "You successfully created a category."
           })
       }).catch(()=>{
          res.status(500).json({
            message: "Your category wasn't added."
          })
       })

}

export function viewCategory(req, res){

      category.find().then((cat_list)=>{
           res.status(200).json({
            categories: cat_list
           })
      }).catch(()=>{
         res.status(403).json({
            message: "Category can't be found."
         })
      })

}