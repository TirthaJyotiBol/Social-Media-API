import PostModal from "./post.modal.js";
import UserModal from "../user/user.modal.js";
import LikeModal from "../likes/likes.modal.js";


export default class PostController{

    static renderPosts(req,res){
        res.render('posts',{posts:null,showFilter:true});
    }

    static displayPostByID(req,res){
        let userId = req.user;
        let myPosts = PostModal.displayPostByID(userId);
        res.render('posts',{posts:myPosts,showFilter:false});
    }

    static showNewPostForm(req,res){
        let userId = req.user;
        res.render('newpost',{userId:userId,errArray:null})
    }

    static displayAllPosts(req,res){
        let allPosts = PostModal.displayAllPosts();
        res.render('posts',{posts:allPosts,showFilter:true})
    }

    static uploadPost(req,res){
        let errArray = req.errArray;
        let userId = req.body.userId;

         if(errArray){
            console.log(errArray);
            return res.render('newpost',{userId:userId,errArray:errArray});
          }

        // get username
        let user = UserModal.getUserByID(userId);
        let imageUrl = req.file.filename;
        let caption = req.body.caption;
    
        PostModal.uploadPost(userId,caption,imageUrl,user.userName);
        res.redirect('/api/post/all');
    }

    static deletePost(req,res){
        let postId = req.params.id;
        try{
            PostModal.deletePost(postId);
            res.redirect('/api/post/all');
        }
        catch(err){
            console.log(err);
        }
    }

    static redirectUpdateForm(req,res){
        let postId = req.params.id;
        let currentPost = PostModal.findPostByID(postId);
        res.render('updatePost',{errArray:null,currentPost:currentPost});
    }

    static updatePost(req,res){
        let errArray = req.errArray;
        if(errArray){
            let postId = req.params.id;
            let currentPost = PostModal.findPostByID(postId);
            return res.render('updatePost',{currentPost:currentPost,errArray:errArray});
        }

        let imageUrl = req.file.filename;
        let caption = req.body.caption;
        let postId = req.params.id;
            
        let err = PostModal.updatePost(imageUrl,postId,caption);
        if(err){
            return res.send(err);
        }
        res.redirect('/api/post/all');
    }


    static savePost(req,res){
        let {userid,postid} = req.body;
        PostModal.savePost(userid,postid);
        res.redirect('/api/post/all');
    }

    static showSavedPost(req,res){
        let userId = req.user;
        let savedPosts = PostModal.savedPosts(userId);
        res.render('posts',{posts:savedPosts,showFilter:false});
    }

    static filterPosts(req,res){
        let posts = PostModal.filterPosts(req.body.filter_keyword);
        res.render('posts',{posts:posts,showFilter:false});
    }
}