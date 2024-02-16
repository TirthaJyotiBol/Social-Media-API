import CustomError from "../../../middlewares/custom.error.js";

export default class PostModal{
    constructor(id,userId,caption,imageUrl,userName,saved){
        this.id = id;
        this.userId = userId;
        this.caption = caption;
        this.imageUrl = imageUrl;

        // change
        this.userName = userName;
        this.saved = saved;
    }


    static displayAllPosts(){
        return posts;
    }

    static findPostByID(id){
        let post = posts.find((curr)=>{
            return String(curr.id) === String(id);
        });

        return post;
    }

    static displayPostByID(userId){
        let myPosts = posts.filter((curr)=>{
            return String(curr.userId)===String(userId);
        });

        return myPosts;
    }

    static uploadPost(userId,caption,imageUrl,userName){
        let id = posts.length+1;
        posts.push(new PostModal(id,userId,caption,imageUrl,userName,false));
    }

    static deletePost(id){
        let findIndex = posts.findIndex((curr)=>{
            return String(id)=== String(curr.id);
        });

        if(findIndex){
            posts.splice(findIndex,1);
        }
        else{
            throw new CustomError(`Post for id ${id} is not found `);
        }
    }

    static updatePost(imageUrl,postId,caption)  {
        let findIndex = posts.findIndex((curr)=>{
            return curr.id == postId;
        });

        if(findIndex){
            posts[findIndex].imageUrl = imageUrl;
            posts[findIndex].caption = caption;
        }
        else{
            return "ERROR";
        }
    }

    static savePost(userId,postId){

        // check if post is already saved
        let checkSave = posts.find((curr)=>{
            return String(curr.userId)===String(userId) && String(curr.id)===String(postId);
        });
        console.log(checkSave);

        if(checkSave){
            if(checkSave.saved==true){
                checkSave.saved = false;
            }
            else{
              checkSave.saved = true;
            }
        }
        else{
            checkSave.saved = true;
        }
    }

    static savedPosts(userId){
        let savedPost = posts.filter((curr)=>{
            return curr.saved==true && String(curr.userId)=== String(userId) ;
        });
        return savedPost;
    }

    static filterPosts(keyword){
        let filteredPosts = posts.filter((curr)=>{
            return curr.caption.includes(keyword) || String(curr.userName)==String(keyword);
        });

        return filteredPosts;
    }

}



let posts = [
    // changes in last field
    new PostModal(1,1,'A bustling cityscape with skyscrapers reaching towards the cloudy sky, illuminated by the glow of streetlights','pic1.jpg',"Tirtha",false),
    new PostModal(2,1,'A colorful array of fruits and vegetables neatly arranged in a farmer market stall','img2.jpg',"Tirtha",false),
    new PostModal(3,1,'A majestic waterfall cascading down rugged cliffs into a crystal-clear pool below.','pic1.jpg',"Tirtha",false),
    new PostModal(4,1,'A peaceful countryside scene with rolling hills and a rustic wooden fence.','pic1.jpg',"Tirtha",false),
    new PostModal(5,1,'A close-up of delicate cherry blossoms in full bloom, against a backdrop of soft pink petals','pic1.jpg',"Tirtha",false),
    new PostModal(6,1,'A majestic waterfall cascading down rugged cliffs into a crystal-clear pool below.','pic1.jpg',"Akshu",false),
    new PostModal(7,5,'A majestic waterfall cascading down rugged cliffs into a crystal-clear pool below.','pic1.jpg',"Bol",false)
]


let savedPosts = [];