import {db} from "../connect.mjs";
import jwt from "jsonwebtoken";

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


export const updateUser = (req, res) => {

	const token = req.cookies.accessToken;
	if (!token) return res.status(401).json('not login')
	jwt.verify(token, 'secretkey',
			(err, userInfo) => {
				if (err) return res.status(403).json('token is not valid')


				const q = `UPDATE social.users
                   SET name=?,
                       city=?,
                       website=?,
                       profile_pic=?,
                       cover_pic=?
                   WHERE id = ?
				`
				db.query(q, [
							req.body.name,
							req.body.city,
							req.body.website,
							req.body.profile_pic,
							req.body.cover_pic,
							userInfo.id
						],
						(err, data) => {
							if (err) res.status(500).json(err)
							if (data.affectedRows > 0) return res.json('update!!!!')
							return res.status(403).json('you can only update your post')
						})
			})
}