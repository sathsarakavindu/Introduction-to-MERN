import User from "../Models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import Room from "../Models/room.js";

dotenv.config();

export function postUsers(req, res){
  
    const user = req.body;
    console.log(user);

    const password = req.body.password;
    const saltRounds = 10;
    const passwordHash = bcrypt.hashSync(password, saltRounds);
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
            });
            return;
       }
       if(isAccountDisable(user)){
           res.status(500).json({Restricted: "Your account has been banned"});
           return;
       }
       else{
        const payload = {
          id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          type: user.type,
        };

   const secret_key = process.env.SECRET_KEY;

        const token = jwt.sign(payload,secret_key,{ expiresIn: "1h" });

        res.json({
          message: "User found",
          user: user,
          token: token
        });

       }
      
       
       }
  });


}

export function isAdminValid(req){
  if(req.user == null){
      return false;
  }
  if(req.user.type != "admin"){
    
    return false;
  }
  return true;
}

export function isCustomerValid(req, res){

  if(req.user == null){
    return false;
  }
  if(req.user.type != "customer"){
       return false;
  }
  return true;

}

export function userDisable(req, res){
        if(isAdminValid(req)){
          User.findOneAndUpdate({email: req.body.email}, {disabled: true}).then((result)=>{
            res.status(200).json({
              message: "User account successfully disabled!", 
              result: result});
          }).catch((err)=>{
            res.status(500).json({
              message: "User account can't be disabled!", 
              error: err});
          });
        }else{
          
          return;
        }
}

export function getUser(req, res){
  const user = req.body.user;

  if(user == null){
    res.json({
      message: "Not found"
    });
  }
  else{
    res.json({
      message: "User found",
      user: user
    })
  }
}

function isAccountDisable(user){
        if(user.disabled == false){
          return false;
        }
        else{
          return true;
        }
}

