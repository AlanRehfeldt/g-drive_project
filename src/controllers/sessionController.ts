import { Request, Response } from "express";
import { knex } from "../database";
import { sign } from "jsonwebtoken"
import authConfig from "../configs/auth";

export class SessionController {
    async create(req: Request, res: Response) {
        const { email, password } = req.body;
        try {
            const user = await knex("users").where("email", email).first();
            if(!user) {
                // throw new AppError("User not found", 401)
                return res.status(401).json({
                    message: "User not found"
                })
            }

            if(user.password !== password) {
                // throw new AppError("Incorrect password", 401)
                return res.status(401).json({
                    message: "Incorrect password"
                })
            }

            const { secret, expiresIn } = authConfig.jwt;
            const token = sign({ id: user.id }, secret, {
                subject: String(user.id),
                expiresIn
            })

            res.cookie("token", token)

            return res.status(200).json({ user, token })
        } catch (error) {
            // throw new AppError("Internal server error", 500)
            console.error(error); 
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }
}
