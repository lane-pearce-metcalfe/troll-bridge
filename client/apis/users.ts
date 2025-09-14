import * as request from 'superagent'
import { UserData } from '../../models/user'

const rootUrl = '/api/v1'

export async function getUserFromAutho0Sub(auth0Sub: string | undefined) {
  const user = await request.get(rootUrl + `/users/auth0/${auth0Sub}`)
  return user.body
}

export async function checkForUser(userData: UserData) {
  try {
    const res = await request.get(rootUrl + `/users/${userData.auth0Sub}`)
    return res.body
  } catch (err: any) {
    if (err.response && err.response.status === 404) {
      return addUser(userData)
    }
    throw err
  }
}

export async function addUser(userData: UserData) {
  const user = await request.post(rootUrl + '/users').send(userData)
  return user.body
}
