import express from 'express'
import userRoute from './route/users.mjs'
import postRoute from './route/posts.mjs'
// import likeRoute from './route/likes.mjs'
import authRoute from './route/auth.mjs'
import commentsRoute from './route/comments.mjs'

const app = express()
const port = 5000

// middleware
app.use(express.json())



app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
// app.use('/api/like', likeRoute)
app.use('/api/auth', authRoute)
app.use('/api/comments', commentsRoute)

app.listen(port, () => console.log('run in ' + port))