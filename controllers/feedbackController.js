import FeedbackData from "../Models/feedback.js";
import { isAdminValid } from "./userControllers.js";

export function AddFeedback(req, res){
     
      if(req.body.user == null){
          res.status(404).json({
            msg: "Please login befor adding the feedback.."
          });
          return;
      }
      else{
        const feedbackData = req.body;

        const addFeedbacks = new FeedbackData(feedbackData);
        addFeedbacks.save().then((result)=>{
            res.status(200).json({
                message: "Feedback added", 
                data: result
           })
        }).catch((err)=>{
            res.status(404).json({
                msg: "Feedbacks can't be added.",
                error: err 
            })
        });
      }
}

export function getAllFeedback(req, res){
  if(req.body.user == null){
    res.status(404).json({
      msg: "Please login befor adding the feedback.."
    });
    return;
   }
   else{
    FeedbackData.find()
    .then((result)=>{
      res.status(200).json({
        message: "All feedbacks", 
        result: result
      });
    }).
    catch((err)=>{
      res.status(500).json({
        msg: "Can't be fetched feedbacks", 
        error: err
      })
    });

   }

}



export function ApproveFeedback(req, res){

         if(isAdminValid(req)){
            const feedbackId = req.body.Feedback_id;
            console.log("Feed ID now "+feedbackId);
            FeedbackData.findOneAndUpdate({Feedback_id: req.body.Feedback_id}, {Approvel: true}).
            then((result)=>{
              console.log(result);
              res.status(200).json({
                message: "Successfully approved feedback", 
                result: result
              });
            }).
            catch((err)=>{
              console.log(err);
              res.status(500).json({
                message: "Can't be approved feedback", 
                error: err
              });
            });
         }
}

export function DisapproveFeedback(req, res){

  if(isAdminValid(req)){

     const feedbackId = req.body.Feedback_id;
     console.log("Feed ID now in disable"+feedbackId);
     FeedbackData.findOneAndUpdate({Feedback_id: req.body.Feedback_id}, {Approvel: false}).
     then((result)=>{
       console.log(result);
       res.status(200).json({
         message: "Successfully disapproved feedback", 
         result: result
       });
     }).
     catch((err)=>{
       console.log(err);
       res.status(500).json({
         message: "Can't be approved feedback", 
         error: err
       });
     });
  }
}