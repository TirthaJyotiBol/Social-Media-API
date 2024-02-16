export default class LikeModal{
    constructor(id,userId,postId){
        this.id = id;
        this.userId = userId;
        this.postId = postId;       
    }

    static getLikes(){
        return likes;
    }

    static getLikesByPostID(postId){
        let like =  likes.filter((currLike)=>{
            return String(postId)===String(currLike.postId);
        });

        return like;
    }

    static deleteLikeByID(likeId){
        let likeIndex = likes.findIndex((curr)=>{
            return String(likeId) === String(curr.id);
        });
        likes.splice(likeIndex,1);
    }

    static toggleLike(userId,postId){
        let checkPostLiked = likes.find((curr)=>{
            return String(curr.userId)===String(userId) && String(curr.postId)===String(postId);
        });

        // if already liked then remove the like
        if(checkPostLiked){
            let likeId = checkPostLiked.id;
            this.deleteLikeByID(likeId);
            return false;
        }
        else{
            // add like
            let newLike = new LikeModal(likes.length+1,userId,postId);
            likes.push(newLike);
            return true;
        }
    }

}


let likes = [
    new LikeModal(1,1,1),
    new LikeModal(2,2,2),
    new LikeModal(3,3,3),
    new LikeModal(4,5,4),
    new LikeModal(5,5,5),
    new LikeModal(6,5,6),
    new LikeModal(7,5,1),
    new LikeModal(8,5,2),
    new LikeModal(9,1,3),
    new LikeModal(10,4,4)
];