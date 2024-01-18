import { Request, Response } from "express";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { verify } from "jsonwebtoken";
import authConfig from "../configs/auth";

export class FilesController {
    async create(req: Request, res: Response) {
        const { name, path, extension, size } = req.body;
        const { token } = req.cookies;
        
        try {
            if(!name || !path || !extension || !size) {
                return res.status(400).json({
                    message: "Missing fields"
                })
            }
            const checkIfFileExistsInThisPath = await knex("files")
                .where({
                    "path": path,
                    "name": name,
                }).first()
            if(checkIfFileExistsInThisPath) {
                return res.status(400).json({
                    message: "File already exists in this path"
                })
            }

            const payload = verify(token, authConfig.jwt.secret);
            const sessionUserId = payload.sub

            const checkIfUserExists = await knex("users").where("id", sessionUserId).first();
            if(!checkIfUserExists) {
                return res.status(400).json({
                    message: "User does not exists"
                })
            }

            await knex("files").insert({
                id: randomUUID(),
                name,
                path,
                extension,
                size,
                user_id: sessionUserId
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
        const { name, path, extension, size } = req.body
        const { token } = req.cookies;
        const { id } = req.params

        try {
            const file = await knex("files").where("id", id).first();
            if(!file) {
                return res.status(400).json({
                    message: "File does not exists"
                })
            }
            const payload = verify(token, authConfig.jwt.secret);
            const sessionUserId = payload.sub
            const filePermission = await knex("files_permission")
                .where({
                    "file_id": id,
                    "user_id": sessionUserId
                }).first();

            const sessionUser = await knex("users").where("id", sessionUserId).first();

            if(file.user_id !== sessionUserId && !filePermission && !sessionUser.is_admin) {
                return res.status(401).json({
                    message: "You cannot update this file"
                })
            }

            file.name = name ?? file.name
            file.path = path ?? file.path
            file.extension = extension ?? file.extension
            file.size = size ?? file.size
            file.updated_at = formatDate(new Date())

            await knex("files").update(file).where("id", id)

            return res.status(200).json(file)
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
