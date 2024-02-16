import multer from "multer";
import path from 'path';


let storage = multer.diskStorage({
    filename:(req,file,callback)=>{
        let date = new Date();
        let fileName = `${date.getTime()}-${date.getMilliseconds()}-${date.getHours()}-${file.originalname}`
        callback(null,fileName);
    },
    destination:(req,file,callback)=>{
        let des = path.join(path.resolve(),'public','Images');
        callback(null,des);
    }

});

let upload = multer({storage});
export default upload;