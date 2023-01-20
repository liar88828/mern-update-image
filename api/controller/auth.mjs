import {db} from "../connect.mjs";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

const accessToken = 'accessToken'

export const register = (req, res) => {
	//check user
	const q = `SELECT username
             FROM users
             WHERE username = ?`

	db.query(q, [req.body.username], (err, data) => {
		if (err) return res
				.status(500)
				.json(err)

		if (data.length) return res
				.status(409)
				.json('user is ready')
		//create  new user
		// hash as password 	// 1234=>12344adasdfsjo

		const salt = bcryptjs.genSaltSync(10);
		let Hashpassword = bcryptjs.hashSync(req.body.password, salt);

		//insert User
		const q = "INSERT INTO social.users (username, email, password, name) VALUES (?)"
		const rb = req.body
		const values = [rb.username, rb.email, Hashpassword, rb.name]
		db.query(q, [values], (err) => {
			if (err) return res
					.status(500)
					.json(err)
			return res.status(200).json('insert be create')
		})
	})
}

export const login = (req, res) => {
	const q = "SELECT * FROM users WHERE username = ?"
	db.query(q, [req.body.username], (err, data) => {
		if (err) return res
				.status(500).json(err)
		if (data.length === 0) return res
				.status(404).json('user not found')

		const checkPassword = bcryptjs.compareSync(req.body.password, data[0].password)
		if (!checkPassword) return res.send(400).json('wrong password or useranem')
		const token = jwt.sign({id: data[0].id}, 'secretkey')
		const {password, ...others} = data[0]
		res.cookie(accessToken, token, {
			httpOnly: true,
		}).status(200).json(others)
	})
	// res.send('login ')
}

export const logout = (req, res) => {
	res.clearCookie('accessToken', {
		secure: true,
		sameSite: 'none'
	}).status(200).json('User has logout')
}