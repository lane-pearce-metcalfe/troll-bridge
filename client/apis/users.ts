import * as request from 'superagent'

const rootUrl = '/api/v1'

export async function getUserFromAutho0Sub(auth0Sub: string) {
  const user = await request.get(rootUrl + `/users/auth0/${auth0Sub}`)
  return user.body
}
