import type { NextFunction, Request, Response } from 'express';
import { createUser, loginUserService } from '../services/auth.service.js';
import { generatedToken } from '../utils/jwt.js';
import { Session } from '../models/session.model.js';
import { hashRefreshToken, generateRefreshToken } from '../utils/refreshToken.js';
interface RegisterRequestBody {
    name?: string,
    email?: string,
    password?: string
}
export const registerUser = async (req: Request<RegisterRequestBody>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const user = await createUser({ name: name.trim(), email: email.trim(), password });

        res.status(201).json({
            success: true,
            message: "Registration details recieved",
            data: user
        })
    } catch (error) {
        next(error)
    }

}
// encryption is reversible with the correct key
// password hasing is designed to be one - way
interface LoginRequestBody {
    email: string;
    password: string;
}
export const loginUser = async (req: Request<{}, {}, LoginRequestBody>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password) {
            res.status(400).json({
                success: false,
                message: "Email and Password are required"
            })
            return
        }
        const user = await loginUserService(email, password);

        if (!user) {
            res.status(401).json({
                success: false,
                message: "Inavlid email an password"
            })
            return;
        }
        // generate access token 15 minutes
        const token = generatedToken(user.id);
        // generate refresh token
        const refreshToken = generateRefreshToken();
        // hash refresh token before storing it
        const tokenHash = hashRefreshToken(refreshToken);
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

        await Session.create({ userId: user.id, tokenHash, expiresAt, revokedAt: null })
        // res.status(200).json({
        //     success: true,
        //     message: "Login Succesfull",
        //     data: {
        //         user, token, refreshToken
        //     }

        // })
        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
            path: '/',

        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: "/api/auth",
        });
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user,
            },
        });
    } catch (error) {
        next(error)
    }
}