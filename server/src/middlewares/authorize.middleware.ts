import { NextFunction, Request, Response } from "express";

// Reusable middleware function for checking request(user) authurization
export const Authorize = (req : Request, res : Response, next : NextFunction) => {

    if (Boolean(false)) {
        return res.status(401).json({ error: `منع دسترسی به سرویس به علت نامعتبر بودن نشست` });
    }

    // Continue to the next middleware or route handler
    next();
};
