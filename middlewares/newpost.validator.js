import { validationResult,body } from "express-validator";


export default async function newPostValidator(req,res,next){
    let rules = [
        body('caption').notEmpty().withMessage('Caption cannot be Empty'),
        body('image').custom((value, { req }) => {
            if (!req.file) {
                throw new Error('Image is required');
            }
            return true; 
        })
    ];

    await Promise.all(rules.map(rule=>rule.run(req)));
        let errors = validationResult(req);
        let errorArray = errors.array();

        if(errorArray.length==0){
            next();
        }
        else{
            req.errArray = errorArray;
            next();
        }
}