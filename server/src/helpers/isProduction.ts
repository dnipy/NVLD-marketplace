import { NodeEnv } from "../configs/index";

export const isProduction = ()=>{
    return NodeEnv === 'production' ? true : false
}