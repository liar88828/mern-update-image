import {db} from "../connect.mjs";
import bcryptjs from 'bcryptjs'

export const login = (req, res) => {

	//check user
	const q = `SELECT
             FROM users
             WHERE username ?`


	db.query(q, [req.body.username], (err, data) => {
		if (err) return res
				.status(500)
				.json(err)

		if (data.length) return res
				.status(409)
				.json('user is ready')
	})

	//create  new user
	// hash as password 	// 1234=>12344adasdfsjo

	const salt = bcryptjs.genSaltSync(10)
	const hashedPassword = bcryptjs.hashSync(req.body.password, salt)

	res.send('login ')
}
export const register = (req, res) => {
	res.send('register ')
}
export const logout = (req, res) => {
	res.send('logout ')
}