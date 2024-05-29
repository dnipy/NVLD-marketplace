import { Router } from "express";
import user_router from "./user.routes";
import auth_router from './auth.routes'

const api_router = Router();

api_router.get('/v1',(req,res)=>res.json({method : 'get',route : `/api`}))
api_router.use('/auth',auth_router)
api_router.use('/user',user_router)

export default api_router