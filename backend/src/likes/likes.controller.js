import LikeModal from "./likes.modal.js";
import UserModal from "../user/user.modal.js";
import PostModal from "../posts/post.modal.js";

export default class LikeController{
    static getLikes(req,res){
        res.send('Likes age ')
    }

    static getLikesByPost(req,res){
        let postId = req.params.id;
        let post = PostModal.findPostByID(postId);
        let likesByPost = LikeModal.getLikesByPostID(postId);
        let LikedUser = [];
        likesByPost.forEach((currLike)=>{
            let userId = currLike.userId;
            let postId = currLike.postId;
            let likeId = currLike.id;
            let user =  UserModal.getUserByID(userId);
            let userName = user.userName;
            let userEmail = user.userEmail;

            let obj = {
                userId,
                userEmail,
                postId,
                likeId,
                userName,
            };
            LikedUser.push(obj);
        })
        // res.json({
        //     postId,
        //     post
        // });
        res.render('likes',{likedUser:LikedUser,post:post});
    }

    static deleteLike(req,res){
        let likeId = req.params.id;
        let {postid} = req.body;
        LikeModal.deleteLikeByID(likeId);
        res.redirect('../../../api/likes/'+postid);
    }

    static toggle(req,res){
        let postId = req.params.id;
        let userId = req.body.userid;
        let like = LikeModal.toggleLike(userId,postId);
        res.redirect('../../../api/likes/'+postId);
    }

}