import { Router } from "express";
import { RequestBodyValidator } from "../../middlewares"
import Joi from '@hapi/joi'

const UserAddSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).max(30).required()
});



const router = Router();

router.get('/',(req,res)=>{
    return res.json({method : 'get',route : '/'})
})

router.get('/:user_id',(req,res)=>{
    const {user_id} = req.params;
    const {param_id} = req.query;
    return res.json({method : 'get',user_id,param_id })
})

router.get('/',(req,res)=>{
    return res.json({method : 'get',route : '/'})
})

router.post('/add',RequestBodyValidator(UserAddSchema),(req,res)=>{
    const {email,password} = req.body;
    return res.json({method : 'post',email ,password})
})

export default router;