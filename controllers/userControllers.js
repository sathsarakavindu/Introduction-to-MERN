import User from "../Models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";


export function postUsers(req, res){
  
    const user = req.body;
    console.log(user);

    const password = req.body.password;
    const passwordHash = bcrypt.hashSync(password, 10);
    user.password = passwordHash;
    const newUser = new User(user);
    newUser.save().then(()=>{
        res.json({message: "User created successfully!"})
    }).catch((error)=>{
      console.log(error)
       res.json({message:"User creation failed."});
    });
   
};

export function loginUser(req, res){
  
  const credentials = req.body;


  User.findOne({email: credentials.email})
  .then((user)=>{
       if(user == null){
           res.status(404).json({
            message: "User not found.!"
           })
       }
       else{

        const isPasswordValid = bcrypt.compareSync(credentials.password, user.password);
        
       if(!isPasswordValid){

            res.status(403).json({
              message: "Incorrect password."
            })
       }
       else{
        const payload = {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
        };

        const token = jwt.sign(payload,"secret",{ expiresIn: "1h" });

        res.json({
          message: "User found",
          user: user,
          token: token
        });

       }
      
       
       }
  });


}
