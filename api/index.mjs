import express from 'express'
import userRoute from './route/users.mjs'
import postRoute from './route/posts.mjs'
// import likeRoute from './route/likes.mjs'
import authRoute from './route/auth.mjs'
import commentsRoute from './route/comments.mjs'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
const port = 5000

// middleware
app.use((req,res,next)=>{
	res.header('Access-Control-Allow-Credentials',true)
	next()
})
app.use(express.json())
app.use(cors({origin:'http://localhost:3000'}))
app.use(cookieParser())

app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
// app.use('/api/like', likeRoute)
app.use('/api/auth', authRoute)
app.use('/api/comments', commentsRoute)

app.listen(port, () => console.log('run in ' + port))