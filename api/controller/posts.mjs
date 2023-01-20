import {db} from "../connect.mjs";

export const getPost = (req, res) => {
	const q = `SELECT p.*, name, profile_pic
             FROM post p
                      JOIN users u ON u.id = p.userId`;
	db.query(q, (err, data) => {
		if (err) return res.status(500).json(err)
		return res.status(200).json(data)
	})
}