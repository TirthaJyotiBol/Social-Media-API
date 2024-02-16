import PostModal from "../posts/post.modal.js";
import CommentModal from "./comments.modal.js";

export default class CommentController{
    static displayComments(req,res){
        let postId = req.params.id;
        let post = PostModal.findPostByID(postId);

        let filteredComments = CommentModal.fetchCommentByPostId(postId);

        
        res.render('comments',{post:post,comments:filteredComments});
    }


    static deleteComment(req,res){
        let deleteId = req.params.id;
        let arr = deleteId.split('&');

        let commentId = arr[0];
        let postId = arr[1];
        CommentModal.deleteByID(commentId);
        res.redirect('/api/comments/'+postId);
    }

        // comment with id commentId to be updated and the page should redirect to comments with postId : postid

    static updateComment(req,res){
        let commentId = req.params.id;
        let {new_comment,postid} =  req.body;

        CommentModal.updateById(commentId,new_comment);

        res.redirect('/api/comments/'+postid);
    }

    static addComment(req,res){
        let postId = req.params.id;
        let {add_comment,userid} = req.body; 

        if(add_comment.length>0){
            CommentModal.addComment(postId,userid,add_comment);
        }

        res.redirect('/api/comments/'+postId);
    }


}