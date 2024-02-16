import { validationResult,body } from "express-validator";


export default async function validateLogin(req,res,next){
    let rules = [
        body('email').isEmail().withMessage('Invalid Email'),
        body('password').notEmpty().withMessage('Password Cannot be Empty')
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