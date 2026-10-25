import type { Response, Request, NextFunction } from "express";
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.accessToken;

    if (!token) {
        res.status(401).json({
            success: false,
            message: "Authentication token is required"
        })
        return;
    }
    const secret = process.env.JWT_SECRET;
    if (!secret) { next(new Error("JWT_SECRET is missing in .env")); return; }
    try {
        const decoded = jwt.verify(token, secret, {
            algorithms: ["HS256"],
        });
        if (typeof decoded === 'string' || typeof decoded.userId !== "string") {
            res.status(401).json({
                success: false,
                message: "Invalid token payload"
            })
            return;
        };
        res.locals.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
}