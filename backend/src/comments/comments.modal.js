export default class CommentModal{
    constructor(id,userId,postId,content){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static fetchComments(){
        return comments;
    }

    static fetchCommentByPostId(postId){
        let filteredCommnents = comments.filter((curr)=>{
            return String(curr.postId) === String(postId);
        });

        return filteredCommnents;
    }

    static deleteByID(commentId){
        let deleteIndex = comments.findIndex((curr)=>{
            return String(commentId) === String(curr.id);
        });
        comments.splice(deleteIndex,1);
    }

    static updateById(commentId,newComment){
        let fetchComment = comments.find((curr)=>{
            return String(curr.id)===String(commentId);
        });

        fetchComment.content = newComment;

    }

    static addComment(postId,userId,comment){
        let commentId = comments.length+1;
        comments.push(new CommentModal(commentId,Number(userId),Number(postId),comment));
    }

}


let comments = [
    new CommentModal(1,1,2,'Looks Great ❤️'),
    new CommentModal(2,3,4,'Superb ❤️'),
    new CommentModal(3,5,6,'Fab 👍'),
    new CommentModal(4,2,3,'Like it 💯'),
    new CommentModal(5,1,3,'Looks Great ❤️'),
    new CommentModal(6,3,8,'Superb ❤️'),
    new CommentModal(7,5,2,'Fab 👍'),
    new CommentModal(8,2,3,'Like it 💯')
];