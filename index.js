import Express from "express";
import path from "path";
import expressEjsLayouts from "express-ejs-layouts";
import cookieParser from "cookie-parser";

import userRouter from "./backend/src/user/user.routes.js";
import CustomError from "./middlewares/custom.error.js";
import postRouter from "./backend/src/posts/posts.routes.js";
import setJwtAuthentication from "./middlewares/jwt.middleware.js";
import CommentRouter from "./backend/src/comments/comments.routes.js";
import likeRoute from "./backend/src/likes/likes.routes.js";
import WinstonloggerMiddleware from "./middlewares/logger.middleware.js";


const server = Express();

server.use(Express.json());
server.use(cookieParser());
server.use(expressEjsLayouts);
server.use(Express.static(path.join(path.resolve(),'public')))
server.set('views',path.join(path.resolve(),'public','views'));
server.set('view engine','ejs');
server.use(Express.urlencoded({extended:true}));
server.use(WinstonloggerMiddleware);




server.use('/api/user',userRouter);
server.use('/api/post',[setJwtAuthentication],postRouter);
server.use('/api/comments',[setJwtAuthentication],CommentRouter);
server.use('/api/likes',[setJwtAuthentication],likeRoute);

server.get('/',(req,res)=>{
    if(req.cookies.currentUserId){
        console.log(req.cookies.currentUserId);
        // res.locals.userId  = 2;
    }
    res.render('index');
})


server.use((req,res)=>{
    res.render('pagenotfound');
});

//  custom error
server.use((err,req,res,next)=>{
    if(err){
        if(err instanceof CustomError){
            res.send(err.message)
        }
        else{
            res.send(err);
        }
    }
})

server.listen(8000,()=>{
    console.log(`Listening to port ${8000}`);
});