import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/AppError";

export const errorsHandler = (err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        })
    }

    console.error(err)

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })


}