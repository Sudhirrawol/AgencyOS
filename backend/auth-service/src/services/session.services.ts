import { Session } from "../models/session.model.js";
import { hashRefreshToken } from "../utils/refreshToken.js";
export const finalValiSession = async (refreshToken : string)=>{
    const tokenHash = hashRefreshToken(refreshToken);

    const session = await Session.findOne({tokenHash,revokedAt:null,expiresAt:{$gt : new Date()}});

    return session;
}