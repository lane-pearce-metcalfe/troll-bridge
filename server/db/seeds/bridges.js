export async function seed(knex) {
  await knex('bridges').del()

  await knex('bridges').insert([
    { id: 1, name: 'Auckland Harbour Bridge' },
    { id: 2, name: 'Mangere Bridge' },
    { id: 3, name: 'Wynyard Crossing' },
  ])
}
