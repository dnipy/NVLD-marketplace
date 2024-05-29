import { Router } from "express";
import { RequestBodyValidator } from "../../middlewares"
import Joi from '@hapi/joi'
import { _prisma } from "@/src/configs/_Prisma";

const UserAddSchema = Joi.object({
  phone: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required(),
  captcha: Joi.number().required(),
});



const router = Router();


router.post('/login',RequestBodyValidator(UserAddSchema),async(req,res)=>{
    
    // body params
    const {phone,password,captcha} = req.body;

    // get user from db
    const user = await _prisma.user.findFirst()
    
    // if user exists and password was right send jwt token or send wrong passwd err
    if (user) {
        return res.json({method : 'post',jwt : "jwt"})
    }
    // if user doesnt exists create user and send a jwt token
    else {
        _prisma.user.create({
            data : {
                
            }
        })
        .then((data)=>{
            return res.json({method : 'post',jwt : "jwt"})
        })
    }
    return res.json({method : 'post',phone ,password})
})

export default router;