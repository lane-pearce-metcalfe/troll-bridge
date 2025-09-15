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
