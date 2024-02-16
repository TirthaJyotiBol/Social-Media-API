import Express from "express";
import CommentController from "./comments.controller.js";


const CommentRouter = Express.Router();

CommentRouter.get('/:id',CommentController.displayComments);
// CommentRouter.get('/delete',CommentController.deleteComment);
CommentRouter.get('/delete/:id',CommentController.deleteComment);
CommentRouter.post('/update/:id',CommentController.updateComment);

CommentRouter.post('/add/:id',CommentController.addComment);


export default CommentRouter;