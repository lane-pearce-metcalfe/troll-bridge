/**
 * @param {import('knex').Knex} knex
 */
export async function up(knex) {
  return knex.schema.createTable('bridges', (table) => {
    table.increments('id').primary()
    table.string('name')
    table.string('location')
    table.string('type')
    table.integer('length')
    table.integer('height')
    table.integer('year_built')
    table.string('added_by')
    table.foreign('added_by').references('users.id').onDelete('SET NULL')
    table.string('troll_owner')
    table.foreign('troll_owner').references('users.id').onDelete('SET NULL')
    table.integer('lat')
    table.integer('lng')
    table.string('image_url')
  })
}

export async function down(knex) {
  return knex.schema.dropTable('bridges')
}
