import { Router } from 'express'

import * as db from '../db/users.ts'

const router = Router()

router.get('/:auth0Sub', async (req, res) => {
  const auth0Sub = req.params.auth0Sub
  try {
    const user = await db.checkForUser(auth0Sub)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong grabbing user' })
  }
})

router.post('/', async (req, res) => {
  const userData = req.body
  if (!userData) {
    return res.status(400).json({ message: 'Error with user data' })
  }
  try {
    const newUser = await db.createUser(userData)
    res.status(201).json(newUser)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong creating user' })
  }
})

export default router
