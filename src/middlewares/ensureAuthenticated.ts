import { Request, Response } from "express";
import authConfig from "../configs/auth";
import { JwtPayload, verify} from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
    user?: string | JwtPayload
}

export function ensureAuthenticated(req: AuthenticatedRequest, res: Response, next: Function) {
    const { token } = req.cookies;

    try {
        const user = verify(token, authConfig.jwt.secret);
        req.user = user
        next();
    } catch (err) {
        res.clearCookie("token");
        return res.status(400).json({
            message: "JWT token is invalid"
        });
    }
}