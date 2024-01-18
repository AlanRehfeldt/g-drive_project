import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('files_permission', table => {
        table.uuid('id').primary()
        table.uuid('file_id').references('id').inTable('files').notNullable()
        table.uuid('permission_id').references('id').inTable('permissions').notNullable()
        table.uuid('user_id').references('id').inTable('users').notNullable()
        table.uuid('created_by').references('id').inTable('users').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('files_permission')
}

