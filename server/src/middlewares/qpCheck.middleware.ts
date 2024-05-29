import { NextFunction, Request, Response } from "express";

// Reusable middleware function for checking query parameters
export const checkQueryParams = (requiredParams : Array<string>) => {
    return (req : Request, res : Response, next : NextFunction) => {
      const queryParameters = req.query;
  
      // Check if all required parameters are present
      const missingParams = requiredParams.filter(param => !queryParameters.hasOwnProperty(param));
  
      if (missingParams.length > 0) {
        return res.status(400).json({ error: `Missing required query parameters: ${missingParams.join(', ')}` });
      }
  
      // Continue to the next middleware or route handler
      next();
    };
}