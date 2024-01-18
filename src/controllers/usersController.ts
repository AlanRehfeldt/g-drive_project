import { Request, Response } from "express";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { verify } from "jsonwebtoken";
import authConfig from "../configs/auth";

export class UsersController {
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body;
        
        try {
            if(!name || !email || !password) {
                return res.status(400).json({
                    message: "Missing fields"
                })
            }

            const checkIfUserExists = await knex("users").where("email", email).first();
            if(checkIfUserExists) {
                return res.status(400).json({
                    message: "User already exists"
                })
            }

            await knex("users").insert({
                id: randomUUID(),
                name,
                email,
                password
            })

            return res.status(201).json()
        } catch (error) {
            console.error(error); 
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    async update(req: Request, res: Response) {
        const { name, email, password } = req.body
        const { token } = req.cookies

        try {
            const payload = verify(token, authConfig.jwt.secret);
            const user_id = payload.sub

            const user = await knex("users").where("id", user_id).first();
            if(!user) {
                return res.status(404).json({
                    message: "User not found"
                })
            }

            const checkEmailExists = await knex("users").where("email", email).first();
            if(checkEmailExists && checkEmailExists.id!== user_id) {
                return res.status(400).json({
                    message: "This email is arleady in use"
                })
            }

            user.name = name ?? user.name
            user.email = email?? user.email
            user.password = password ?? user.password
            user.updated_at = formatDate(new Date())

            await knex("users").update(user).where("id", user_id)

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);   
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    async index(req: Request, res: Response) {
        const name = req.query.name as string;
        
        try {
            let users;
            if(name) {
                users = await knex("users").select("*").whereLike("name", `%${name}%`);
            } else {
                users = await knex("users").select("*") 
            }

            return res.status(200).json(users);
        } catch (error) {
            console.error(error);   
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }
}

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours() + 3).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}
