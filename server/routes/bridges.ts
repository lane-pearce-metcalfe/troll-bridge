import { Router } from 'express'

import * as db from '../db/bridges.ts'

const router = Router()

router.get('/', async (req, res) => {
  try {
    const bridges = await db.getAllBridges()

    res.json(bridges)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong grabbing all bridges' })
  }
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  try {
    const bridge = await db.getBridgeById(id)
    if (!bridge) {
      return res.status(404).json({ message: 'Bridge not found' })
    }
    res.json(bridge)
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong grabbing bridge by id' })
  }
})

router.post('/', async (req, res) => {
  const bridgeData = req.body
  try {
    const bridgeId = await db.addBridge(bridgeData)
    res.status(201).json({ id: bridgeId })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong adding a bridge' })
  }
})

export default router
