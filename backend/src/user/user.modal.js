import CustomError from "../../../middlewares/custom.error.js";

export default class UserModal {
    constructor(userId,userName,userPassword,userEmail){
        this.userId = userId;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userName = userName;
    }

    static registerUser(userEmail,userName,userPassword){
        let checkUser = users.find((currUser)=>{
            return String(currUser.userEmail)===String(userEmail)
        });

        if(checkUser){
            throw new CustomError('User Already Registered')
        }
        users.push(new UserModal(users.length+1,userName,userPassword,userEmail));

    }

    static loginUser(userEmail,userPassword){
        let checkUser = users.find((currUser)=>{
            return String(currUser.userEmail)===String(userEmail) &&
                   String(currUser.userPassword) === String(userPassword)
        });

        if(checkUser){
            return checkUser;
        }
        else{
            throw new CustomError('User Not Registered')
        }

    }

    static getUserByID(userId){
        let user = users.find((curr)=>{
            return String(curr.userId) === String(userId);
        });
        return user;
    }


}



let users = [
    new UserModal(1,'Tirtha','1234','tirtha125@gmail.com'),
    new UserModal(2,'Anandita','1234','anandita47@gmail.com'),
    new UserModal(3,'Tini','1234','ddt@gmail.com'),
    new UserModal(4,'Piyush','1234','bansal@gmail.com'),
    new UserModal(5,'Bol','1','bol@gmail.com')
]