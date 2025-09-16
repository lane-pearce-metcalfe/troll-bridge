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

router.post('/takeover/:bridgeId/:userSub', async (req, res) => {
  const bridgeId = Number(req.params.bridgeId)
  const userSub = req.params.userSub
  try {
    const success = await db.takeoverBridge(bridgeId, userSub)
    if (success) {
      res.json({ message: 'Bridge successfully taken over' })
    } else {
      res
        .status(400)
        .json({ message: 'Bridge is already owned by someone else' })
    }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong taking over the bridge' })
  }
})

router.post('/release/:bridgeId/:userSub', async (req, res) => {
  const bridgeId = Number(req.params.bridgeId)
  const userSub = req.params.userSub
  try {
    const success = await db.releaseBridge(bridgeId, userSub)
    if (success) {
      res.json({ message: 'Bridge successfully released' })
    } else {
      res
        .status(400)
        .json({ message: 'You do not own this bridge to release it' })
    }
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ message: 'Something went wrong releasing the bridge' })
  }
})
export default router
