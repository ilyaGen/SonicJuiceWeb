import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';

import dotenv from 'dotenv'
dotenv.config()

import mongoose from 'mongoose'

import userRouter from './Sources/Routes/User.routes.js'
import postRouter from './Sources/Routes/Post.routes.js'


const app = express()
const PORT = process.env.PORT || 5000


app.use(express.json({extended: true}))

app.use('/api/auth', userRouter)
app.use('/api/posts', postRouter)


// Serving static React frontend in production mode
if (process.env.ENVIRONMENT === 'production')  {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));

    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', async (_, res) => {
        try {
            res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        } catch (err) {
            const message = `Something goes wrong during serving static content -> ${e.message}`
            res.status(500).json({message})
        }
    })
}


async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })

        app.listen(`${PORT}`, () => console.log(`App has been started on port ${PORT}...`))
    } catch (e){
        console.log('Server error ', e.message)
        process.exit(1)
    }
}


start()