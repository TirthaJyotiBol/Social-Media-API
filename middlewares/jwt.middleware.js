import Jwt  from "jsonwebtoken";
import CustomError from "./custom.error.js";

let setJwtAuthentication=(req,res,next)=>{
    const token = req.cookies.token;

    if(!token){
        res.locals.userId  = null;
        res.redirect('/');
    }

    try{
        const payload = Jwt.verify(token,'secret-key');
        req.user = payload.id;
        res.locals.userId = payload.id;
        next();
    }
    catch(err){
        console.error(err);
        // throw new CustomError('Forbidden: Invalid User');
        next(new CustomError('Forbidden: Invalid User'));
    }
}

export default setJwtAuthentication;