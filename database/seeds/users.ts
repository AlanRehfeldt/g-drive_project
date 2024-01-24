import { Knex } from "knex";
import { v4 as uuidv4 } from "uuid";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex("users").insert([
        { id: 1, name: "John Doe", email: "john.doe@example.com", password: "pass", is_admin: false },
        { id: 2, name: "Jane Doe", email: "jane.doe@example.com", password: "pass", is_admin: false },
        { id: 3, name: "Emily Smith", email: "emily.smith@example.com", password: "pass", is_admin: false },
        { id: 4, name: "Michael Johnson", email: "michael.johnson@example.com", password: "pass", is_admin: false },
        { id: 5, name: "Samantha Davis", email: "samantha.davis@example.com", password: "pass", is_admin: false },
        { id: 6, name: "Admin", email: "admin@example.com", password: "pass", is_admin: true },
    ]);
}
