import Joi from "@hapi/joi";
import { NextFunction, Request, Response } from "express";

export const RequestBodyValidator= (schema : Joi.ObjectSchema<any>)=>{
    return (req : Request, res : Response , next : NextFunction) => {
        const { error } = schema.validate(req.body);
      
        if (error) {
          return res.status(400).json({error :error.details[0].message});
        }
      
        next();
    };
}