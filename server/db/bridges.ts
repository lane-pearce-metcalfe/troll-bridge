import { AddBridgeData } from '../../models/bridges.ts'
import db from './connection.ts'

export async function getAllBridges() {
  const bridges = await db('bridges').select()
  return bridges
}

export async function getBridgeById(id: number) {
  const bridge = await db('bridges').where({ id }).first()
  return bridge
}

export async function addBridge(bridge: AddBridgeData) {
  const bridgeId = await db('bridges').insert(bridge).returning('id')
  return bridgeId
}

export async function takeoverBridge(id: number, userSub: string) {
  const bridge = await db('bridges').where({ id }).first()
  if (bridge.troll_owner === null) {
    await db('bridges').where({ id }).update({ troll_owner: userSub })
    return true
  } else {
    return false
  }
}

export async function releaseBridge(id: number, userSub: string) {
  const bridge = await db('bridges').where({ id }).first()
  if (bridge.troll_owner === userSub) {
    await db('bridges').where({ id }).update({ troll_owner: null })
    return true
  } else {
    return false
  }
}
