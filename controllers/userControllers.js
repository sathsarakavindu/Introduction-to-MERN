import User from "../Models/user.js";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import Room from "../Models/room.js";
import nodemailer from 'nodemailer';
import Otp from "../Models/otp.js";


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
         const otp = Math.floor(1000 + Math.random() * 9000);

         const newOtp = new Otp({
          email: user.email,
          otp: otp
         });

         newOtp.save().then( ()=>{
          sendOtpEmail(user.email, otp);
             res.json({
              message: "User created successfully"
            });
         })

        // res.json({
        //   message: "User created successfully!"
        // })
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
      //  if(isAccountDisable(user)){
      //      res.status(500).json({Restricted: "Your account has been banned"});
      //      return;
      //  }
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
  if(req.body.user == null){
    console.log("Request user is " + req.body.user);
      return false;
  }
  if(req.body.user.type != "admin"){
    
    return false;
  }
  return true;
}

export function isCustomerValid(req, res){

  if(req.body.user == null){
   console.log("User is null");
    return false;
  }
  if(req.body.user.type != "customer"){
    console.log("User is not a customer");
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


export function userEnable(req, res){
  if(isAdminValid(req)){
    User.findOneAndUpdate({email: req.body.email}, {disabled: false}).then((result)=>{
      res.status(200).json({
        message: "User account successfully enabled!", 
        result: result});
    }).catch((err)=>{
      res.status(500).json({
        message: "User account can't be enabled!", 
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

export function isAccountDisable(user){
        if(user.disabled == false){
          return false;
        }
        else{
          return true;
        }
}

// export function getOnlyCustomers(req, res){
//   if(isAdminValid(req)){
//     console.log("Admin");
//     User.find({type: 'customer'}).
//     then((result)=>{
//       res.status(200).json({
//         message: "Found users", 
//         result: result
//       });
//     })
//     .catch((err)=>{console.log(err)});
//   }
//   else{
//     console.log("You have no access to manage users.");
//   }
   
// }

export function getOnlyCustomers(req, res) {
  if (isAdminValid(req)) {
    console.log("Admin");

    // Extract page number and page size from query parameters
    const { page = 1, pageSize = 10 } = req.body;

    // Convert to integers (defaults: page 1, pageSize 10)
    const pageNum = parseInt(page, 10);
    const pageLimit = parseInt(pageSize, 10);

    User.find({ type: 'customer' })
      .skip((pageNum - 1) * pageLimit) // Skip documents for previous pages
      .limit(pageLimit) // Limit the number of documents per page
      .then((users) => {
          User.countDocuments().then((totalCount)=>{
            res.json({
              message: "User found",
              users: users,
              pagination:{
                currentPage: page,
                pageSize: pageSize,
                totalUsers: totalCount,
                totalPages: Math.ceil(totalCount / pageSize),
              },
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          message: "Error retrieving users",
          error: err,
        });
      });
  } else {
    res.status(403).json({
      message: "You have no access to manage users.",
    });
  }
}





export function sendOtpEmail(email, otp){
  
  console.log(`Email is ${email} and OTP is ${otp} `);

  const transport = nodemailer.createTransport(
    {
       service: 'gmail',
       host: "smtp.gmail.com",
       port: 587,
       secure: false,
       auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILKEY,
       },
    }
  );

    const message = {
      from: process.env.EMAIL,
      to: email,
      subject: "Validate OTP",
      text: "Your OTP code is " + otp
    }
    
    transport.sendMail(message, (err, info)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log(info);
      }
    });

}

export function verifyUserEmail(req, res){

  const otp = req.body.otp;
  const email = req.body.email;

  Otp.find({email: email}).sort({date: -1}).then((otpList)=>{
    if(otpList.length == 0){
      res.json({message: "OTP is invalid"});

    }
    else{
      const latestOTP = otpList[0];
      if(latestOTP.otp == otp){
        User.findOneAndUpdate({email: email}, {emailVerified: true}).then(()=>{
          res.json({messsage: " User email verified successfully."});
        })
         
      }
      else{
        res.json({message: "OTP is invalid."});
      }
    }
  })

}