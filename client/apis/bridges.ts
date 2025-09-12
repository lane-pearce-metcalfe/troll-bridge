import * as request from 'superagent'

const rootUrl = '/api/v1'

export function getBridges() {
  return request.get(rootUrl + '/bridges').then((res) => {
    return res.body
  })
}
