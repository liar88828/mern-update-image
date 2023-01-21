import express from 'express'
import userRoute from './route/users.mjs'
import postRoute from './route/posts.mjs'
// import likeRoute from './route/likes.mjs'
import authRoute from './route/auth.mjs'
import commentsRoute from './route/comments.mjs'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import multer from 'multer'

const app = express()
const port = 5000

// middleware
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Credentials', true)
	next()
})
app.use(express.json())
app.use(cors({origin: 'http://localhost:3000'}))
app.use(cookieParser())


const storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, '../client/public/upload')
	},
	filename: function (req, file, cb) {
		cb(null, Date.now() + file.originalname)
	}
})
const upload = multer({storage: storage})
app.post('/api/upload',
		upload.single('file'),
		(req, res) => {
			const file = req.file
			res.status(200).json(file.filename)
		})

app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
// app.use('/api/like', likeRoute)
app.use('/api/auth', authRoute)
app.use('/api/comments', commentsRoute)

app.listen(port, () => console.log('run in ' + port))