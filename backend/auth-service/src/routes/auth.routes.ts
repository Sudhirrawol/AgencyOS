import { Router } from 'express';
import { loginUser, registerUser } from '../controllers/auth.controllers.js';
import { verifyToken } from '../middleware/auth.middleware.js';
import { getUserProfileService } from '../services/auth.service.js';
import { validateLogin, validateRegister } from '../middleware/validation.middleware.js';
import { logoutAllSessions, refreshToken } from '../controllers/session.controllers.js';
import { logoutUser } from '../controllers/session.controllers.js';
const authRouter = Router();

// express router allows you to organize related api endpoints into seperate module

authRouter.post('/register', validateRegister, registerUser)

authRouter.post('/login', validateLogin, loginUser);
authRouter.post('/refresh',refreshToken)
authRouter.post('/logout',logoutUser)
authRouter.post("/logout-all", verifyToken, logoutAllSessions);
authRouter.get("/profile", verifyToken, async (req, res, next) => {
    try {
        const userId = res.locals.userId as string;
        const user = await getUserProfileService(userId)
        if (!user) {
            res.status(404).json({
                success: false,
                message: "User not found",
            })
            return;
        }

        res.status(200).json({
            success: true,
            message: "Protected profile accessed succesfully",
            data: user,
        })
    } catch (error) {
        next(error);
    }
})

export default authRouter;

// a jwt contains claims such as the user's id and the token expiration time

// json web token (jwt) is a compact digitaly signed token used to transmit claims between parties it is commonly used for authentication

