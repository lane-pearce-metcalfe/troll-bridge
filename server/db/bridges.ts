import db from './connection.ts'

export async function getAllBridges() {
  const bridges = await db('bridges').select()
  return bridges
}
