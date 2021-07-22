import { Router } from 'express'
import bcrypt from 'bcrypt'
import { check, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import auth from '../../middleware/auth.middleware.js'
import User from '../Models/User.js'

const router = Router()


router.post(
    '/register',
    [
        check('email', 'Wrong email').isEmail(),
        check('password', 'Password length is < 6').isLength({ min: 6 })
    ],
    async (req, res) => {
    try {

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: 'Wrong registration data'
            })
        }

        const {email, password} = req.body
        
        const candidate = await User.findOne({ email })
        if (candidate) {
            return res.status(400).json({ message: 'User is already exists..' })
        }

        const passwordHash = await bcrypt.hash(password, 12)
        const user = new User({ email, passwordHash })
        await user.save()

        res.status(201).json({ message: 'New user created' })

    } catch (e) {
        const message = `Something goes wrong... User.routes.js -> register -> ${e.message}`
        res.status(500).json({message})
    }
})


router.post(
    '/login',
    [
        check('email', 'Wrong email format').normalizeEmail().isEmail(),
        check('password', 'Empty password field').exists()
    ],
    async (req, res) => {
    try {

        const {email, password} = req.body

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'User is not finded..' })
        }

        const isMatch = bcrypt.compare(password, user.passwordHash)

        if (!isMatch) {
            return res.status(400).json({ message: 'Password is wrong..' })
        }

        const token = jwt.sign(
            {userID: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        )
        
        res.json({ token, userID: user.id })

    } catch (e) {
        const message = `Something goes wrong... User.routes.js -> login -> ${e.message}`
        console.log(message)
        return res.status(500).json({message})
    }
})


router.get(
    '/account',
    auth,
    async (req, res) => {
    try {
        const user = await User.findById(req.user.userID)
        if (!user) {
            return res.status(400).json({ message: 'User is not finded..' })
        }
        
        const account = user._doc
        delete account._id
        delete account.passwordHash
        delete account.__v

        res.json(account)

    } catch (e) {
        const message = `Something goes wrong... User.routes.js -> login -> ${e.message}`
        console.log(message)
        return res.status(500).json({message})
    }
})

router.post(
    '/update',
    auth,
    async (req, res) => {
    try {
        const user = await User.findById(req.user.userID)
        if (!user) {
            return res.status(400).json({ message: 'User is not finded..' })
        }
        
        for (const key in req.body) {
            if (key !== 'email') {
                user[key] = req.body[key]
            }
        }

        await user.save() 

        res.json({ ...req.body, email: user.email})

    } catch (e) {
        const message = `Something goes wrong... User.routes.js -> login -> ${e.message}`
        console.log(message)
        return res.status(500).json({message})
    }
})


router.delete(
    '/close',
    auth,
    async (req, res) => {
    try {
        await User.findByIdAndRemove(req.user.userID)
        res.json({message: 'User account deleted'})
    } catch (e) {
        const message = `Something goes wrong... User.routes.js -> login -> ${e.message}`
        return res.status(500).json({message})
    }
})

export default router