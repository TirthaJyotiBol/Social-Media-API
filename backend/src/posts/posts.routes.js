import Express from "express";
import PostController from "./posts.controller.js";
import upload from "../../../middlewares/postform.upload.js";
import newPostValidator from "../../../middlewares/newpost.validator.js";

const postRouter = Express.Router();


postRouter.get('/', PostController.renderPosts);
postRouter.get('/all', PostController.displayAllPosts);
postRouter.get('/upload',PostController.showNewPostForm);
postRouter.get('/myposts',PostController.displayPostByID);
postRouter.post('/delete/:id',PostController.deletePost);
postRouter.post('/update/:id',PostController.redirectUpdateForm);
postRouter.post('/updatepost/:id',[upload.single('image'),newPostValidator],PostController.updatePost);

postRouter.post('/save',PostController.savePost);
postRouter.get('/savedposts',PostController.showSavedPost);
postRouter.post('/filter',PostController.filterPosts);

postRouter.post('/upload',[upload.single('image'),newPostValidator],PostController.uploadPost);

export default postRouter;