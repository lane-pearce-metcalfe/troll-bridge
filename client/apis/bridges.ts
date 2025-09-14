import * as request from 'superagent'

const rootUrl = '/api/v1'

export function getBridges() {
  return request.get(rootUrl + '/bridges').then((res) => {
    return res.body
  })
}

export function getBridgeFromId(id: number) {
  return request.get(rootUrl + `/bridges/${id}`).then((res) => {
    return res.body
  })
}
