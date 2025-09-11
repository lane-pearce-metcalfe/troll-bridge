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

export default router
