import {db} from "../connect.mjs";
import bcryptjs from 'bcryptjs'

export const login = (req, res) => {
	res.send('login ')
}
export const register = (req, res) => {

	//check user
	const q = `SELECT *
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
		const values = [
			rb.username,
			rb.email,
			Hashpassword,
			rb.name]
		db.query(q, [values], (err, data) => {
			if (err) return res
					.status(500)
					.json(err)
			return res.status(200).json('insert be create')
		})
	})


}

export const logout = (req, res) => {
	res.send('logout ')
}