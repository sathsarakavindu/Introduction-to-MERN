import User from "../Models/user.js";


export function getUsers(req, res){
   User.find().then(
    (usersList)=>{
      res.json({
        list: usersList
      })
    }
  )
};

export function postUsers(req, res){
    const user = req.body;
    console.log(user);

    const newUser = new User(user);
    newUser.save().then(()=>{
        res.json({message: "User created successfully!"})
    }).catch(()=>{
       res.json({message:"User creation failed."});
    });
   
};

export function putUsers(req, res){
    res.json({
        message: "This is the put req"
    })
};
export function deleteUsers(req, res){
   const email = req.body.email;
   User.deleteOne({email: email}).then(()=>{
         res.json({
            msg: "Successfully deleted.!"
         })
   }).catch(()=>{
    res.json({
        msg: "Not deleted.!"
     })
   })
};

