import db from './connection.ts'

export async function checkForUser(auth0Sub: string) {
  const user = await db('users').where({ auth0_sub: auth0Sub }).first()
  return user
}
