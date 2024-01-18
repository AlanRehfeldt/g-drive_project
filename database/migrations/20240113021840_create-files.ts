import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('files', table => {
        table.uuid('id').primary()
        table.string('name').notNullable()
        table.string('path').notNullable()
        table.string('extension').notNullable()
        table.integer('size').notNullable()
        table.uuid('user_id').references('id').inTable('users').notNullable()
        table.timestamp('created_at').defaultTo(knex.fn.now())
        table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('files')
}

