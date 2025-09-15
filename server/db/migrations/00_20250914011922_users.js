/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.string('auth0Sub').primary().notNullable().unique()
    table.string('email').notNullable().unique()
    table.string('name').notNullable()
    table.string('pfpUrl')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('users')
}
