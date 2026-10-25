import type { Response, Request, NextFunction } from "express";
import { AppError } from "../utils/app-error.js";


export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction): void => {


    if (error instanceof AppError) {
        // the instance of operator checks weather an object was created from a particulr class
        res.status(error.statusCode).json({
            success: false,
            message: error.message
        })
        return;
    }

    if("code" in error && error.code === 11000){
        res.status(409).json({
            success:false,
            message:"A record with this value already exists",
        })
        return
    }
    console.error("UnExpected Backend Error : ", error);

    res.status(500).json({
        success: false,
        message: "Internal server error"
    })
}