export async function seed(knex) {
  await knex('users').del()

  await knex('users').insert([
    {
      auth0Sub: 'auth0|123456',
      email: 'testemail@gmail.com',
      name: 'Test User',
      pfpUrl:
        'https://i.pinimg.com/736x/8a/8d/55/8a8d55cc1dd77abf6800566a4bbe5fba.jpg',
    },
  ])
}
