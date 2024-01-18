import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('permissions', table => {
        table.uuid('id').primary()
        table.string('type').notNullable().unique()
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('permissions')
}

