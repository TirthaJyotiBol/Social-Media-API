import Express from "express";
import LikeController from "./likes.controller.js";

const likeRoute = Express.Router();

likeRoute.get('/:id',LikeController.getLikesByPost);
likeRoute.post('/delete/:id',LikeController.deleteLike);
likeRoute.post('/toggle/:id',LikeController.toggle);

export default likeRoute;