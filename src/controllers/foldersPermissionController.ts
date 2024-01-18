import { Request, Response } from "express";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { verify } from "jsonwebtoken";
import authConfig from "../configs/auth";

export class FoldersPermissionController {
    async create(req: Request, res: Response) {
        const { folder_id, permission_id, user_id } = req.body;
        const { token } = req.cookies;
        
        try {
            // Data validation
            if(!user_id) {
                return res.status(400).json({
                    message: "Missing fields user"
                })
            }
            if(!folder_id) {
                return res.status(400).json({
                    message: "Missing fields folder"
                })
            }
            if(!permission_id) {
                return res.status(400).json({
                    message: "Missing fields permission"
                })
            }
            const folderExists = await knex("folders").where("id", folder_id).first();
            if(!folderExists) {
                return res.status(400).json({
                    message: "Folder does not exists"
                })
            }
            const permissionExists = await knex("permissions").where("id", permission_id).first();
            if(!permissionExists) {
                return res.status(400).json({
                    message: "Permission does not exists"
                })
            }
            const userExists = await knex("users").where("id", user_id).first();
            if(!userExists) {
                return res.status(400).json({
                    message: "User does not exists"
                })
            }

            // Folder permission creating logic
            const payload = verify(token, authConfig.jwt.secret);
            const sessionUserId = payload.sub

            const grantingPermissionUser = await knex("folders_permission")
                .select("*")
                .where({
                    "user_id": sessionUserId,
                    "permission_id": 4,
                    "folder_id": folder_id
                }).first()

            const sessionUser = await knex("users").where("id", sessionUserId).first()

            if(folderExists.user_id !== sessionUserId && !grantingPermissionUser && !sessionUser.is_admin) {
                return res.status(401).json({
                    message: "You cannot grant this folder permission"
                })
            }

            await knex("folders_permission").insert({
                id: randomUUID(),
                folder_id,
                permission_id,
                user_id,
                created_by: sessionUserId
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
        const { permission_id } = req.body;
        const { id } = req.params;
        const { token } = req.cookies;

        try {
            // Data validation
            const permissionExists = await knex("permissions").where("id", permission_id).first();
            if(!permissionExists) {
                return res.status(400).json({
                    message: "Permission does not exists"
                })
            }
            const folderPermissionExists = await knex("folders_permission").where("id", id).first();
            if(!folderPermissionExists) {
                return res.status(400).json({
                    message: "Folder permission does not exists"
                })
            }

            // Folder permission updating logic
            const payload = verify(token, authConfig.jwt.secret);
            const sessionUserId = payload.sub

            const grantingPermissionUser = await knex("folders_permission")
                .select("*")
                .where({
                    "user_id": sessionUserId,
                    "permission_id": 4,
                    "folder_id": folderPermissionExists.folder_id
                }).first()

            const sessionUser = await knex("users").where("id", sessionUserId).first();

            if(folderPermissionExists.created_by !== sessionUserId && !grantingPermissionUser && !sessionUser.is_admin) {
                return res.status(401).json({
                    message: "You cannot edit this folder permission"
                })
            }

            await knex("folders_permission").where("id", id).update({
                permission_id,
                updated_at: formatDate(new Date())
            })

            res.status(200).json()
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal server error"
            })
        }
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;
        const { token } = req.cookies;

        try {
            // Data validation
            const folderPermissionExists = await knex("folders_permission").where("id", id).first();
            if(!folderPermissionExists) {
                return res.status(400).json({
                    message: "Folder permission does not exists"
                })
            }

            // Folder permission deleting logic
            const payload = verify(token, authConfig.jwt.secret);
            const sessionUserId = payload.sub

            const grantingPermissionUser = await knex("folders_permission")
                .select("*")
                .where({
                    "user_id": sessionUserId,
                    "permission_id": 4,
                    "folder_id": folderPermissionExists.folder_id
                }).first()

            const sessionUser = await knex("users").where("id", sessionUserId).first();

            if(folderPermissionExists.created_by !== sessionUserId && !grantingPermissionUser && !sessionUser.is_admin) {
                return res.status(401).json({
                    message: "You cannot delete this folder permission"
                })
            }

            await knex("folders_permission").where("id", id).delete();

            res.status(200).json()
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Internal server error"
            })
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
