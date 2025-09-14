import * as request from 'superagent'
import { UserData } from '../../models/user'

const rootUrl = '/api/v1'

export async function getUserFromAutho0Sub(auth0Sub: string | undefined) {
  const user = await request.get(rootUrl + `/users/auth0/${auth0Sub}`)
  return user.body
}

export async function addUser(userData: UserData) {
  const user = await request.post(rootUrl + '/users').send(userData)
  return user.body
}
