import UserModal from "./user.modal.js";
import Jwt from "jsonwebtoken";

export default class UserController{

   static renderLogin(req,res){
      res.render('login',{errors:null,userNotFound:null});
   }

   static renderRegister(req,res){
      res.render('register',{errors:null});
   }

     static addUser=(req,res)=>
     {
        let {name,email,password} = req.body;
        let errArray = req.errArray;

        if(errArray){
         return res.render('register',{errors:errArray})
        }

        UserModal.registerUser(email,name,password);
        res.redirect('/api/user/signin');
     }

     static loginUser(req,res){
         let {email,password} = req.body;
         let errArray = req.errArray;
         if(errArray){
            return res.render('login',{errors:errArray,userNotFound:null});
         }

         try{
            let user = UserModal.loginUser(email,password);

            let token = Jwt.sign(
               {
                  email:user.userEmail,
                  id:user.userId
               },
               'secret-key',
               {
                  expiresIn:'1h'
               }
            );

            res.cookie('token',token, { maxAge: 60*60*1000, httpOnly: true });
            res.cookie('currentUserId',user.userId, { maxAge: 60*60*1000, httpOnly: true });

            res.redirect('/api/post/all'); 
         }
         catch(err){
            return res.render('login',{errors:errArray,userNotFound:"user not found,please register"});
         }

     }
}