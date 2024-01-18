import { Request, Response } from "express";
import { knex } from "../database";
import { randomUUID } from "crypto";
import { verify } from "jsonwebtoken";
import authConfig from "../configs/auth";

export class FoldersController {

    async create(req: Request, res: Response) {
        const { name, path } = req.body;
        const { token } = req.cookies;

        try {
            if(!name || !path) {
                return res.status(400).json({
                    message: "Missing fields"
                })
            }
            const checkIfFolderExistsInThisPath = await knex("folders")
                .where({
                    "path": path,
                    "name": name,
                }).first()
            if(checkIfFolderExistsInThisPath) {
                return res.status(400).json({
                    message: "Folder already exists in this path"
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

            await knex("folders").insert({
                id: randomUUID(),
                name,
                path,
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
        const { name, path } = req.body
        const { token } = req.cookies;
        const { id } = req.params
        try {
            const folder = await knex("folders").where("id", id).first();
            if(!folder) {
                return res.status(400).json({
                    message: "folder does not exists"
                })
            }
            const payload = verify(token, authConfig.jwt.secret);
            const sessionUserId = payload.sub
            const folderPermission = await knex("folders_permission")
                .where({
                    "folder_id": id,
                    "user_id": sessionUserId
                }).first();

            const sessionUser = await knex("users").where("id", sessionUserId).first();

            if(folder.user_id !== sessionUserId && !folderPermission && !sessionUser.is_admin) {
                return res.status(401).json({
                    message: "You cannot update this folder"
                })
            }

            folder.name = name ?? folder.name
            folder.path = path ?? folder.path
            folder.updated_at = formatDate(new Date())

            await knex("folders").update(folder).where("id", id)

            return res.status(200).json(folder)
        } catch (error) {
            console.error(error);   
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    async list(req: Request, res: Response) {
        const path = req.query.path as string
        const { token } = req.cookies;

        try {
            const payload = verify(token, authConfig.jwt.secret);
            const sessionUserId = payload.sub
            const sessionUser = await knex("users").where("id", sessionUserId).first();

            let folders
            let files

            if(sessionUser.is_admin) {
                folders = await knex("folders").where({ path })
                files = await knex("files").where({ path })
            } else {
                folders = await knex("folders")
                    .where({
                        path: path,
                        user_id: sessionUserId
                    })
    
                files = await knex("files")
                    .where({  
                        path: path,
                        user_id: sessionUserId
                    })
            }

            interface IDataReturn {
                id: string;
                name: string;
                path: string;
                extension?: string;
                size?: number;
                user_id: string;
                created_at: string;
                updated_at: string;
            }

            let dataReturn: Array<IDataReturn> = []
            folders.map(folder => dataReturn.push(folder))
            files.map(file => dataReturn.push(file))

            return res.status(200).json({ dataReturn });
        } catch (error) {
            console.error(error);   
            return res.status(500).json({
                message: "Internal server error",
            });
        }
    }

    async listShared(req: Request, res: Response) {
        const path = req.query.path as string
        const { token } = req.cookies;

        try {
            const payload = verify(token, authConfig.jwt.secret);
            const sessionUserId = payload.sub
            const sessionUser = await knex("users").where("id", sessionUserId).first();

            let folders
            let files

            let sharedFolders
            let sharedFiles

            interface IDataReturn {
                id: string;
                name: string;
                path: string;
                extension?: string;
                size?: number;
                user_id: string;
                created_at: string;
                updated_at: string;
            }

            let dataReturn: Array<IDataReturn> = []

            if(sessionUser.is_admin) {
                folders = await knex("folders")
                files = await knex("files")

                folders.map(folder => dataReturn.push(folder))
                files.map(file => dataReturn.push(file))
            } else {
                sharedFolders = await knex("folders_permission")
                .select("folder_id")
                .distinct()
                .where({
                    user_id: sessionUser.id
                })

                sharedFiles = await knex("files_permission")
                .select("file_id")
                .distinct()
                .where({
                    user_id: sessionUser.id
                })

                for (const sharedFolder of sharedFolders) {
                    const folder = await knex("folders")
                        .where({ 
                            id: sharedFolder.folder_id,
                            path: path,
                        })
                        .first();
                    if (folder) {
                        dataReturn.push(folder);
                    }
                }

                for (const sharedFile of sharedFiles) {
                    const folder = await knex("files")
                        .where({ 
                            id: sharedFile.file_id,
                            path: path,
                        })
                        .first();
                    if (folder) {
                        dataReturn.push(folder);
                    }
                }
            }

            return res.status(200).json({ dataReturn });
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
