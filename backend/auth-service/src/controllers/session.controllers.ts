import type { Request, Response, NextFunction } from "express";
import { finalValiSession } from "../services/session.services.js";
import { generatedToken } from "../utils/jwt.js";
import { Session } from "../models/session.model.js";
import { hashRefreshToken } from "../utils/refreshToken.js";

interface RefreshRequestBody {
    refreshToken?: string,
}

export const refreshToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (typeof refreshToken !== "string" || !refreshToken.trim()) {
            res.status(401).json({
                success: false,
                message: "Refresh token is required"
            })
            return;
        }

        const session = await finalValiSession(refreshToken);

        if (!session) {
            res.status(401).json({
                success: false,
                message: "Invalid or expired refresh token"
            })
            return;
        }

        const token = generatedToken(session.userId.toString());


        res.cookie('accessToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000,
            path: "/"
        })

        res.status(200).json({
            success: true,
            message: "Access token refreshed successfully",
        })

    } catch (error) {
        next(error)
    }
}

export const logoutUser = async (req: Request<{}, {}, RefreshRequestBody>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const refreshToken = req.cookies?.refreshToken;

        if (typeof refreshToken !== 'string' || !refreshToken.trim()) {
            res.status(401).json({
                success: false,
                message: "Refresh token is required"
            })
            return;
        }
        await Session.updateOne({
            tokenHash: hashRefreshToken(refreshToken),
            revokedAt: null
        }, { $set: { revokedAt: new Date() } });

        res.clearCookie('accessToken', { path: '/' });
        res.clearCookie("refreshToken", { path: '/api/auth' });

        res.status(200).json({
            success: true,
            message: "Logged out succesfully"
        })
    } catch (error) {
        next(error)
    }
}

export const logoutAllSessions = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = res.locals.userId as string | undefined;
        if (!userId) {
            res.status(401).json({
                success: false,
                message: "Authentication required"
            });
            return;
        }
        await Session.updateMany({ userId, revokedAt: null }, { $set: { revokedAt: new Date() } });

        res.status(200).json({
            success: true,
            message: "All sessions logged out succesfully"
        })
    } catch (error) {
        next(error)
    }
}