import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('folders_permission', table => {
        table.uuid('id').primary()
        table.uuid('folder_id').references('id').inTable('folders').notNullable()
        table.uuid('permission_id').references('id').inTable('permissions').notNullable()
        table.uuid('user_id').references('id').inTable('users').notNullable()
        table.uuid('created_by').references('id').inTable('users').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('folders_permission')
}

