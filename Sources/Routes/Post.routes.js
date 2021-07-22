import { Router } from 'express'
import Post from '../Models/Post.js'


const router = Router()

router.get('/', async (_, res) => {
    try {
        const query = Post.find({})
        const allPosts = await query.exec()
        res.send(allPosts)
    } catch (e) {
        const message = `Something goes wrong... Post.routes.js -> / -> ${e.message}`
        console.log(message)
        res.status(500).json({message})
    }
})


router.post('/add', async (req, res) => {
    try {

        const {title, asssetName, text, linkTitle, linkTo} = req.body

        const post = new Post({title, asssetName, text, linkTitle, linkTo})
        await post.save()

        res.status(201).json({ message: 'New post created' })

    } catch (e) {
        const message = `Something goes wrong... Post.routes.js -> /add -> ${e.message}`
        console.log(message)
        res.status(500).json({message})
    }
})



export default router