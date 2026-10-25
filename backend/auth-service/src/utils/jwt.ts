import jwt from 'jsonwebtoken';

export const generatedToken = (userId: string) => {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        throw new Error("JWT_SECRET is missing in .env");
    }

    return jwt.sign({userId},secret,{expiresIn:'15m',algorithm:'HS256'});
}

// Authenctication middle ware is a function that cheks wheather an incoming request contains vali authentication credentilas before access to a protected route
