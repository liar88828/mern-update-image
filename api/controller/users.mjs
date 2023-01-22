import {db} from "../connect.mjs";

export const getUser = (req, res) => {
	const userId = req.params.id
	const q = `SELECT *
             FROM social.users
             WHERE id = ?`
	db.query(q, [userId], (err, data) => {
		if (err) return res.status(500).json(err)
		const {password, ...info} = data[0] // untuk menyaring data
		return res.json(info)
	})
}