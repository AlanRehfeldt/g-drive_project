import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("permissions").del();

    // Inserts seed entries
    await knex("permissions").insert([
        { id: 1, type: "read" },
        { id: 2, type: "write" },
        { id: 3, type: "delete" },
        { id: 4, type: "grant_permission" },
    ]);
};
