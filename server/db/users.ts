import db from './connection.ts'
import { UserData } from '../../models/user.ts'

export async function checkForUser(auth0Sub: string) {
  const user = await db('users').where({ auth0_sub: auth0Sub }).first()
  return user
}

export async function createUser(userData: UserData) {
  const [newUser] = await db('users').insert(userData).returning('*')
  return newUser
}
